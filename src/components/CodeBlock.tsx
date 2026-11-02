import { CopyButton } from './CopyButton'
import { highlight, type Lang } from '../lib/highlight'

export function CodeBlock({ code, lang = 'bash', title, copyText }: { code: string; lang?: Lang; title?: string; copyText?: string }) {
  const raw = code.replace(/\n$/, '')
  return (
    <figure className="code-surface overflow-hidden rounded-lg text-left">
      <div className="flex items-center justify-between border-b border-[#1e2c45] px-3 py-1.5">
        <span className="font-mono text-xs text-[#5f7191]">{title ?? lang}</span>
        <CopyButton text={copyText ?? raw} label={`Copy ${title ?? lang} code`} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed" tabIndex={0}>
        <code>{highlight(raw, lang)}</code>
      </pre>
    </figure>
  )
}
