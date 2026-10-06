import { Body1, Subtitle1, makeStyles, tokens } from '@fluentui/react-components'
import Section from './Section'
import { playbookIntro, playbookStages } from '../content/playbook'

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
  },
  stage: {
    display: 'grid',
    gap: '0.625rem',
    alignContent: 'start',
    paddingTop: '1.25rem',
    borderTop: `2px solid ${tokens.colorBrandStroke2}`,
  },
  phase: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    letterSpacing: '0.08em',
  },
  question: {
    color: tokens.colorNeutralForeground2,
    fontStyle: 'italic',
  },
  activities: {
    margin: 0,
    paddingLeft: '1.1rem',
    display: 'grid',
    gap: '0.375rem',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
  },
})

export default function PlaybookSection() {
  const styles = useStyles()

  return (
    <Section
      id="playbook"
      eyebrow="AI transformation playbook"
      title="From a first experiment to an organisational capability"
      lead={playbookIntro}
    >
      <div className={styles.grid}>
        {playbookStages.map((stage) => (
          <article key={stage.id} className={styles.stage} aria-labelledby={`${stage.id}-title`}>
            <span className={styles.phase}>{stage.phase}</span>
            <Subtitle1 as="h3" id={`${stage.id}-title`}>
              {stage.title}
            </Subtitle1>
            <Body1 className={styles.question}>{stage.question}</Body1>
            <ul className={styles.activities}>
              {stage.activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
