import { useEffect, useState } from 'react'
import { Download as DownloadIcon } from 'lucide-react'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'
import { OsIcon, type OS } from '../../components/OsIcon'
import { REPO } from '../../lib/site'

const platforms: { os: OS; name: string; note: string }[] = [
  { os: 'linux', name: 'Linux', note: 'The Linux installer will be an AppImage.' },
  { os: 'windows', name: 'Windows', note: 'The Windows installer is on the way.' },
  { os: 'darwin', name: 'macOS', note: 'The macOS installer is on the way.' },
]

function detectOS(): OS | null {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac')) return 'darwin'
  if (ua.includes('linux') || ua.includes('x11')) return 'linux'
  return null
}

export function Download() {
  const [mine, setMine] = useState<OS | null>(null)
  useEffect(() => setMine(detectOS()), [])

  return (
    <Section id="download" eyebrow="Download" title="Install gostrata on any platform." intro="gostrata is under release development. Downloads will be available here soon. Stay tuned.">
      <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
        {platforms.map((p, i) => (
          <Reveal key={p.os} delay={i * 80} className="h-full bg-bg">
            <div className="flex h-full flex-col p-7">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-lg font-medium text-fg"><span className="text-accent"><OsIcon os={p.os} size={24} /></span>{p.name}</h3>
                {mine === p.os && <span className="rounded border border-accent px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">Your system</span>}
              </div>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted">Graphical installer</p>
              <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-muted">
                <DownloadIcon size={15} aria-hidden="true" />
                Coming soon
                <span className="sr-only"> for {p.name}</span>
              </span>
              <p className="mt-3 text-xs leading-relaxed text-muted">{p.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Stay tuned: follow the <a href={REPO} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">gostrata repository on GitHub</a> for release updates.
      </p>
    </Section>
  )
}
