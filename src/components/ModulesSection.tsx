import { Body1, Caption1, Subtitle1, makeStyles, tokens } from '@fluentui/react-components'
import Section from './Section'
import StatusTag from './StatusTag'
import { learningModules } from '../content/modules'
import { highestStatus, type ModuleStage } from '../content/types'

const useStyles = makeStyles({
  list: {
    display: 'grid',
    gap: '2rem',
  },
  module: {
    display: 'grid',
    gap: '1rem',
    paddingTop: '1.75rem',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  moduleHead: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  summary: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '52rem',
  },
  decisions: {
    margin: 0,
    paddingLeft: '1.1rem',
    display: 'grid',
    gap: '0.25rem',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
  },
  stages: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
    marginTop: '0.5rem',
  },
  stage: {
    display: 'grid',
    gap: '0.5rem',
    alignContent: 'start',
    padding: '1rem',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  stageName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  stageDetail: {
    color: tokens.colorNeutralForeground2,
  },
  tagRow: {
    display: 'flex',
    gap: '0.5rem',
  },
})

const STAGE_NAMES = ['Theory', 'Foundry build', 'Evidence'] as const

export default function ModulesSection() {
  const styles = useStyles()

  return (
    <Section
      id="modules"
      eyebrow="Modules and labs"
      title="Theory, then a Foundry build, then evidence"
      lead="A topic is only finished here when the concept is written down, implemented in a Microsoft Foundry project, and published together with the result and the proof behind it."
    >
      <div className={styles.list}>
        {learningModules.map((module) => {
          const stages: readonly ModuleStage[] = [module.theory, module.build, module.evidence]

          return (
            <article
              key={module.id}
              className={styles.module}
              aria-labelledby={`${module.id}-title`}
            >
              <div className={styles.moduleHead}>
                <Subtitle1 as="h3" id={`${module.id}-title`}>
                  {module.title}
                </Subtitle1>
                <div className={styles.tagRow}>
                  <StatusTag status={highestStatus(stages)} />
                </div>
              </div>
              <Body1 className={styles.summary}>{module.summary}</Body1>
              <ul className={styles.decisions}>
                {module.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
              <div className={styles.stages}>
                {stages.map((stage, index) => (
                  <div key={STAGE_NAMES[index]} className={styles.stage}>
                    <span className={styles.stageName}>{STAGE_NAMES[index]}</span>
                    <Caption1 className={styles.stageDetail}>{stage.detail}</Caption1>
                    <div>
                      <StatusTag status={stage.status} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
