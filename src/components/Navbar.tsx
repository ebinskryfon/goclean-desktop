import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, NavLink } from './SiteLink'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { REPO, VERSION } from '../lib/site'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Documentation', to: '/docs/introduction' },
  { label: 'Download', to: '/#download' },
  { label: 'Features', to: '/#features' },
  { label: 'Commands', to: '/#commands' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About', to: '/about' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  const linkCls = 'whitespace-nowrap rounded-md px-2.5 py-2 text-sm text-muted transition hover:text-fg xl:px-3'

  return (
    <header className={`sticky top-0 z-50 transform-gpu border-b transition-colors ${scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 lg:px-3 xl:gap-4 xl:px-5">
        <Link to="/" aria-label="goclean home" className="mr-2 shrink-0"><Logo /></Link>
        <ul className="hidden items-center lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              {l.to.includes('#') ? (
                <Link to={l.to} className={linkCls}>{l.label}</Link>
              ) : (
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `${linkCls} ${isActive && (l.to === '/' || l.label === 'Documentation' || l.label === 'About' || l.label === 'FAQ') ? '!text-fg' : ''}`}>
                  {l.label}
                </NavLink>
              )}
            </li>
          ))}
          <li><a href={REPO} target="_blank" rel="noreferrer" className={linkCls}>GitHub</a></li>
        </ul>
        <span className="hidden rounded border border-line px-2 py-0.5 font-mono text-xs text-muted xl:inline">{VERSION}</span>

        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link to="/docs/quick-start" className="whitespace-nowrap rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#04101c] transition hover:opacity-90">Get Started</Link>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-fg hover:bg-surface">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-5 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}><Link to={l.to} className="block py-2.5 text-fg">{l.label}</Link></li>
            ))}
            <li><a href={REPO} target="_blank" rel="noreferrer" className="block py-2.5 text-fg">GitHub</a></li>
          </ul>
          <div className="mt-3 flex items-center gap-3">
            <Link to="/docs/quick-start" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#04101c]">Get Started</Link>
            <span className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">{VERSION}</span>
          </div>
        </div>
      )}
    </header>
  )
}
