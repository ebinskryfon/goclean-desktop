import type { ReactNode } from 'react'
import { Info } from 'lucide-react'

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function H2({ children }: { children: string }) {
  const id = slugify(children)
  return <h2 id={id} className="!mt-12 scroll-mt-24 text-xl font-semibold tracking-tight text-fg"><a href={`#${id}`} className="!text-fg hover:!no-underline">{children}</a></h2>
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-md border border-line border-l-2 border-l-accent bg-surface/60 px-4 py-3 text-sm">
      <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <div className="text-muted [&_code]:text-[0.9em]">{children}</div>
    </div>
  )
}
