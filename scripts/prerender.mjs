// Prerenders every route to static HTML after `vite build` and `vite build --ssr`.
// Output: dist/<route>/index.html for each route, plus dist/404.html.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE = 'https://www.goclean.cloud'
const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')

const { render, routes } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function setMeta(html, selector, value) {
  // selector: e.g. 'name="description"' -> replaces its content="..." attribute
  const re = new RegExp(`(<meta ${selector} content=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`Missing meta tag in index.html: ${selector}`)
  return html.replace(re, `$1${esc(value)}$2`)
}

function build({ url, title, description, canonical, robots }) {
  const app = render(url)
  if (!template.includes('<div id="root"></div>')) throw new Error('Root placeholder not found in dist/index.html')
  let html = template.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name="description"', description)
  html = setMeta(html, 'property="og:title"', title)
  html = setMeta(html, 'property="og:description"', description)
  html = setMeta(html, 'name="twitter:title"', title)
  if (robots) html = setMeta(html, 'name="robots"', robots)
  if (canonical) {
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    html = setMeta(html, 'property="og:url"', canonical)
  } else {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '')
  }
  return html
}

for (const r of routes) {
  const canonical = `${SITE}${r.path === '/' ? '/' : r.path + '/'}`
  const html = build({ url: r.path, title: r.title, description: r.description, canonical })
  const file = r.path === '/' ? join(dist, 'index.html') : join(dist, r.path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`prerendered ${r.path}`)
}

// 404 fallback for hosts that serve /404.html (GitHub Pages, Cloudflare Pages).
const notFound = build({
  url: '/__not-found',
  title: 'Page not found — goclean',
  description: DEFAULT_404_DESC(),
  robots: 'noindex, follow',
})
await writeFile(join(dist, '404.html'), notFound)
console.log('prerendered 404.html')

await rm(serverDir, { recursive: true, force: true })

function DEFAULT_404_DESC() {
  return 'The page you asked for does not exist or has moved.'
}
