import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'

const supported = ['Go', 'Gin', 'Chi', 'GORM', 'PostgreSQL', 'MySQL', 'SQLite', 'Docker', 'Air']
const planned = [
  { name: 'Echo', kind: 'HTTP framework' },
  { name: 'Fiber', kind: 'HTTP framework' },
  { name: 'sqlx', kind: 'Database toolkit' },
  { name: 'Bun', kind: 'ORM' },
  { name: 'Ent', kind: 'ORM' },
]

export function Ecosystem() {
  return (
    <>
      <Section id="frameworks" eyebrow="Framework support" title="Built on tools Go teams already trust.">
        <Reveal>
          <h3 className="text-xs font-medium uppercase tracking-widest text-muted">Supported today</h3>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
            {supported.map((s) => (
              <li key={s} className="inline-flex items-center gap-2.5 rounded-md border border-line px-4 py-2.5 font-mono text-sm text-fg">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {s}
                <span className="sr-only">(supported)</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="roadmap" eyebrow="Roadmap" title="What comes next." intro="These integrations are planned. They are not available in the current release." tint>
        <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {planned.map((p) => (
            <li key={p.name} className="bg-bg px-5 py-6">
              <p className="font-mono text-base text-fg">{p.name}</p>
              <p className="mt-1 text-xs text-muted">{p.kind}</p>
              <p className="mt-4 inline-block rounded border border-dashed border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">Planned</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
