import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, NavLink, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, List, Search, X } from 'lucide-react'
import { docs } from '../docs/pages'
import { usePageTitle } from '../lib/hooks'

export default function Docs() {
  const { slug } = useParams()
  const idx = docs.findIndex((d) => d.slug === slug)
  const page = docs[idx]
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [toc, setToc] = useState<{ id: string; text: string }[]>([])
  const searchRef = useRef<HTMLInputElement>(null)
  const articleRef = useRef<HTMLElement>(null)

  usePageTitle(page?.title, page?.summary)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setNavOpen(false)
    const hs = articleRef.current?.querySelectorAll('h2') ?? []
    setToc([...hs].map((h) => ({ id: h.id, text: h.textContent ?? '' })))
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
  }, [slug])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !/INPUT|TEXTAREA/.test(t.tagName)) { e.preventDefault(); setNavOpen(true); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return docs
    return docs.filter((d) => `${d.title} ${d.summary} ${d.keywords}`.toLowerCase().includes(q))
  }, [query])

  if (!page) return <Navigate to="/docs/introduction" replace />
  const prev = docs[idx - 1]
  const next = docs[idx + 1]

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="flex items-center gap-3 border-b border-line py-3 lg:hidden">
        <button type="button" onClick={() => setNavOpen(!navOpen)} aria-expanded={navOpen} aria-controls="docs-nav" className="inline-flex items-center gap-2 text-sm text-fg">
          <List size={16} /> Menu
        </button>
        <span className="text-sm text-muted">/ {page.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)_12rem] lg:py-10">
        <aside id="docs-nav" className={`${navOpen ? 'block' : 'hidden'} py-6 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:py-0`}>
          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs"
              aria-label="Search documentation"
              className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-8 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
            />
            {query ? (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-fg"><X size={14} /></button>
            ) : (
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 font-mono text-[10px] text-muted">/</kbd>
            )}
          </div>
          <nav aria-label="Documentation" className="mt-5">
            <ul className="space-y-0.5">
              {results.map((d) => (
                <li key={d.slug}>
                  <NavLink
                    to={`/docs/${d.slug}`}
                    className={({ isActive }) => `block rounded-md px-3 py-1.5 text-sm transition ${isActive ? 'bg-surface font-medium text-accent' : 'text-muted hover:text-fg'}`}
                  >
                    {d.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            {results.length === 0 && <p className="px-3 py-2 text-sm text-muted">No results for “{query}”.</p>}
          </nav>
        </aside>

        <main className="min-w-0 py-8 lg:py-0">
          <article ref={articleRef} key={page.slug} className="prose-doc max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] !text-accent">Documentation</p>
            <h1 className="!mt-3 text-4xl font-semibold tracking-tight text-fg">{page.title}</h1>
            <p className="!mt-3 text-lg">{page.summary}</p>
            <div className="!mt-8 !space-y-0 border-t border-line pt-8 [&>*+*]:!mt-5">{page.body}</div>
          </article>

          <nav aria-label="Pagination" className="mt-16 grid max-w-3xl gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link to={`/docs/${prev.slug}`} className="group rounded-md border border-line p-4 transition hover:border-accent">
                <span className="flex items-center gap-1.5 text-xs text-muted"><ArrowLeft size={13} /> Previous</span>
                <span className="mt-1 block text-sm font-medium text-fg">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/docs/${next.slug}`} className="group rounded-md border border-line p-4 text-right transition hover:border-accent">
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted">Next <ArrowRight size={13} /></span>
                <span className="mt-1 block text-sm font-medium text-fg">{next.title}</span>
              </Link>
            )}
          </nav>
        </main>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start" aria-label="On this page">
          {toc.length > 0 && (
            <>
              <p className="text-xs font-medium uppercase tracking-widest text-fg">On this page</p>
              <ul className="mt-3 space-y-2 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-3 text-sm text-muted transition hover:border-accent hover:text-fg">{t.text}</a></li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
