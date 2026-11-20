import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import { modules, overview } from '../../content/journey'
import { Icon } from './icons'
import { useDeck } from './deckContext'
import { vars } from './visuals/helpers'

export default function OverviewSlide() {
  const { t } = useLang()
  const { goTo } = useDeck()

  return (
    <div className="overview">
      <div className="overview-copy rise">
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          {t(overview.eyebrow)}
        </p>
        <h2 className="slide-title">{t(overview.title)}</h2>
        <p className="slide-lede">{t(overview.lede)}</p>
        <ul className="legend">
          {overview.legend.map((item, index) => (
            <li key={index}>
              <Icon name={item.icon} />
              {t(item.label)}
            </li>
          ))}
        </ul>
        <p className="hint">{t(ui.jumpHint)}</p>
      </div>

      <div className="journey-map">
        {modules.map((module, row) => (
          <div
            className="map-row rise"
            key={module.id}
            data-accent={module.accent}
            style={vars({ '--i': row + 1 })}
          >
            <button type="button" className="map-module" onClick={() => goTo(module.id)}>
              <span className="map-module-icon">
                <Icon name={module.icon} />
              </span>
              <span className="map-module-text">
                <small>
                  {t(ui.moduleWord)} {String(module.number).padStart(2, '0')}
                </small>
                <strong>{t(module.title)}</strong>
              </span>
            </button>
            <ol className="map-stages">
              {module.stages.map((stage, index) => (
                <li key={stage.id}>
                  <button type="button" className="map-stage" onClick={() => goTo(stage.id)}>
                    <span className="map-stage-num" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="map-stage-icon">
                      <Icon name={stage.icon} />
                    </span>
                    <span className="map-stage-title">{t(stage.title)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
