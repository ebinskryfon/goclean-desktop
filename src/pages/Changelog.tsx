import { ExternalLink } from 'lucide-react'
import { usePageTitle } from '../lib/hooks'
import { Reveal } from '../components/Reveal'
import { REPO } from '../lib/site'
import { CHANGELOG_DESC } from '../lib/routes'

type Release = { version: string; date: string; summary: string; changes: { type: 'feat' | 'fix'; text: string }[] }

// Newest first. Mirrors the published GitHub releases.
const releases: Release[] = [
  {
    version: 'v1.2.0',
    date: '2026-11-04',
    summary: 'Generated projects now ship with a Dockerfile, and goclean gains install scripts.',
    changes: [
      { type: 'feat', text: 'New projects include a Dockerfile and .dockerignore.' },
      { type: 'feat', text: 'Install scripts for Linux/macOS (install.sh) and Windows (install.ps1).' },
      { type: 'fix', text: 'Generated Go files are now gofmt-formatted before being written.' },
      { type: 'fix', text: 'Hardened the generated Dockerfile: go.sum handling, SQLite data directory and image tag.' },
    ],
  },
  {
    version: 'v1.1.1',
    date: '2026-11-02',
    summary: 'Patch release following v1.1.0.',
    changes: [],
  },
  {
    version: 'v1.1.0',
    date: '2026-11-02',
    summary: 'Interactive stack selection, field-aware generators and a dedicated types layer.',
    changes: [
      { type: 'feat', text: 'Types layer for request, input and response DTOs.' },
      { type: 'feat', text: 'Field-aware generators, auto-registration, database and router choice, and release tooling.' },
      { type: 'feat', text: 'Interactive stack wizard and an --orm flag.' },
      { type: 'fix', text: 'Addressed review findings in the stack wizard.' },
    ],
  },
]

const badge = {
  feat: 'border-accent/40 text-accent',
  fix: 'border-line text-muted',
} as const
const label = { feat: 'New', fix: 'Fix' } as const

export default function Changelog() {
  usePageTitle('Changelog', CHANGELOG_DESC)
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Changelog</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">What's new in goclean.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Every release, newest first. Full notes live on{' '}
          <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">GitHub Releases</a>.
        </p>
      </Reveal>

      <ol className="mt-14 border-l border-line">
        {releases.map((r) => (
          <li key={r.version} className="relative pb-12 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 id={r.version} className="font-mono text-xl font-semibold text-fg">{r.version}</h2>
                <time dateTime={r.date} className="text-sm text-muted">{r.date}</time>
                <a href={`${REPO}/releases/tag/${r.version}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-fg">
                  Release notes <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{r.summary}</p>
              {r.changes.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {r.changes.map((c) => (
                    <li key={c.text} className="flex items-start gap-3 text-sm leading-relaxed text-fg">
                      <span className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[11px] uppercase ${badge[c.type]}`}>{label[c.type]}</span>
                      <span>{c.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </main>
  )
}
