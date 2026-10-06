import type { ReactNode } from 'react'
import { Body1, Title2, makeStyles, tokens } from '@fluentui/react-components'

const useStyles = makeStyles({
  section: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  inner: {
    width: '100%',
    maxWidth: '68rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '46rem',
    marginBottom: '2.5rem',
  },
  eyebrow: {
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: tokens.fontSizeBase200,
  },
  lead: {
    color: tokens.colorNeutralForeground2,
  },
})

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead?: string
  children: ReactNode
}

export default function Section({ id, eyebrow, title, lead, children }: SectionProps) {
  const styles = useStyles()
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <Title2 as="h2" id={headingId}>
            {title}
          </Title2>
          {lead ? <Body1 className={styles.lead}>{lead}</Body1> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
