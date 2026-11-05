// Bumps the site to a new goclean release.
// Usage: TAG=v1.2.0 DATE=2026-11-04 BODY="<release notes>" node scripts/bump-release.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const { TAG, DATE, BODY = '' } = process.env
if (!/^v\d+\.\d+\.\d+$/.test(TAG ?? '')) throw new Error(`TAG must look like v1.2.3, got "${TAG}"`)
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE ?? '')) throw new Error(`DATE must look like 2026-11-04, got "${DATE}"`)

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

// Parse conventional-commit lines such as "* 8b4397a feat(cli): add thing" or "- fix: thing".
const changes = []
for (const line of BODY.split('\n')) {
  const m = line.match(/^\s*[*-]\s+(?:[0-9a-f]{7,40}\s+)?(feat|fix)(?:\([^)]*\))?!?:\s*(.+?)\s*$/i)
  if (!m) continue
  const text = m[2].charAt(0).toUpperCase() + m[2].slice(1)
  changes.push({ type: m[1].toLowerCase(), text: /[.!?]$/.test(text) ? text : `${text}.` })
}

// Version
const sitePath = 'src/lib/site.ts'
let site = readFileSync(sitePath, 'utf8')
if (!/export const VERSION = '[^']*'/.test(site)) throw new Error('VERSION not found in site.ts')
site = site.replace(/export const VERSION = '[^']*'/, `export const VERSION = '${TAG}'`)
writeFileSync(sitePath, site)

// Changelog
const clPath = 'src/pages/Changelog.tsx'
let cl = readFileSync(clPath, 'utf8')
if (cl.includes(`version: '${TAG}'`)) {
  console.log(`${TAG} already in changelog, only VERSION updated`)
} else {
  const marker = 'const releases: Release[] = [\n'
  if (!cl.includes(marker)) throw new Error('releases array not found in Changelog.tsx')
  const items = changes.map((c) => `      { type: '${c.type}', text: '${esc(c.text)}' },\n`).join('')
  const entry =
    `  {\n    version: '${TAG}',\n    date: '${DATE}',\n    summary: 'TODO: write a one-line summary.',\n` +
    `    changes: [${items ? `\n${items}    ` : ''}],\n  },\n`
  cl = cl.replace(marker, marker + entry)
  writeFileSync(clPath, cl)
  console.log(`Added ${TAG} with ${changes.length} change(s)`)
}
