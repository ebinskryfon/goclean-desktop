export type FaqItem = { q: string; a: string; link?: { to: string; label: string } }
export type FaqGroup = { title: string; items: FaqItem[] }

export const faq: FaqGroup[] = [
  {
    title: 'The basics',
    items: [
      {
        q: 'What is goclean?',
        a: 'goclean is an open-source command-line tool that scaffolds structured Go backend projects using Clean Architecture. One command gives you the layers, wiring, configuration, Docker files and tooling already in place.',
        link: { to: '/docs/introduction', label: 'Read the introduction' },
      },
      {
        q: 'Is goclean free?',
        a: 'Yes. goclean is MIT licensed, free to use in personal and commercial projects, and developed in the open on GitHub.',
      },
      {
        q: 'Why use Clean Architecture in Go?',
        a: 'Clean Architecture keeps business rules independent of frameworks and databases. Dependencies point inward toward the domain, so you can test usecases in isolation and swap an HTTP framework or database without rewriting core logic.',
        link: { to: '/docs/architecture', label: 'See the four layers' },
      },
      {
        q: 'How is goclean different from copying a template repository?',
        a: 'A template needs manual renaming and cleanup, and it cannot grow with your app. goclean asks for your stack, generates a project with your module path, and then keeps generating new modules (entity, DTOs, repository, usecase, handler, migration and routes) that match the same structure.',
      },
    ],
  },
  {
    title: 'Installing and using it',
    items: [
      {
        q: 'How do I install goclean?',
        a: 'On Linux and macOS run the install script, on Windows run the PowerShell script, or use go install. You can also download a release archive manually. Every release publishes a checksums.txt file.',
        link: { to: '/docs/installation', label: 'Installation guide' },
      },
      {
        q: 'Do I need Go installed to use goclean?',
        a: 'Not to install the binary. You do need Go 1.23 or newer to build and run the projects it generates. Run goclean doctor to check that Go, git and Docker are present and recent enough.',
      },
      {
        q: 'Which operating systems are supported?',
        a: 'Linux, macOS and Windows, on both amd64 and arm64.',
      },
      {
        q: 'How do I create my first project?',
        a: 'Run goclean new my-app, then goclean make:module Product name:string price:float to generate your first feature module. Start the server with Air for hot reload.',
        link: { to: '/docs/quick-start', label: 'Quick Start' },
      },
      {
        q: 'Can I preview what goclean will generate?',
        a: 'Yes. Add --dry-run to any command to list the files it would create without writing anything. Use --force only when you want to overwrite existing files.',
        link: { to: '/docs/available-commands', label: 'Command reference' },
      },
    ],
  },
  {
    title: 'Stack and features',
    items: [
      {
        q: 'Should I choose Gin or Chi?',
        a: 'Both are supported through the --router flag, and Gin is the default. Gin is popular and batteries-included; Chi is lightweight and close to the standard library. Because handlers live in the delivery layer, the choice does not leak into your business logic.',
      },
      {
        q: 'Which databases and ORMs are supported?',
        a: 'PostgreSQL, MySQL and SQLite, all through GORM. Database access is isolated in the infrastructure layer, and usecases only see repository interfaces.',
        link: { to: '/docs/database-setup', label: 'Database setup' },
      },
      {
        q: 'What else is included in a generated project?',
        a: 'Viper configuration, Zerolog structured logging, graceful shutdown, a working User feature with a health endpoint, middleware, migrations, a Docker Compose file for PostgreSQL and MySQL, Air hot reload and a Makefile.',
        link: { to: '/docs/project-structure', label: 'Project structure' },
      },
      {
        q: 'What does make:module generate?',
        a: 'For each module it generates the domain entity and repository interface, the usecase, DTOs, handler and route registration, the GORM repository, and a migration. Use --no-register if you do not want goclean to patch container.go and routes.go.',
        link: { to: '/docs/module-generation', label: 'Module generation' },
      },
      {
        q: 'Can I generate only one piece, like a handler or a migration?',
        a: 'Yes. The single-piece generators are make:entity, make:types, make:repo, make:usecase, make:handler and make:migration.',
      },
    ],
  },
  {
    title: 'Deploying and getting help',
    items: [
      {
        q: 'Can I deploy a goclean project to production?',
        a: 'Yes. The generated server shuts down gracefully, so it fits container platforms and orchestrators. goclean does not generate a Dockerfile, so add your own. Provide secrets through your platform and run migrations before starting a new version.',
        link: { to: '/docs/deployment', label: 'Deployment checklist' },
      },
      {
        q: 'I get "goclean: command not found". What do I do?',
        a: 'The Go bin directory is probably not on your PATH. Add $(go env GOPATH)/bin to it, or restart your terminal after using the Windows installer.',
        link: { to: '/docs/troubleshooting', label: 'Troubleshooting' },
      },
      {
        q: 'How do I upgrade goclean?',
        a: 'Run the install command again. It always fetches the newest release. See the changelog for what changed.',
        link: { to: '/changelog', label: 'Changelog' },
      },
      {
        q: 'How can I report a bug or contribute?',
        a: 'Open an issue or pull request on GitHub. Bug reports, ideas and improvements are welcome.',
      },
    ],
  },
]

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.flatMap((g) =>
    g.items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  ),
}
