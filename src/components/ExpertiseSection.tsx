import { Body1, Subtitle1, makeStyles, tokens } from '@fluentui/react-components'
import Section from './Section'
import { expertiseAreas } from '../content/expertise'

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gap: '2.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
  },
  area: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  summary: {
    color: tokens.colorNeutralForeground2,
  },
  topics: {
    margin: 0,
    paddingLeft: '1.1rem',
    display: 'grid',
    gap: '0.375rem',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
  },
})

export default function ExpertiseSection() {
  const styles = useStyles()

  return (
    <Section
      id="expertise"
      eyebrow="Core expertise"
      title="What this lab is built to do well"
      lead="Four areas carry the work. Each one is treated as an engineering discipline with its own decisions, measurements and failure modes."
    >
      <div className={styles.grid}>
        {expertiseAreas.map((area) => (
          <article key={area.id} className={styles.area} aria-labelledby={`${area.id}-title`}>
            <Subtitle1 as="h3" id={`${area.id}-title`}>
              {area.title}
            </Subtitle1>
            <Body1 className={styles.summary}>{area.summary}</Body1>
            <ul className={styles.topics}>
              {area.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
