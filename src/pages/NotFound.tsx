import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, BookOpen, Home } from 'lucide-react'
import { usePageTitle } from '../lib/hooks'

export default function NotFound() {
  usePageTitle('Page not found')
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]')
    const prev = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', 'noindex, follow')
    document.querySelector('link[rel="canonical"]')?.remove()
    return () => {
      if (prev) meta?.setAttribute('content', prev)
    }
  }, [])

  const btn = 'inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition'
  return (
    <main className="mx-auto max-w-6xl px-5 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">This package could not be found.</h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
        The page you asked for doesn't exist or has moved. Check the address, or head to one of the places below.
      </p>
      <pre className="mt-8 max-w-xl overflow-x-auto rounded-lg border border-line bg-surface p-5 font-mono text-sm leading-relaxed text-muted" aria-hidden="true">
{`$ goclean open `}<span className="text-fg">{pathname}</span>{`
`}<span className="text-accent">error:</span>{` no such route`}
      </pre>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className={`${btn} bg-accent text-[#04101c] hover:opacity-90`}><Home size={16} /> Back to home</Link>
        <Link to="/docs/introduction" className={`${btn} border border-line text-fg hover:bg-surface`}><BookOpen size={16} /> Documentation</Link>
        <Link to="/changelog" className={`${btn} border border-line text-fg hover:bg-surface`}>Changelog <ArrowRight size={16} /></Link>
      </div>
    </main>
  )
}
