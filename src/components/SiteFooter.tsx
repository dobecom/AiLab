import { Caption1, makeStyles, tokens } from '@fluentui/react-components'
import { site } from '../content/site'

const useStyles = makeStyles({
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: '2rem',
    paddingBottom: '3rem',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  inner: {
    width: '100%',
    maxWidth: '68rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '0.75rem',
    color: tokens.colorNeutralForeground3,
  },
})

export default function SiteFooter() {
  const styles = useStyles()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Caption1>
          {site.name} — {site.role}. Built on {site.platform}.
        </Caption1>
        <Caption1>dobecom</Caption1>
      </div>
    </footer>
  )
}
