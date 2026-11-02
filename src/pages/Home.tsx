import { usePageTitle } from '../lib/hooks'
import { Hero } from './home/Hero'
import { TechMarquee } from '../components/TechMarquee'
import { Download } from './home/Download'
import { Features } from './home/Features'
import { HowItWorks } from './home/HowItWorks'
import { Commands } from './home/Commands'
import { ProjectStructure } from './home/ProjectStructure'
import { Ecosystem } from './home/Ecosystem'
import { MapSection } from './home/MapSection'
import { GithubCta } from './home/GithubCta'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <TechMarquee />
      <Download />
      <Features />
      <HowItWorks />
      <Commands />
      <ProjectStructure />
      <Ecosystem />
      <MapSection />
      <GithubCta />
    </>
  )
}
