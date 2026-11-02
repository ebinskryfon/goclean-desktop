import { useEffect, useState } from 'react'
import { Download as DownloadIcon } from 'lucide-react'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'
import { OsIcon, type OS } from '../../components/OsIcon'
import { track } from '../../lib/track'
import { REPO, SETUP_FILES, SETUP_REPO, VERSION } from '../../lib/site'

const platforms: { os: OS; name: string; note: string }[] = [
  { os: 'linux', name: 'Linux', note: 'Make it executable first: chmod +x goclean-setup-linux.AppImage' },
  { os: 'windows', name: 'Windows', note: 'Windows may show a SmartScreen warning because the app is not code-signed. Click More info, then Run anyway.' },
  { os: 'darwin', name: 'macOS', note: 'macOS may block the app because it is not code-signed. Right-click it, choose Open, then confirm.' },
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
    <Section id="download" eyebrow="Download" title="Install goclean on any platform." intro={`Version ${VERSION}. Download goclean Setup and it installs Go and goclean for you.`}>
      <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
        {platforms.map((p, i) => (
          <Reveal key={p.os} delay={i * 80} className="h-full bg-bg">
            <div className="flex h-full flex-col p-7">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-lg font-medium text-fg"><span className="text-accent"><OsIcon os={p.os} size={24} /></span>{p.name}</h3>
                {mine === p.os && <span className="rounded border border-accent px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">Your system</span>}
              </div>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted">Graphical installer</p>
              <a
                href={SETUP_FILES[p.os]}
                onClick={() => track('download')}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-[#04101c] transition hover:opacity-90"
              >
                <DownloadIcon size={15} aria-hidden="true" />
                Download goclean Setup
                <span className="sr-only"> for {p.name}</span>
              </a>
              <p className="mt-3 text-xs leading-relaxed text-muted">{p.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Setup is open source: <a href={SETUP_REPO} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">view the source</a>. Looking for the CLI only? See{' '}
        <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">all releases</a>.
      </p>
    </Section>
  )
}
