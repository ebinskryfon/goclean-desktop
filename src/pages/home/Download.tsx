import { useEffect, useState } from 'react'
import { Download as DownloadIcon } from 'lucide-react'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'
import { CodeBlock } from '../../components/CodeBlock'
import { OsIcon, type OS } from '../../components/OsIcon'
import { INSTALL_PS, INSTALL_SH, REPO, SETUP_FILES, SETUP_REPO, VERSION } from '../../lib/site'

const num = VERSION.replace(/^v/, '')
const asset = (os: OS, arch: string) =>
  `${REPO}/releases/download/${VERSION}/goclean_${num}_${os}_${arch}.${os === 'windows' ? 'zip' : 'tar.gz'}`

const platforms: { os: OS; name: string; cmd: string; lang: 'bash' | 'text'; archs: { label: string; arch: string }[]; note: string }[] = [
  { os: 'linux', name: 'Linux', cmd: INSTALL_SH, lang: 'bash', archs: [{ label: 'x86_64', arch: 'amd64' }, { label: 'ARM64', arch: 'arm64' }], note: 'Make it executable first: chmod +x goclean-setup-linux.AppImage' },
  { os: 'windows', name: 'Windows', cmd: INSTALL_PS, lang: 'text', archs: [{ label: 'x86_64', arch: 'amd64' }, { label: 'ARM64', arch: 'arm64' }], note: 'Windows may show a SmartScreen warning because the app is not code-signed. Click More info, then Run anyway.' },
  { os: 'darwin', name: 'macOS', cmd: INSTALL_SH, lang: 'bash', archs: [{ label: 'Apple Silicon', arch: 'arm64' }, { label: 'Intel', arch: 'amd64' }], note: 'macOS may block the app because it is not code-signed. Right-click it, choose Open, then confirm.' },
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
    <Section id="download" eyebrow="Download" title="Install goclean on any platform." intro={`Version ${VERSION}. One binary, no runtime required. Use the one-line installer or download the archive directly.`}>
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
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-[#04101c] transition hover:opacity-90"
              >
                <DownloadIcon size={15} aria-hidden="true" />
                Download goclean Setup
                <span className="sr-only"> for {p.name}</span>
              </a>
              <p className="mt-3 text-xs leading-relaxed text-muted">{p.note}</p>
              <p className="mt-6 text-xs uppercase tracking-widest text-muted">Command line</p>
              <div className="mt-2"><CodeBlock code={p.cmd} lang={p.lang} title={p.os === 'windows' ? 'powershell' : 'shell'} /></div>
              <p className="mt-6 text-xs uppercase tracking-widest text-muted">Direct download</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.archs.map((a, j) => (
                  <a
                    key={a.arch}
                    href={asset(p.os, a.arch)}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition ${j === 0 ? 'bg-accent text-[#04101c] hover:opacity-90' : 'border border-line text-fg hover:bg-surface'}`}
                  >
                    <DownloadIcon size={15} aria-hidden="true" />
                    {a.label}
                    <span className="sr-only"> for {p.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Setup installs Go and goclean for you; see its <a href={SETUP_REPO} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">source</a>. Prefer Go? <code className="font-mono text-fg">go install github.com/ebinskryfon/goclean@latest</code>. Verify downloads with{' '}
        <a href={`${REPO}/releases/download/${VERSION}/checksums.txt`} className="text-accent underline-offset-4 hover:underline">checksums.txt</a>, or see{' '}
        <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">all releases</a>.
      </p>
    </Section>
  )
}
