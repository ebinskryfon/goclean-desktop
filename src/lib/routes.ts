import { docs } from '../docs/pages'

export const DEFAULT_TITLE = 'goclean — Start clean. Build faster. Ship better.'
export const DEFAULT_DESC = 'goclean is an open-source Go CLI that scaffolds production-ready backend projects with Clean Architecture, Gin or Chi, GORM, PostgreSQL, MySQL, SQLite, Docker and more.'
export const ABOUT_DESC = 'About goclean: an open-source Go CLI that scaffolds Clean Architecture backends with Gin or Chi, GORM, Docker and more.'
export const CHANGELOG_DESC = 'Release history for goclean, the open-source Go CLI for Clean Architecture backends.'

export type RouteMeta = { path: string; title: string; description: string }

/** Every indexable route. Used at build time by scripts/prerender.mjs. */
export const routes: RouteMeta[] = [
  { path: '/', title: DEFAULT_TITLE, description: DEFAULT_DESC },
  { path: '/about', title: 'About — goclean', description: ABOUT_DESC },
  { path: '/changelog', title: 'Changelog — goclean', description: CHANGELOG_DESC },
  ...docs.map((d) => ({ path: `/docs/${d.slug}`, title: `${d.title} — goclean`, description: d.summary })),
]
