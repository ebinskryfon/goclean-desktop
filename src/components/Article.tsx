import type { ReactNode } from 'react'

/** Shared layout for standalone prose pages (Privacy, Contributing). */
export function Article({ eyebrow, title, summary, children }: { eyebrow: string; title: string; summary: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-20">
      <article className="prose-doc max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] !text-accent">{eyebrow}</p>
        <h1 className="!mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h1>
        <p className="!mt-3 text-lg">{summary}</p>
        <div className="!mt-8 !space-y-0 border-t border-line pt-8 [&>*+*]:!mt-5">{children}</div>
      </article>
    </div>
  )
}
