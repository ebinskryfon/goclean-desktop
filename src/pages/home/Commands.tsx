import { Link } from '../../components/SiteLink'
import { CodeBlock } from '../../components/CodeBlock'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'
import { INSTALL_CMD } from '../../lib/site'

const cmds = [
  { name: 'Install', syntax: 'go install github.com/ebinskryfon/goclean@latest', desc: 'Installs the goclean binary into your GOBIN directory.', example: INSTALL_CMD },
  { name: 'goclean new', syntax: 'goclean new <project-name>', desc: 'Creates a new Go backend project with the Clean Architecture layout.', example: 'goclean new my-project' },
  { name: 'goclean make:module', syntax: 'goclean make:module <Name> [field:type ...]', desc: 'Generates an entity, DTOs, repository, usecase, handler, migration and route registration for a module.', example: 'goclean make:module Product name:string price:float stock:int' },
]

export function Commands() {
  return (
    <Section id="commands" eyebrow="Command reference" title="A small CLI with a clear surface." intro="Three commands cover the workflow from install to a fully wired feature module.">
      <div className="divide-y divide-line border-y border-line">
        {cmds.map((c) => (
          <Reveal key={c.name} className="grid gap-6 py-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h3 className="font-mono text-base text-fg">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted">Syntax</p>
              <code className="mt-1.5 block break-all font-mono text-sm text-accent">{c.syntax}</code>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-muted">Example</p>
              <CodeBlock code={c.example} />
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Need more? Read the <Link to="/docs/available-commands" className="text-accent underline-offset-4 hover:underline">full command documentation</Link>.
      </p>
    </Section>
  )
}
