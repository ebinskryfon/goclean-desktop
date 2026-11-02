import { useEffect, useMemo, useState } from 'react'
import { GRID_COLS, GRID_ROWS, GRID_STEP, GRID_TOP, LAND } from '../lib/worldGrid'
import { TRACK_EVENT, TRACK_URL } from '../lib/track'

type Spot = { lat: number; lon: number; n: number }

const CELL = 5
const SIZE = 3.6
const DOT = SIZE // highlighted square is the same size as a land square
const W = GRID_COLS * CELL
const H = GRID_ROWS * CELL

const landPath = LAND.map((row, r) =>
  [...row].map((v, c) => (v === '1' ? `M${c * CELL} ${r * CELL}h${SIZE}v${SIZE}h-${SIZE}z` : '')).join(''),
).join('')

function toCell(lat: number, lon: number) {
  const c = Math.floor((lon + 180) / GRID_STEP)
  const r = Math.floor((GRID_TOP - lat) / GRID_STEP)
  return c >= 0 && c < GRID_COLS && r >= 0 && r < GRID_ROWS ? { c, r } : null
}

export function WorldMap() {
  const [spots, setSpots] = useState<Spot[]>([])

  useEffect(() => {
    if (!TRACK_URL) return
    let alive = true
    const load = () =>
      fetch(`${TRACK_URL}/dots`)
        .then((r) => (r.ok ? r.json() : []))
        .then((d: Spot[]) => alive && Array.isArray(d) && setSpots(d))
        .catch(() => {})
    load()
    const onTracked = () => window.setTimeout(load, 600)
    window.addEventListener(TRACK_EVENT, onTracked)
    return () => { alive = false; window.removeEventListener(TRACK_EVENT, onTracked) }
  }, [])

  const cells = useMemo(() => {
    const m = new Map<string, { c: number; r: number; n: number }>()
    for (const s of spots) {
      const p = toCell(s.lat, s.lon)
      if (!p) continue
      const k = `${p.c},${p.r}`
      const prev = m.get(k)
      m.set(k, { ...p, n: (prev?.n ?? 0) + s.n })
    }
    return [...m.values()]
  }, [spots])

  const total = cells.reduce((a, c) => a + c.n, 0)

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`World map showing ${cells.length} locations where goclean was downloaded or copied`}>
        <path d={landPath} className="fill-muted" opacity="0.28" />
        {cells.map((d) => (
          <g key={`${d.c},${d.r}`}>
            <rect className="map-pulse fill-accent" x={d.c * CELL + SIZE / 2 - DOT / 2} y={d.r * CELL + SIZE / 2 - DOT / 2} width={DOT} height={DOT} />
            <rect className="fill-accent" x={d.c * CELL + SIZE / 2 - DOT / 2} y={d.r * CELL + SIZE / 2 - DOT / 2} width={DOT} height={DOT}>
              <title>{`${d.n} ${d.n === 1 ? 'event' : 'events'}`}</title>
            </rect>
          </g>
        ))}
      </svg>
      <p className="mt-4 font-mono text-xs text-muted">
        {TRACK_URL
          ? total > 0
            ? `${total} downloads and copies from ${cells.length} regions. Locations are approximate (about 300 km); no IP addresses are stored.`
            : 'Be the first dot on the map: download goclean or copy an install command.'
          : 'Live map is not connected yet.'}
      </p>
    </div>
  )
}
