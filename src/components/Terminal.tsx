import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { CopyButton } from './CopyButton'
import { highlight } from '../lib/highlight'
import { prefersReducedMotion } from '../lib/hooks'

type Line = { kind: 'comment' | 'cmd' | 'out'; text: string }

const LINES: Line[] = [
  { kind: 'comment', text: '# Install goclean' },
  { kind: 'cmd', text: 'go install github.com/ebinskryfon/goclean@latest' },
  { kind: 'comment', text: '# Create a project' },
  { kind: 'cmd', text: 'goclean new my-saas' },
  { kind: 'out', text: '✓ Project my-saas created' },
  { kind: 'comment', text: '# Generate a module' },
  { kind: 'cmd', text: 'goclean make:module Product name:string price:float stock:int' },
  { kind: 'out', text: '✓ Module Product generated' },
]

export function Terminal() {
  const [pos, setPos] = useState(() => (prefersReducedMotion() ? { line: LINES.length, char: 0 } : { line: 0, char: 0 }))
  const done = pos.line >= LINES.length

  useEffect(() => {
    if (done) return
    const cur = LINES[pos.line]
    const instant = cur.kind === 'out'
    const finished = instant || pos.char >= cur.text.length
    const delay = finished ? (instant ? 350 : 380) : cur.kind === 'comment' ? 14 : 24
    const t = window.setTimeout(() => {
      setPos(finished ? { line: pos.line + 1, char: 0 } : { line: pos.line, char: pos.char + 1 })
    }, delay)
    return () => window.clearTimeout(t)
  }, [pos, done])

  const visible = LINES.map((l, i) => {
    if (i < pos.line) return l.text
    if (i === pos.line) return l.kind === 'out' ? '' : l.text.slice(0, pos.char)
    return null
  })

  return (
    <div className="code-surface overflow-hidden rounded-xl shadow-[0_30px_80px_-40px_rgba(34,211,238,0.25)]" role="group" aria-label="Terminal demo">
      <div className="flex items-center justify-between border-b border-[#1e2c45] px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a3b58]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a3b58]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a3b58]" />
        </div>
        <span className="font-mono text-xs text-[#5f7191]">~/projects — zsh</span>
        <button type="button" aria-label="Replay animation" onClick={() => setPos({ line: 0, char: 0 })} className="inline-flex h-7 w-7 items-center justify-center rounded text-[#8d9db8] hover:bg-white/10 hover:text-white">
          <RotateCcw size={14} />
        </button>
      </div>
      <div className="min-h-[18.5rem] space-y-1 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {LINES.map((l, i) => {
          const v = visible[i]
          if (v === null) return null
          const typing = i === pos.line && !done
          if (l.kind === 'out') return <div key={i} className="text-[#9be3a6]">{v}</div>
          if (l.kind === 'comment') return <div key={i} className="tok-comment">{v}{typing && <span className="caret" />}</div>
          return (
            <div key={i} className="group flex items-start justify-between gap-3">
              <div className="min-w-0 break-all">
                <span className="tok-prompt mr-2">$</span>
                {highlight(v, 'bash')}
                {typing && <span className="caret" />}
              </div>
              {i < pos.line && <CopyButton text={l.text} label={`Copy command: ${l.text}`} className="-mt-0.5 shrink-0" />}
            </div>
          )
        })}
        {done && <div><span className="tok-prompt mr-2">$</span><span className="caret" /></div>}
      </div>
      <div className="flex justify-end border-t border-[#1e2c45] px-3 py-1.5">
        <CopyButton text={LINES.filter((l) => l.kind === 'cmd').map((l) => l.text).join('\n')} label="Copy all commands" className="[&>span:last-child]:hidden" />
        <span className="self-center pr-1 text-xs text-[#5f7191]">Copy all commands</span>
      </div>
    </div>
  )
}
