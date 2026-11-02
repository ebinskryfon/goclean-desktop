import type { ReactNode } from 'react'

export type Lang = 'bash' | 'go' | 'yaml' | 'sql' | 'text'

const s = (cls: string, text: string, key: number | string) => (
  <span key={key} className={cls}>{text}</span>
)

const FIELD_TYPES = /^(\w+):(string|text|int|float|bool|time|uuid)$/

function bashLine(line: string): ReactNode[] {
  if (/^\s*#/.test(line)) return [s('tok-comment', line, 0)]
  const out: ReactNode[] = []
  let idx = 0
  line.split(/(\s+)/).forEach((p, i) => {
    if (!p) return
    if (/^\s+$/.test(p)) { out.push(p); return }
    if (p === '$' && idx === 0) { out.push(s('tok-prompt', p, i)); return }
    let cls = ''
    const field = FIELD_TYPES.exec(p)
    if (/^(["']).*\1$/.test(p)) cls = 'tok-string'
    else if (p.startsWith('-')) cls = 'tok-flag'
    else if (idx === 0) cls = p === 'goclean' ? 'tok-brand' : 'tok-cmd'
    else if (field) {
      out.push(s('tok-cmd', field[1], `${i}a`), ':', s('tok-type', field[2], `${i}b`))
      idx++
      return
    } else if (idx === 1) cls = 'tok-keyword'
    out.push(cls ? s(cls, p, i) : p)
    idx++
  })
  return out
}

const GO_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|`[^`]*`)|\b(package|import|func|type|struct|interface|return|var|const|if|else|for|range|go|defer|map|chan|select|switch|case|default|nil)\b|\b([A-Z]\w*)\b|(\b\d+\b)/g

function goLine(line: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of line.matchAll(GO_RE)) {
    const at = m.index ?? 0
    if (at > last) out.push(line.slice(last, at))
    const cls = m[1] ? 'tok-comment' : m[2] ? 'tok-string' : m[3] ? 'tok-keyword' : m[4] ? 'tok-type' : 'tok-number'
    out.push(s(cls, m[0], at))
    last = at + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

function yamlLine(line: string): ReactNode[] {
  if (/^\s*#/.test(line)) return [s('tok-comment', line, 0)]
  const m = /^(\s*(?:-\s+)?)([\w.-]+)(:)(.*)$/.exec(line)
  if (!m) return [line]
  const rest = m[4].trim()
  return [m[1], s('tok-keyword', m[2], 1), m[3], ' ', rest ? s('tok-string', rest, 2) : '']
}

const SQL_RE = /(--.*$)|\b(CREATE|TABLE|NOT|NULL|PRIMARY|KEY|DEFAULT|DROP|IF|EXISTS|INDEX|ON|ALTER|ADD|COLUMN)\b|\b(BIGSERIAL|SERIAL|TEXT|INTEGER|INT|NUMERIC|VARCHAR|TIMESTAMP|TIMESTAMPTZ|BOOLEAN)\b/g
function sqlLine(line: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of line.matchAll(SQL_RE)) {
    const at = m.index ?? 0
    if (at > last) out.push(line.slice(last, at))
    out.push(s(m[1] ? 'tok-comment' : m[2] ? 'tok-keyword' : 'tok-type', m[0], at))
    last = at + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

export function highlight(code: string, lang: Lang): ReactNode[] {
  const fn = { bash: bashLine, go: goLine, yaml: yamlLine, sql: sqlLine, text: (l: string) => [l] }[lang]
  return code.split('\n').map((line, i, arr) => (
    <span key={i}>{fn(line)}{i < arr.length - 1 ? '\n' : ''}</span>
  ))
}
