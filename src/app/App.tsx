import { makeStyles } from '@fluentui/react-components'
import SiteHeader from '../components/SiteHeader'
import HeroSection from '../components/HeroSection'
import ExpertiseSection from '../components/ExpertiseSection'
import ModulesSection from '../components/ModulesSection'
import PlaygroundSection from '../components/PlaygroundSection'
import PlaybookSection from '../components/PlaybookSection'
import AboutSection from '../components/AboutSection'
import SiteFooter from '../components/SiteFooter'

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
  },
})

export default function App() {
  const styles = useStyles()

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main id="main" className={styles.main}>
        <HeroSection />
        <ExpertiseSection />
        <ModulesSection />
        <PlaygroundSection />
        <PlaybookSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  )
}
