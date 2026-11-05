import { Link } from '../components/SiteLink'
import { Article } from '../components/Article'
import { H2 } from '../docs/Prose'
import { usePageTitle } from '../lib/hooks'
import { REPO } from '../lib/site'
import { CONTRIBUTING_DESC } from '../lib/routes'

export default function Contributing() {
  usePageTitle('Contributing', CONTRIBUTING_DESC)
  return (
    <Article eyebrow="Open source" title="Contributing" summary="How to report a bug, suggest an idea, or send a pull request.">
      <p>goclean is MIT licensed and developed in the open. Bug reports, fixes, documentation improvements and ideas are all welcome.</p>

      <H2>Where to start</H2>
      <p>Everything happens in the <a href={REPO} target="_blank" rel="noreferrer">goclean repository</a> on GitHub. Open issues and pull requests there, whether they concern the CLI or its documentation.</p>

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

      <H2>Sending a pull request</H2>
      <ul>
        <li>Fork the repository and create a branch from <code>main</code>.</li>
        <li>Keep the change focused. One concern per pull request.</li>
        <li>Make sure the existing tests still pass.</li>
        <li>Describe what changed and why. Add screenshots for visual changes.</li>
      </ul>
      <p>By contributing, you agree that your work is released under the project's <a href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a>.</p>
    </Article>
  )
}
