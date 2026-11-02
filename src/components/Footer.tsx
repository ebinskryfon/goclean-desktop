import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { PKG, REPO, VERSION } from '../lib/site'

export function Footer() {
  const a = 'text-sm text-muted transition hover:text-fg'
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            A command-line tool that automates the creation of structured, maintainable Go backend applications using Clean Architecture.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-fg">Resources</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link className={a} to="/docs/introduction">Documentation</Link></li>
            <li><a className={a} href={REPO} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className={a} href={PKG} target="_blank" rel="noreferrer">Package Reference</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-fg">Project</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><a className={a} href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a></li>
            <li>Version <span className="font-mono">{VERSION}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-muted">Built for developers who love clean code.</p>
      </div>
    </footer>
  )
}
