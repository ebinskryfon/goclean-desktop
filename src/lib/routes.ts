import { docs } from '../docs/pages'
import { MAINTENANCE } from './site'

export const DEFAULT_TITLE = 'gostrata — Start clean. Build faster. Ship better.'
export const DEFAULT_DESC = 'gostrata is an open-source Go CLI that scaffolds production-ready backend projects with Clean Architecture, Gin or Chi, GORM, PostgreSQL, MySQL, SQLite and more.'
export const ABOUT_DESC = 'About gostrata: an open-source Go CLI that scaffolds Clean Architecture backends with Gin or Chi, GORM and more.'
export const FAQ_DESC = 'Answers to common questions about gostrata: installation, Gin vs Chi, supported databases, module generation and deployment.'
export const PRIVACY_DESC = 'What the gostrata website collects: no cookies, no accounts, and a visitor map that stores only coarse location counts, never IP addresses.'
export const CONTRIBUTING_DESC = 'How to report bugs, suggest features and send pull requests to gostrata.'
export const CHANGELOG_DESC = 'Release history for gostrata, the open-source Go CLI for Clean Architecture backends.'

export type RouteMeta = { path: string; title: string; description: string }

/** Every indexable route. Used at build time by scripts/prerender.mjs. */
const fullRoutes: RouteMeta[] = [
  { path: '/', title: DEFAULT_TITLE, description: DEFAULT_DESC },
  { path: '/about', title: 'About — gostrata', description: ABOUT_DESC },
  { path: '/faq', title: 'FAQ — gostrata', description: FAQ_DESC },
  { path: '/contributing', title: 'Contributing — gostrata', description: CONTRIBUTING_DESC },
  { path: '/privacy', title: 'Privacy — gostrata', description: PRIVACY_DESC },
  { path: '/changelog', title: 'Changelog — gostrata', description: CHANGELOG_DESC },
  ...docs.map((d) => ({ path: `/docs/${d.slug}`, title: `${d.title} — gostrata`, description: d.summary })),
]

export const routes: RouteMeta[] = MAINTENANCE
  ? [{ path: '/', title: 'gostrata — Under maintenance', description: 'gostrata (formerly goclean) is under maintenance while the new release is in development. Stay tuned.' }]
  : fullRoutes
