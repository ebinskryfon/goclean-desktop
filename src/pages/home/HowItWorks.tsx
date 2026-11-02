import { ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react'
import { Fragment } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'
import { INSTALL_CMD } from '../../lib/site'

const steps = [
  { n: '01', title: 'Install goclean', code: INSTALL_CMD },
  { n: '02', title: 'Create a new Go project', code: 'goclean new my-saas\ncd my-saas' },
  { n: '03', title: 'Generate modules and build', code: 'goclean make:module Product name:string price:float stock:int' },
]

const layers = [
  { name: 'Delivery', body: 'HTTP handlers, routing and request/response DTOs. Translates the outside world into usecase calls.' },
  { name: 'Usecase', body: 'Application business rules. Orchestrates entities and depends only on domain interfaces.' },
  { name: 'Domain', body: 'Entities and repository interfaces. The core of the app, with no outward dependencies.' },
  { name: 'Infrastructure', body: 'Databases, GORM repositories, config and logging. Implements the interfaces the domain declares.' },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works" eyebrow="How it works" title="Three steps from empty directory to running API." tint>
      <ol className="grid gap-6 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 90}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="text-lg font-medium text-fg">{s.title}</h3>
              </div>
              <div className="mt-4"><CodeBlock code={s.code} /></div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-fg">The architecture it generates</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted">Dependencies point toward the domain. Business logic never imports a framework or a database driver.</p>

        <figure className="mt-8" aria-label="Architecture diagram: Delivery depends on Usecase, Usecase depends on Domain, Infrastructure depends on Domain">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {layers.map((l, i) => {
              const Arrow = i === 0 || i === 1 ? ArrowRight : i === 2 ? ArrowLeft : null
              return (
                <Fragment key={l.name}>
                  <div className={`flex-1 rounded-md border px-5 py-5 text-center ${l.name === 'Domain' ? 'border-accent text-accent' : 'border-line text-fg'}`}>
                    <span className="font-mono text-sm">{l.name}</span>
                  </div>
                  {Arrow && (
                    <>
                      <Arrow size={18} className="hidden shrink-0 text-muted lg:block" aria-hidden="true" />
                      <ArrowDown size={18} className="mx-auto shrink-0 text-muted lg:hidden" aria-hidden="true" />
                    </>
                  )}
                </Fragment>
              )
            })}
          </div>
          <figcaption className="mt-3 font-mono text-xs text-muted">Delivery → Usecase → Domain ← Infrastructure</figcaption>
        </figure>

        <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {layers.map((l) => (
            <div key={l.name} className="border-t border-line pt-4">
              <dt className="font-mono text-sm text-fg">{l.name}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{l.body}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
