import { Link } from '../components/SiteLink'
import { Article } from '../components/Article'
import { CodeBlock } from '../components/CodeBlock'
import { H2, Note } from '../docs/Prose'
import { usePageTitle } from '../lib/hooks'
import { REPO } from '../lib/site'
import { CONTRIBUTING_DESC } from '../lib/routes'

export default function Contributing() {
  usePageTitle('Contributing', CONTRIBUTING_DESC)
  return (
    <Article eyebrow="Open source" title="Contributing" summary="How to report a bug, suggest an idea, or send a pull request.">
      <p>goclean is MIT licensed and developed in the open. Bug reports, fixes, documentation improvements and ideas are all welcome.</p>

      <H2>Where to start</H2>
      <p>Everything happens in the <a href={REPO} target="_blank" rel="noreferrer">goclean repository</a> on GitHub. Open issues and pull requests there, whether they concern the CLI, the documentation or this website.</p>

      <H2>Reporting a bug</H2>
      <p>Open an issue and include:</p>
      <ul>
        <li>The exact command you ran, with flags, and the output.</li>
        <li>Your goclean version (<code>goclean version</code>) and operating system.</li>
        <li>The result of <code>goclean doctor</code>.</li>
        <li>What you expected to happen instead.</li>
      </ul>
      <p>Check <Link to="/docs/troubleshooting">Troubleshooting</Link> and existing issues first.</p>

      <H2>Suggesting a feature</H2>
      <p>Open an issue describing the problem you want solved before writing code. A short discussion up front saves rework, especially for changes to generated project structure.</p>

      <H2>Working on the website</H2>
      <p>Clone the repository, then use Node.js 22 or newer, matching the deploy workflow, from the website's directory.</p>
      <CodeBlock code={'npm install\nnpm run dev'} />
      <p>The dev server runs at <code>http://localhost:5173</code>. Before you open a pull request, run:</p>
      <CodeBlock code={'npm run lint\nnpm run build'} />
      <p><code>npm run build</code> type-checks the project, builds it, and prerenders every route to static HTML, so it catches most mistakes.</p>

      <H2>Where things live</H2>
      <ul>
        <li><code>src/docs/pages.tsx</code> — the documentation pages.</li>
        <li><code>src/pages</code> — Home, About, FAQ, Changelog and the other pages.</li>
        <li><code>src/lib/faq.ts</code> — FAQ questions and answers.</li>
        <li><code>src/lib/routes.ts</code> — every indexable route, with its title and description.</li>
        <li><code>public/sitemap.xml</code> — edited by hand when you add a page.</li>
        <li><code>worker</code> — the Cloudflare Worker behind the visitor map.</li>
      </ul>
      <Note>Adding a page? Register it in <code>src/App.tsx</code>, <code>src/lib/routes.ts</code> and <code>public/sitemap.xml</code>. Docs pages only need an entry in <code>src/docs/pages.tsx</code> and the sitemap.</Note>

      <H2>Sending a pull request</H2>
      <ul>
        <li>Fork the repository and create a branch from <code>main</code>.</li>
        <li>Keep the change focused. One concern per pull request.</li>
        <li>Make sure <code>npm run lint</code> and <code>npm run build</code> pass.</li>
        <li>Describe what changed and why. Add screenshots for visual changes.</li>
      </ul>
      <p>By contributing, you agree that your work is released under the project's <a href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a>.</p>
    </Article>
  )
}
