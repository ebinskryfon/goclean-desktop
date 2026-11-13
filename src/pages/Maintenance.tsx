import { Wrench } from 'lucide-react'
import { Logo } from '../components/Logo'
import { ThemeToggle } from '../components/ThemeToggle'
import { GithubIcon } from '../components/GithubIcon'
import { MaintenanceAnimation } from '../components/MaintenanceAnimation'
import { REPO } from '../lib/site'

export default function Maintenance() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 h-[34rem] opacity-60" style={{ background: 'radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)' }} />
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <ThemeToggle />
      </header>
      <section className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-24 text-center">
        <MaintenanceAnimation />
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
          <Wrench size={13} className="text-accent" aria-hidden="true" />
          <span className="font-mono text-accent">Maintenance</span>
        </span>
        <h1 className="mt-7 text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl">
          We're upgrading to <span className="text-accent">gostrata</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The package formerly known as goclean has a new name, and this site is under maintenance while the new release is in development. Stay tuned.
        </p>
        <p className="mt-6 rounded-md border border-line bg-surface px-4 py-3 text-sm text-muted">
          <span className="font-medium text-fg">What's changing?</span> goclean is now <span className="font-medium text-fg">gostrata</span>. It's the same open-source Go CLI for Clean Architecture backends, under a new name. Looking for goclean? You're in the right place.
        </p>
        <a href={REPO} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-fg transition hover:bg-surface">
          <GithubIcon size={16} /> Follow on GitHub
        </a>
      </section>
    </main>
  )
}
