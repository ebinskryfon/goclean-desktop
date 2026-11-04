import { Link } from '../../components/SiteLink'
import { ArrowRight, Download } from 'lucide-react'
import { Terminal } from '../../components/Terminal'
import { GithubIcon } from '../../components/GithubIcon'
import { REPO, VERSION } from '../../lib/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 h-[34rem] opacity-60" style={{ background: 'radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)' }} />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-24">
        <div>
          <Link to="/docs/introduction" className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted transition hover:text-fg">
            <span className="font-mono text-accent">{VERSION}</span>
            <span>Open source · MIT licensed</span>
          </Link>
          <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl xl:text-[4.25rem]">
            Your Go backend.<br />
            <span className="text-accent">Clean from the start.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Stop repeating boilerplate. Generate production-ready Go backend projects with Clean Architecture, database integrations, dependency injection, and developer-friendly tooling.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/docs/quick-start" className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#04101c] transition hover:opacity-90">
              Get Started <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/#download" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-fg transition hover:bg-surface">
              <Download size={16} /> Download
            </Link>
            <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-fg transition hover:bg-surface">
              <GithubIcon size={16} /> View on GitHub
            </a>
          </div>
          <p className="mt-6 font-mono text-xs tracking-wide text-muted">Start clean. Build faster. Ship better.</p>
        </div>
        <Terminal />
      </div>
    </section>
  )
}
