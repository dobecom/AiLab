import { Body1, Subtitle1, makeStyles, tokens } from '@fluentui/react-components'
import Section from './Section'
import { aboutBlocks } from '../content/about'

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gap: '2.25rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
  },
  block: {
    display: 'grid',
    gap: '0.75rem',
    alignContent: 'start',
  },
  body: {
    color: tokens.colorNeutralForeground2,
  },
  points: {
    margin: 0,
    paddingLeft: '1.1rem',
    display: 'grid',
    gap: '0.375rem',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
  },
})

export default function AboutSection() {
  const styles = useStyles()

  return (
    <Section
      id="about"
      eyebrow="About the lab"
      title="A portfolio that grows by being used"
      lead="AiLab is written while the work happens, so the gaps are visible as well as the results."
    >
      <div className={styles.grid}>
        {aboutBlocks.map((block) => (
          <article key={block.id} className={styles.block} aria-labelledby={`${block.id}-title`}>
            <Subtitle1 as="h3" id={`${block.id}-title`}>
              {block.title}
            </Subtitle1>
            <Body1 className={styles.body}>{block.body}</Body1>
            {block.points ? (
              <ul className={styles.points}>
                {block.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}
