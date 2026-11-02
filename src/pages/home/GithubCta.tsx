import { Bug, Code2, Star } from 'lucide-react'
import { Section } from '../../components/Section'
import { REPO, PKG } from '../../lib/site'

export function GithubCta() {
  const base = 'inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition'
  return (
    <Section id="github" eyebrow="Community" title="Open source. Built for Go developers." intro="goclean is open source and welcomes contributions from the Go community.">
      <div className="flex flex-wrap gap-3">
        <a href={REPO} target="_blank" rel="noreferrer" className={`${base} bg-accent text-[#04101c] hover:opacity-90`}><Star size={16} /> Star on GitHub</a>
        <a href={REPO} target="_blank" rel="noreferrer" className={`${base} border border-line text-fg hover:bg-surface`}><Code2 size={16} /> View Source</a>
        <a href={`${REPO}/issues`} target="_blank" rel="noreferrer" className={`${base} border border-line text-fg hover:bg-surface`}><Bug size={16} /> Report an Issue</a>
      </div>
      <p className="mt-8 text-sm text-muted">
        Go package reference:{' '}
        <a href={PKG} target="_blank" rel="noreferrer" className="font-mono text-accent underline-offset-4 hover:underline">pkg.go.dev/github.com/ebinskryfon/goclean</a>
      </p>
    </Section>
  )
}
