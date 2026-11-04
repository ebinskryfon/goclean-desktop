import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Compass, Layers, Scale, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePageTitle } from '../lib/hooks'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { PKG, REPO, VERSION } from '../lib/site'

const principles: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Layers, title: 'Structure first', body: 'Folder layout and dependency direction are decided on day one, so the codebase stays readable as it grows.' },
  { icon: Compass, title: 'Sensible defaults', body: 'Gin or Chi, PostgreSQL, MySQL or SQLite, GORM, Viper and Zerolog come pre-wired. Swap them without fighting the layout.' },
  { icon: Sparkles, title: 'Less boilerplate', body: 'One command generates an entity, DTOs, repository, usecase, handler, migration and routes.' },
  { icon: Scale, title: 'Open and permissive', body: 'goclean is MIT licensed. Read it, fork it, and send improvements back.' },
]

const stats = [
  { label: 'Language', value: 'Go' },
  { label: 'Architecture', value: 'Clean' },
  { label: 'License', value: 'MIT' },
  { label: 'Version', value: VERSION },
]

export default function About() {
  usePageTitle('About', 'About goclean: an open-source Go CLI that scaffolds Clean Architecture backends with Gin or Chi, GORM, Docker and more.')
  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-20 pt-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Start clean. Build faster. Ship better.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            goclean is a command-line tool that scaffolds structured, maintainable Go backend applications using Clean Architecture. This site is its documentation, packaged as a desktop-friendly web app.
          </p>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-b border-r border-line p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">{s.label}</dt>
              <dd className="mt-2 font-mono text-lg text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Section eyebrow="Why goclean" title="Every Go service starts with the same decisions." intro="Where do handlers live? How do repositories get injected? Where does configuration go? goclean answers these once, consistently, so you spend your time on the product instead of the plumbing.">
        <ul className="grid border-l border-t border-line sm:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.title} className="border-b border-r border-line">
              <Reveal delay={(i % 2) * 70} className="h-full p-7">
                <p.icon size={20} className="text-accent" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-5 text-base font-medium text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Open source" title="Built in the open." intro="goclean is developed on GitHub. Issues, ideas and pull requests are welcome." tint>
        <div className="flex flex-wrap gap-3">
          <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#04101c] transition hover:opacity-90"><Code2 size={16} /> View on GitHub</a>
          <Link to="/docs/introduction" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-fg transition hover:bg-surface">Read the docs <ArrowRight size={16} /></Link>
        </div>
        <p className="mt-8 text-sm text-muted">
          Go package reference:{' '}
          <a href={PKG} target="_blank" rel="noreferrer" className="font-mono text-accent underline-offset-4 hover:underline">pkg.go.dev/github.com/ebinskryfon/goclean</a>
        </p>
      </Section>
    </>
  )
}
