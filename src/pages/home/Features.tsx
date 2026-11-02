import { Blocks, Boxes, Container, Database, Eye, Layers, Network, Power, RefreshCw, ScrollText, Settings2, type LucideIcon } from 'lucide-react'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'

const features: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Layers, title: 'Clean Architecture', body: 'Domain, Usecase, Delivery and Infrastructure layers with dependencies pointing inward.' },
  { icon: Network, title: 'Multiple HTTP frameworks', body: 'Pick Gin or Chi. The delivery layer is generated for the one you choose.' },
  { icon: Database, title: 'Database support', body: 'PostgreSQL, MySQL and SQLite, wired up with connection config and migrations.' },
  { icon: Boxes, title: 'ORM integration', body: 'GORM is configured out of the box, behind repository interfaces.' },
  { icon: Blocks, title: 'Module generator', body: 'Generate entities, DTOs, repositories, usecases, handlers, migrations and route registration in one command.' },
  { icon: Settings2, title: 'Configuration', body: 'Viper-based configuration, loaded once and injected where it is needed.' },
  { icon: ScrollText, title: 'Structured logging', body: 'Zerolog integration with fast, leveled, structured output.' },
  { icon: Power, title: 'Graceful shutdown', body: 'A production-friendly server lifecycle that drains requests before exit.' },
  { icon: Container, title: 'Docker support', body: 'A Dockerfile and Docker Compose setup, ready for local development.' },
  { icon: RefreshCw, title: 'Hot reload', body: 'Air integration so changes rebuild and restart the server automatically.' },
  { icon: Eye, title: 'Dry run', body: 'Preview every file goclean would create before anything touches your disk.' },
]

export function Features() {
  return (
    <Section id="features" eyebrow="Features" title="Everything a backend needs, decided once." intro="goclean makes the structural decisions for you, so the first commit is already the shape of a maintainable service.">
      <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <li key={f.title} className="border-b border-r border-line">
            <Reveal delay={(i % 3) * 70} className="h-full p-7">
              <f.icon size={20} className="text-accent" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-5 text-base font-medium text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
