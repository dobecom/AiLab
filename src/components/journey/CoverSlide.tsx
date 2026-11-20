import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import { cover, evidenceCount, modules, stageCount } from '../../content/journey'
import { Icon } from './icons'
import { useDeck } from './deckContext'
import { vars } from './visuals/helpers'

export default function CoverSlide() {
  const { t } = useLang()
  const { goTo } = useDeck()

  return (
    <div className="cover">
      <div className="cover-art" aria-hidden="true">
        <img src="/img/art/hero.webp" alt="" width={1280} height={853} fetchPriority="high" />
      </div>
      <div className="cover-copy">
        <p className="eyebrow rise" style={vars({ '--i': 0 })}>
          <span className="eyebrow-dot" aria-hidden="true" />
          {t(cover.eyebrow)}
        </p>
        <h1 className="cover-role rise" style={vars({ '--i': 1 })}>
          {t(cover.role)}
        </h1>
        <p className="cover-headline rise" style={vars({ '--i': 2 })}>
          {t(cover.headline)}
        </p>
        <p className="cover-lede rise" style={vars({ '--i': 3 })}>
          {t(cover.lede)}
        </p>
        <div className="cover-actions rise" style={vars({ '--i': 4 })}>
          <button type="button" className="btn btn-primary" onClick={() => goTo('m1')}>
            {t(cover.begin)}
            <Icon name="rocket" />
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => goTo('overview')}>
            {t(cover.map)}
          </button>
        </div>
        <ul className="cover-verbs rise" style={vars({ '--i': 5 })}>
          {cover.verbs.map((verb, index) => (
            <li key={index}>
              <Icon name={verb.icon} />
              {t(verb.label)}
            </li>
          ))}
        </ul>
        <dl className="cover-stats rise" style={vars({ '--i': 6 })}>
          <div>
            <dt>{t(ui.modules)}</dt>
            <dd>{modules.length}</dd>
          </div>
          <div>
            <dt>{t(ui.stages)}</dt>
            <dd>{stageCount}</dd>
          </div>
          <div>
            <dt>{t(ui.captures)}</dt>
            <dd>{evidenceCount}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
