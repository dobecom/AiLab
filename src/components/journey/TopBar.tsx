import { useMemo } from 'react'
import { Globe20Regular, Sparkle20Filled } from '@fluentui/react-icons'
import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import { modules, slides } from '../../content/journey'

interface TopBarProps {
  activeId: string
  goTo: (id: string) => void
}

/** Maps a slide to the top-level tab that contains it. */
function groupOf(slideId: string): string | null {
  const slide = slides.find((item) => item.id === slideId)
  if (!slide || slide.kind === 'cover') return null
  if (slide.kind === 'stage') return modules[slide.moduleIndex ?? 0].id
  if (slide.kind === 'notes') return 'closing'
  return slide.id
}

export default function TopBar({ activeId, goTo }: TopBarProps) {
  const { lang, setLang, t } = useLang()
  const group = useMemo(() => groupOf(activeId), [activeId])
  const button = ui.langButton[lang]

  return (
    <header className="topbar">
      <button type="button" className="brand" onClick={() => goTo('cover')} aria-label={t(ui.homeLabel)}>
        <span className="brand-mark" aria-hidden="true">
          <Sparkle20Filled />
        </span>
        <span className="brand-text">
          <strong>AiLab</strong>
          <small>{t(ui.brandRole)}</small>
        </span>
      </button>

      <nav className="tabs" aria-label={t(ui.navLabel)}>
        <button
          type="button"
          className="top-tab"
          aria-current={group === 'overview' ? 'true' : undefined}
          onClick={() => goTo('overview')}
        >
          {t(ui.navOverview)}
        </button>
        {modules.map((module) => (
          <button
            type="button"
            key={module.id}
            className="top-tab"
            data-accent={module.accent}
            aria-current={group === module.id ? 'true' : undefined}
            onClick={() => goTo(module.id)}
          >
            <span className="top-tab-num">{String(module.number).padStart(2, '0')}</span>
            <span className="top-tab-label">{t(module.title)}</span>
          </button>
        ))}
        <button
          type="button"
          className="top-tab"
          aria-current={group === 'closing' ? 'true' : undefined}
          onClick={() => goTo('closing')}
        >
          {t(ui.navClosing)}
        </button>
      </nav>

      <button
        type="button"
        className="lang-toggle"
        onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
        aria-label={button.label}
        title={button.name}
      >
        <Globe20Regular aria-hidden="true" />
        <span aria-hidden="true">{button.short}</span>
      </button>
    </header>
  )
}
