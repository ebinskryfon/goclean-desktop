// Cloudflare Worker: records download/copy events as coarse 3-degree location cells.
// Uses Cloudflare's built-in request.cf geolocation. IP addresses are never stored.
//
// Free-tier friendly:
//  - GET /dots is cached for 60s (Cache API), so map views rarely touch KV.
//  - Events in an already-known cell are counted in memory and written to KV at most
//    once a minute. A brand-new cell is written immediately so its dot appears at once.
const STEP = 3
const MAX_CELLS = 2000
const FLUSH_MS = 60_000
const CACHE_KEY = 'https://goclean-map.internal/dots'

// Per-isolate state. It can be lost when Cloudflare recycles the isolate; at worst a few
// repeat counts in an existing cell are dropped, which does not matter for a map.
let pending = {} // cell -> events not yet written to KV
let known = null // cell -> count, last value read from / written to KV
let knownAt = 0
let lastFlush = 0

async function loadCells(env, maxAgeMs = FLUSH_MS) {
  if (known && Date.now() - knownAt < maxAgeMs) return known
  known = JSON.parse((await env.MAP.get('cells')) || '{}')
  knownAt = Date.now()
  return known
}

async function flush(env) {
  const batch = pending
  pending = {}
  if (Object.keys(batch).length === 0) return
  const cells = await loadCells(env, 0) // fresh read, so other isolates' writes are merged
  for (const [k, n] of Object.entries(batch)) {
    if (cells[k] || Object.keys(cells).length < MAX_CELLS) cells[k] = (cells[k] || 0) + n
  }
  await env.MAP.put('cells', JSON.stringify(cells))
  known = cells
  knownAt = Date.now()
  lastFlush = Date.now()
  await caches.default.delete(CACHE_KEY) // next /dots shows the new data
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || ''
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
    const okOrigin = allowed.length === 0 || allowed.includes(origin)
    const cors = {
      'Access-Control-Allow-Origin': okOrigin && origin ? origin : allowed[0] || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
      Vary: 'Origin',
    }
    const json = (body, status = 200, extra = {}) =>
      new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...cors, ...extra } })

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    const url = new URL(request.url)

    if (url.pathname === '/dots' && request.method === 'GET') {
      // Cache the data itself (not the CORS headers), so one entry serves every origin.
      const hit = await caches.default.match(CACHE_KEY)
      let text = hit ? await hit.text() : null
      if (text === null) {
        const cells = await loadCells(env)
        text = JSON.stringify(Object.entries(cells).map(([k, n]) => {
          const [lat, lon] = k.split(',').map(Number)
          return { lat, lon, n }
        }))
        ctx.waitUntil(caches.default.put(CACHE_KEY, new Response(text, { headers: { 'Cache-Control': 'public, max-age=60' } })))
      }
      return new Response(text, { headers: { 'content-type': 'application/json', 'Cache-Control': 'public, max-age=30', ...cors } })
    }

    if (url.pathname === '/track' && request.method === 'POST') {
      if (!okOrigin) return json({ error: 'forbidden' }, 403)
      let body = {}
      try { body = await request.json() } catch { /* ignore */ }
      if (body.type !== 'download' && body.type !== 'copy') return json({ error: 'bad type' }, 400)
      const { latitude, longitude } = request.cf || {}
      const lat = parseFloat(latitude), lon = parseFloat(longitude)
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return json({ ok: true, located: false })
      // snap to the centre of a 3-degree cell: the exact position is discarded
      const key = `${Math.floor(lat / STEP) * STEP + STEP / 2},${Math.floor(lon / STEP) * STEP + STEP / 2}`

      const cells = await loadCells(env)
      pending[key] = (pending[key] || 0) + 1
      const isNew = !cells[key]
      if (isNew || Date.now() - lastFlush >= FLUSH_MS) ctx.waitUntil(flush(env).catch(() => {}))
      return json({ ok: true, located: true })
    }
    return json({ error: 'not found' }, 404)
  },
}
