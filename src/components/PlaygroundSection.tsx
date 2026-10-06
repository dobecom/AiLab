import { Body1, Caption1, Subtitle1, makeStyles, tokens } from '@fluentui/react-components'
import Section from './Section'
import StatusTag from './StatusTag'
import { playgroundExperiences, playgroundNotice } from '../content/playground'

const useStyles = makeStyles({
  notice: {
    padding: '1rem 1.25rem',
    marginBottom: '2.5rem',
    borderLeft: `3px solid ${tokens.colorPaletteYellowBorder1}`,
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground2,
    maxWidth: '52rem',
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
  },
  item: {
    display: 'grid',
    gap: '0.625rem',
    alignContent: 'start',
    padding: '1.25rem',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  description: {
    color: tokens.colorNeutralForeground2,
  },
  signals: {
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.375rem 0.75rem',
    listStyle: 'none',
    padding: 0,
    color: tokens.colorNeutralForeground3,
  },
  head: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
  },
})

export default function PlaygroundSection() {
  const styles = useStyles()

  return (
    <Section
      id="playground"
      eyebrow="Embedded playground"
      title="Run the models and agents yourself"
      lead="The point of this section is that you do not have to take a claim on trust. Each experience below is designed to show the real response and the signals around it."
    >
      <p className={styles.notice}>
        <Caption1>{playgroundNotice}</Caption1>
      </p>
      <div className={styles.grid}>
        {playgroundExperiences.map((experience) => (
          <article
            key={experience.id}
            className={styles.item}
            aria-labelledby={`${experience.id}-title`}
          >
            <div className={styles.head}>
              <Subtitle1 as="h3" id={`${experience.id}-title`}>
                {experience.title}
              </Subtitle1>
              <StatusTag status={experience.status} />
            </div>
            <Body1 className={styles.description}>{experience.description}</Body1>
            <ul className={styles.signals} aria-label={`Signals shown by ${experience.title}`}>
              {experience.signals.map((signal) => (
                <li key={signal}>
                  <Caption1>{signal}</Caption1>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
