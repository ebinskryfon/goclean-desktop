import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Section({ id, eyebrow, title, intro, children, tint = false }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={`border-t border-line ${tint ? 'bg-surface/40' : ''}`}>
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}
