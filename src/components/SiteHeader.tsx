import { Link, makeStyles, tokens } from '@fluentui/react-components'
import { navigation, site } from '../content/site'

const useStyles = makeStyles({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  inner: {
    width: '100%',
    maxWidth: '68rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    textDecoration: 'none',
  },
  brandRole: {
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
  },
  navLink: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  skipLink: {
    position: 'absolute',
    left: '-9999px',
    top: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    ':focus': {
      left: '1rem',
      zIndex: 20,
    },
  },
})

export default function SiteHeader() {
  const styles = useStyles()

  return (
    <header className={styles.header}>
      <Link href="#main" className={styles.skipLink}>
        Skip to main content
      </Link>
      <div className={styles.inner}>
        <a href="#main" className={styles.brand}>
          {site.name}
          <span className={styles.brandRole}>{site.role}</span>
        </a>
        <nav aria-label="Sections" className={styles.nav}>
          {navigation.map((item) => (
            <Link key={item.id} href={`#${item.id}`} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
