import { Section } from '../../components/Section'
import { WorldMap } from '../../components/WorldMap'

export function MapSection() {
  return (
    <Section id="worldwide" eyebrow="Worldwide" title="Developers using goclean around the world.">
      <WorldMap />
    </Section>
  )
}
