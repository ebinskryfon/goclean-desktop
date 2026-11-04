import { Link } from '../components/SiteLink'
import { ArrowRight, ChevronDown, Code2 } from 'lucide-react'
import { usePageTitle } from '../lib/hooks'
import { Reveal } from '../components/Reveal'
import { REPO } from '../lib/site'
import { FAQ_DESC } from '../lib/routes'
import { faq, faqJsonLd } from '../lib/faq'

export default function Faq() {
  usePageTitle('FAQ', FAQ_DESC)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <header className="mx-auto max-w-6xl px-5 pb-12 pt-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">FAQ</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Frequently asked questions</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Quick answers about installing goclean, the stack it generates and how it fits into your workflow.
          </p>
        </Reveal>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-20">
        {faq.map((group) => (
          <section key={group.title} className="mt-12 first:mt-0" aria-labelledby={`faq-${group.title}`}>
            <h2 id={`faq-${group.title}`} className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{group.title}</h2>
            <div className="mt-4 border-t border-line">
              {group.items.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-fg marker:hidden [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown size={18} className="shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="pb-6 pr-8 text-sm leading-relaxed text-muted">
                    <p>{item.a}</p>
                    {item.link && (
                      <Link to={item.link.to} className="mt-3 inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline">
                        {item.link.label} <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 border border-line p-7">
          <h2 className="text-lg font-medium text-fg">Still have a question?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Check the documentation, or ask on GitHub and we will help.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`${REPO}/issues`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#04101c] transition hover:opacity-90"><Code2 size={16} /> Ask on GitHub</a>
            <Link to="/docs/introduction" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-fg transition hover:bg-surface">Read the docs <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </>
  )
}
