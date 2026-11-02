import { Check, Copy } from 'lucide-react'
import { useCopy } from '../lib/hooks'

export function CopyButton({ text, label = 'Copy', className = '' }: { text: string; label?: string; className?: string }) {
  const { copied, copy } = useCopy(text)
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : label}
      className={`inline-flex h-7 items-center gap-1.5 rounded px-2 text-xs text-[#8d9db8] transition hover:bg-white/10 hover:text-white ${className}`}
    >
      {copied ? <Check size={14} className="text-[#22d3ee]" /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? 'Copied' : ''}</span>
    </button>
  )
}
