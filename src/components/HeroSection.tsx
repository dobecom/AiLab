import { Body1, Caption1, Title1, Title3, makeStyles, tokens } from '@fluentui/react-components'
import { site } from '../content/site'

const useStyles = makeStyles({
  hero: {
    paddingTop: '5rem',
    paddingBottom: '4.5rem',
  },
  inner: {
    width: '100%',
    maxWidth: '68rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  eyebrow: {
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: tokens.fontSizeBase200,
    display: 'block',
    marginBottom: '0.75rem',
  },
  role: {
    maxWidth: '26ch',
  },
  tagline: {
    marginTop: '1rem',
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  intro: {
    marginTop: '1.5rem',
    maxWidth: '46rem',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase500,
  },
  focus: {
    marginTop: '2rem',
    paddingLeft: '1.1rem',
    display: 'grid',
    gap: '0.5rem',
    maxWidth: '46rem',
    color: tokens.colorNeutralForeground2,
  },
  notice: {
    marginTop: '2.5rem',
    padding: '1rem 1.25rem',
    borderLeft: `3px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground2,
    maxWidth: '46rem',
    color: tokens.colorNeutralForeground2,
  },
})

export default function HeroSection() {
  const styles = useStyles()

  return (
    <section className={styles.hero} aria-labelledby="identity-heading">
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{site.name} — {site.platform} engineering lab</span>
        <Title1 as="h1" id="identity-heading" className={styles.role}>
          {site.role}
        </Title1>
        <Title3 as="p" className={styles.tagline}>
          {site.tagline}
        </Title3>
        <Body1 as="p" className={styles.intro}>
          {site.intro}
        </Body1>
        <ul className={styles.focus}>
          {site.focus.map((item) => (
            <li key={item}>
              <Body1>{item}</Body1>
            </li>
          ))}
        </ul>
        <p className={styles.notice}>
          <Caption1>{site.honesty}</Caption1>
        </p>
      </div>
    </section>
  )
}
