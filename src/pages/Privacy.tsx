import { Link } from '../components/SiteLink'
import { Article } from '../components/Article'
import { H2, Note } from '../docs/Prose'
import { usePageTitle } from '../lib/hooks'
import { REPO } from '../lib/site'
import { PRIVACY_DESC } from '../lib/routes'

export default function Privacy() {
  usePageTitle('Privacy', PRIVACY_DESC)
  return (
    <Article eyebrow="Legal" title="Privacy" summary="What this site collects, what it does not, and why.">
      <p>This is the website for goclean. It has no accounts, no forms, no advertising and no third-party analytics. This page describes the small amount of data involved in running it.</p>

      <H2>The visitor map</H2>
      <p>The home page shows a map of where goclean is being downloaded. When you click a download button or copy an install command, your browser sends a short message to a small Cloudflare Worker saying which of those two things happened.</p>
      <ul>
        <li>Your IP address is <strong>never stored</strong>.</li>
        <li>Cloudflare gives the Worker an approximate location for the request. The Worker rounds it to the centre of a 3° cell, roughly 300 km across, and discards the exact position.</li>
        <li>Only the cell and a running count are saved. Nothing links a count to you, your browser or your device.</li>
        <li>Each kind of event is reported at most once per browser session.</li>
      </ul>
      <p>The Worker's code is open source and lives in the <code>worker</code> directory of the <a href={REPO} target="_blank" rel="noreferrer">goclean repository</a>.</p>

      <H2>What stays in your browser</H2>
      <ul>
        <li><strong>Theme preference.</strong> Your light or dark choice is saved in local storage so the site remembers it. It never leaves your device.</li>
        <li><strong>Session flags.</strong> Session storage notes that a download or copy event was already reported, so it is not sent twice. It is cleared when you close the tab.</li>
      </ul>
      <p>The site sets no cookies.</p>

      <H2>Third parties</H2>
      <ul>
        <li><strong>Google Fonts.</strong> Pages load the Inter and JetBrains Mono fonts from Google, so Google receives your IP address and browser details as part of that request.</li>
        <li><strong>GitHub.</strong> The site is hosted on GitHub Pages, and download buttons and install scripts point to GitHub. GitHub may keep standard server logs under its own privacy policy.</li>
        <li><strong>Cloudflare.</strong> The map Worker runs on Cloudflare, which processes the request as it would for any site it serves.</li>
      </ul>

      <H2>The goclean CLI</H2>
      <p>This page covers only the website. For what the command-line tool does, read its source in the <a href={REPO} target="_blank" rel="noreferrer">main repository</a>.</p>

      <H2>Questions or changes</H2>
      <p>If something here is unclear or out of date, open an issue on <a href={`${REPO}/issues`} target="_blank" rel="noreferrer">GitHub</a>. If the practices above change, this page will be updated to match.</p>
      <Note>Want to see exactly what the site does? It is open source. Read the <Link to="/contributing">contributing guide</Link> to run it yourself.</Note>
    </Article>
  )
}
