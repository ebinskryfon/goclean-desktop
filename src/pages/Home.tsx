import { usePageTitle } from '../lib/hooks'
import { Hero } from './home/Hero'
import { Download } from './home/Download'
import { Features } from './home/Features'
import { HowItWorks } from './home/HowItWorks'
import { Commands } from './home/Commands'
import { ProjectStructure } from './home/ProjectStructure'
import { Ecosystem } from './home/Ecosystem'
import { GithubCta } from './home/GithubCta'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <Download />
      <Features />
      <HowItWorks />
      <Commands />
      <ProjectStructure />
      <Ecosystem />
      <GithubCta />
    </>
  )
}
