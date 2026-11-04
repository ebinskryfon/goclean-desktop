import type { ReactNode } from 'react'
import { Link } from '../components/SiteLink'
import { CodeBlock } from '../components/CodeBlock'
import { H2, Note } from './Prose'
import { INSTALL_CMD, INSTALL_PS, INSTALL_SH, PKG, REPO } from '../lib/site'

export type DocPage = { slug: string; title: string; summary: string; keywords: string; body: ReactNode }

const TREE = `my-saas/
├── cmd/
│   └── api/
├── internal/
│   ├── domain/
│   ├── usecase/
│   ├── delivery/
│   └── infrastructure/
├── migrations/
├── config/
├── pkg/
├── Dockerfile
├── docker-compose.yml
├── Makefile
└── go.mod`

export const docs: DocPage[] = [
  {
    slug: 'introduction', title: 'Introduction',
    summary: 'What goclean is and why it exists.',
    keywords: 'overview about clean architecture boilerplate scaffold generator',
    body: (
      <>
        <p><strong>goclean</strong> is a command-line tool that automates the creation of structured, maintainable Go backend applications using Clean Architecture.</p>
        <p>Instead of copying a template and renaming packages by hand, you run one command and get a project with the layers, wiring and tooling already in place.</p>
        <H2>What you get</H2>
        <ul>
          <li>A Clean Architecture layout: Domain, Usecase, Delivery and Infrastructure.</li>
          <li>Your choice of HTTP framework: Gin or Chi.</li>
          <li>PostgreSQL, MySQL or SQLite through GORM.</li>
          <li>Viper configuration, Zerolog logging and graceful shutdown.</li>
          <li>Docker Compose, Air hot reload and a Makefile.</li>
          <li>A module generator for entities, DTOs, repositories, usecases, handlers, migrations and routes.</li>
        </ul>
        <H2>Next steps</H2>
        <p>Start with <Link to="/docs/installation">Installation</Link>, then follow the <Link to="/docs/quick-start">Quick Start</Link> to generate your first project.</p>
      </>
    ),
  },
  {
    slug: 'installation', title: 'Installation',
    summary: 'Install the goclean binary on Linux, macOS or Windows.',
    keywords: 'install download binary curl powershell windows mac linux go install gobin path upgrade update release',
    body: (
      <>
        <p>goclean ships as a single binary for Linux, macOS and Windows (amd64 and arm64). You do not need Go to install it, but generated projects target Go 1.23 or newer.</p>
        <H2>Linux and macOS</H2>
        <CodeBlock code={INSTALL_SH} />
        <p>The script downloads the latest release, verifies its checksum and installs <code>goclean</code> to <code>/usr/local/bin</code> or <code>~/.local/bin</code>.</p>
        <H2>Windows</H2>
        <CodeBlock code={INSTALL_PS} lang="text" title="powershell" />
        <p>This installs <code>goclean.exe</code> to <code>%LOCALAPPDATA%\goclean\bin</code> and adds it to your user <code>PATH</code>. Restart your terminal afterwards.</p>
        <H2>With Go</H2>
        <CodeBlock code={INSTALL_CMD} />
        <p>This places the binary in <code>$GOPATH/bin</code>.</p>
        <H2>Manual download</H2>
        <p>Download the archive for your platform from the <a href={`${REPO}/releases/latest`} target="_blank" rel="noreferrer">latest release</a>, extract it and put <code>goclean</code> on your <code>PATH</code>. A <code>checksums.txt</code> file is published with every release.</p>
        <H2>Verify the install</H2>
        <CodeBlock code={'goclean version\ngoclean doctor'} />
        <p><code>goclean doctor</code> checks that Go, git and Docker are installed and recent enough.</p>
        <Note>If your shell reports <code>command not found</code>, see <Link to="/docs/troubleshooting">Troubleshooting</Link>.</Note>
        <H2>Upgrading</H2>
        <p>Run the install command again. It always fetches the newest release.</p>
      </>
    ),
  },
  {
    slug: 'quick-start', title: 'Quick Start',
    summary: 'Create a project and your first module in minutes.',
    keywords: 'getting started tutorial first project new make:module run',
    body: (
      <>
        <H2>1. Create a project</H2>
        <CodeBlock code={'goclean new my-saas\ncd my-saas'} />
        <p>goclean sets up the directory structure, <code>go.mod</code>, configuration, Docker files and a Makefile for you.</p>
        <H2>2. Generate a module</H2>
        <CodeBlock code="goclean make:module Product name:string price:float stock:int" />
        <p>This creates the entity, DTOs, repository, usecase, handler and migration for <code>Product</code>, and registers its routes.</p>
        <H2>3. Run it</H2>
        <p>Start the server in development with hot reload using Air from the project root:</p>
        <CodeBlock code="air" />
        <Note>Want to see what would be created first? Add <code>--dry-run</code> to any command to preview the generated files. See <Link to="/docs/available-commands">Available Commands</Link>.</Note>
      </>
    ),
  },
  {
    slug: 'project-structure', title: 'Project Structure',
    summary: 'What goclean generates and where things live.',
    keywords: 'folders directories layout cmd internal pkg migrations config tree',
    body: (
      <>
        <p>A newly generated project looks like this:</p>
        <CodeBlock code={TREE} lang="text" title="my-saas" />
        <H2>Directories</H2>
        <ul>
          <li><code>cmd/api</code> — the API entry point. Loads config, wires dependencies, starts the server.</li>
          <li><code>internal/domain</code> — entities and repository interfaces.</li>
          <li><code>internal/usecase</code> — application business rules.</li>
          <li><code>internal/delivery</code> — HTTP handlers, DTOs and routes.</li>
          <li><code>internal/infrastructure</code> — database, GORM repositories, logging.</li>
          <li><code>migrations</code> — database migrations.</li>
          <li><code>config</code> — Viper configuration.</li>
          <li><code>pkg</code> — small reusable packages.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'architecture', title: 'Architecture',
    summary: 'The four layers and the dependency rule.',
    keywords: 'clean architecture domain usecase delivery infrastructure dependency injection layers',
    body: (
      <>
        <p>goclean follows Clean Architecture. The one rule that matters: <strong>source code dependencies point inward</strong>, toward the domain.</p>
        <CodeBlock code="Delivery → Usecase → Domain ← Infrastructure" lang="text" title="dependency direction" />
        <H2>Domain</H2>
        <p>Entities and the repository interfaces they need. It imports nothing from the other layers, no frameworks and no database drivers.</p>
        <H2>Usecase</H2>
        <p>Application-specific business rules. A usecase receives repository interfaces and orchestrates domain entities.</p>
        <H2>Delivery</H2>
        <p>The HTTP layer, built for Gin or Chi. Handlers translate requests into usecase calls and usecase results into responses.</p>
        <H2>Infrastructure</H2>
        <p>Concrete implementations: database connections, GORM repositories, logging. It implements the interfaces declared by the domain.</p>
        <H2>Dependency injection</H2>
        <p>Dependencies are constructed in <code>cmd/api</code> and passed inward through constructors, so each layer stays easy to test in isolation.</p>
      </>
    ),
  },
  {
    slug: 'configuration', title: 'Configuration',
    summary: 'Viper-based configuration for your application.',
    keywords: 'viper config yaml env environment variables settings port logging zerolog',
    body: (
      <>
        <p>Generated projects use <strong>Viper</strong> for configuration. Configuration code lives in the <code>config</code> directory and is loaded once at startup in <code>cmd/api</code>.</p>
        <p>Logging is handled by <strong>Zerolog</strong>, and the server shuts down gracefully, finishing in-flight requests before it exits.</p>
        <Note>The exact keys depend on the framework and database you choose when creating a project. Open the generated files in <code>config</code> for the authoritative list.</Note>
      </>
    ),
  },
  {
    slug: 'database-setup', title: 'Database Setup',
    summary: 'PostgreSQL, MySQL or SQLite through GORM.',
    keywords: 'database postgres postgresql mysql sqlite gorm orm migrations connection',
    body: (
      <>
        <p>goclean supports three databases, all accessed through <strong>GORM</strong>:</p>
        <ul>
          <li>PostgreSQL</li>
          <li>MySQL</li>
          <li>SQLite</li>
        </ul>
        <p>Database access is isolated in <code>internal/infrastructure</code>. Usecases only ever see repository interfaces, so switching or mocking a database does not touch business logic.</p>
        <H2>Migrations</H2>
        <p>Migrations live in the <code>migrations</code> directory. <code>make:module</code> generates a migration for every new module.</p>
        <H2>Running a database locally</H2>
        <p>For PostgreSQL and MySQL, the generated Docker Compose file defines the database service. See <Link to="/docs/docker-setup">Docker Setup</Link>. SQLite needs no separate service.</p>
      </>
    ),
  },
  {
    slug: 'module-generation', title: 'Module Generation',
    summary: 'Generate a full feature module from one command.',
    keywords: 'make:module entity dto repository usecase handler migration routes fields types generator',
    body: (
      <>
        <p>A module is one feature slice of your app. One command scaffolds all of it:</p>
        <CodeBlock code="goclean make:module Product name:string price:float stock:int" />
        <H2>What gets generated</H2>
        <ul>
          <li><strong>Domain</strong> — the entity and repository interface.</li>
          <li><strong>Usecase</strong> — business logic for the module.</li>
          <li><strong>Delivery</strong> — DTOs, handler and route registration.</li>
          <li><strong>Infrastructure</strong> — the GORM repository implementation.</li>
          <li><strong>Migrations</strong> — a migration for the module's table.</li>
        </ul>
        <H2>Field syntax</H2>
        <p>Each field is written as <code>name:type</code>. The example above defines <code>name</code> as a string, <code>price</code> as a float and <code>stock</code> as an int.</p>
      </>
    ),
  },
  {
    slug: 'available-commands', title: 'Available Commands',
    summary: 'Reference for every goclean command and flag.',
    keywords: 'cli reference new make:module make:entity make:handler make:repo make:usecase make:types make:migration doctor version dry-run force router database orm flags help',
    body: (
      <>
        <H2>goclean new</H2>
        <p>Creates a new project. Run it without options for the interactive stack wizard, or pass flags.</p>
        <CodeBlock code="goclean new [project-name] [flags]" title="syntax" />
        <CodeBlock code={'goclean new my-saas --router chi --database postgres\ngoclean new my-app --database sqlite --module github.com/me/my-app'} title="examples" />
        <ul>
          <li><code>--router</code> — <code>gin</code> (default) or <code>chi</code>.</li>
          <li><code>--database</code> — <code>postgres</code> (default), <code>mysql</code> or <code>sqlite</code>.</li>
          <li><code>--orm</code> — <code>gorm</code> (default).</li>
          <li><code>-m, --module</code> — Go module path, e.g. <code>github.com/username/project</code>.</li>
          <li><code>-d, --db</code> — PostgreSQL database name (default <code>&lt;project&gt;_db</code>).</li>
          <li><code>--no-git</code> — skip <code>git init</code>.</li>
          <li><code>--no-tidy</code> — skip <code>go mod tidy</code>.</li>
        </ul>
        <H2>goclean make:module</H2>
        <p>Generates a whole module: entity, repository, usecase, handler and migration. Also available as <code>make:resource</code>.</p>
        <CodeBlock code="goclean make:module <Name> [field:type ...] [flags]" title="syntax" />
        <CodeBlock code="goclean make:module Product name:string price:float stock:int active:bool" title="example" />
        <p>Field types: <code>string</code>, <code>text</code>, <code>int</code>, <code>int64</code>, <code>float</code>, <code>bool</code>, <code>time</code>, <code>uuid</code>. The type defaults to <code>string</code>. Use <code>--no-register</code> to skip patching <code>container.go</code> and <code>routes.go</code>.</p>
        <H2>Single-piece generators</H2>
        <ul>
          <li><code>make:entity</code> — a domain entity.</li>
          <li><code>make:types</code> — request, input and response DTO types.</li>
          <li><code>make:repo</code> — repository interface and GORM implementation.</li>
          <li><code>make:usecase</code> — usecase interface and implementation.</li>
          <li><code>make:handler</code> — an HTTP Gin handler.</li>
          <li><code>make:migration</code> — up and down migration files.</li>
        </ul>
        <H2>Other commands</H2>
        <ul>
          <li><code>doctor</code> — check that Go, git and Docker are installed and recent enough.</li>
          <li><code>version</code> — print the goclean version.</li>
          <li><code>completion</code> — generate a shell autocompletion script.</li>
        </ul>
        <H2>Global flags</H2>
        <ul>
          <li><code>--dry-run</code> — show what would be generated without writing anything.</li>
          <li><code>--force</code> — overwrite existing files.</li>
        </ul>
        <CodeBlock code="goclean make:module Product name:string price:float --dry-run" title="preview first" />
      </>
    ),
  },
  {
    slug: 'docker-setup', title: 'Docker Setup',
    summary: 'Run the app and its database with Docker Compose.',
    keywords: 'docker compose dockerfile container image up build',
    body: (
      <>
        <p>Every generated project includes a <code>Dockerfile</code> and a <code>docker-compose.yml</code>.</p>
        <CodeBlock code="docker compose up --build" />
        <p>Compose builds the API image and starts it together with its database service.</p>
        <H2>Hot reload</H2>
        <p>For fast local iteration without containers, use <strong>Air</strong>, which rebuilds and restarts the server when files change.</p>
      </>
    ),
  },
  {
    slug: 'deployment', title: 'Deployment',
    summary: 'Ship the generated app to production.',
    keywords: 'deploy production docker build image registry environment graceful shutdown',
    body: (
      <>
        <p>The generated server supports graceful shutdown, so it plays well with orchestrators that send termination signals during rollouts.</p>
        <H2>Build an image</H2>
        <CodeBlock code="docker build -t my-saas:latest ." />
        <H2>Checklist</H2>
        <ul>
          <li>Provide production configuration and secrets through your platform, not committed files.</li>
          <li>Point the app at a managed PostgreSQL or MySQL instance.</li>
          <li>Run migrations before starting the new version.</li>
          <li>Collect Zerolog's structured output in your log pipeline.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'troubleshooting', title: 'Troubleshooting',
    summary: 'Fixes for common problems.',
    keywords: 'error command not found path port in use database connection refused help issue bug',
    body: (
      <>
        <H2>goclean: command not found</H2>
        <p>The Go bin directory is not on your <code>PATH</code>. Add it to your shell profile:</p>
        <CodeBlock code={'export PATH="$PATH:$(go env GOPATH)/bin"'} />
        <H2>Port already in use</H2>
        <p>Another process is bound to the server port. Stop it, or change the port in your configuration.</p>
        <H2>Database connection refused</H2>
        <p>Make sure the database service is running (for example with <code>docker compose up</code>) and that the host, port and credentials in your configuration match it.</p>
        <H2>Still stuck?</H2>
        <p>Open an issue on <a href={`${REPO}/issues`} target="_blank" rel="noreferrer">GitHub</a>, or browse the <a href={PKG} target="_blank" rel="noreferrer">package reference</a>.</p>
      </>
    ),
  },
]
