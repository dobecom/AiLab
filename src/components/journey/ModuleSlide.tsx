import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import type { Module } from '../../content/journey/types'
import { Icon } from './icons'
import { useDeck } from './deckContext'
import { vars } from './visuals/helpers'

export default function ModuleSlide({ module, near }: { module: Module; near: boolean }) {
  const { t } = useLang()
  const { goTo } = useDeck()
  const number = String(module.number).padStart(2, '0')

  return (
    <div className="module">
      <div className="module-hero">
        <div className="module-art rise" style={vars({ '--i': 0 })}>
          {near && (
            <img src={`/img/art/m${module.number}.webp`} alt="" width={1280} height={853} decoding="async" />
          )}
          <span className="module-num" aria-hidden="true">
            {number}
          </span>
        </div>

        <div className="module-copy">
          <p className="eyebrow rise" style={vars({ '--i': 1 })}>
            <span className="eyebrow-dot" aria-hidden="true" />
            {t(ui.moduleWord)} {number}
          </p>
          <h2 className="slide-title rise" style={vars({ '--i': 2 })}>
            {t(module.title)}
          </h2>
          <p className="module-subtitle rise" style={vars({ '--i': 3 })}>
            {t(module.subtitle)}
          </p>
          <p className="slide-lede rise" style={vars({ '--i': 4 })}>
            {t(module.pitch)}
          </p>
          <h3 className="mini-title rise" style={vars({ '--i': 5 })}>
            {t(ui.outcomes)}
          </h3>
          <ul className="outcomes rise" style={vars({ '--i': 5 })}>
            {module.outcomes.map((outcome, index) => (
              <li key={index}>
                <Icon name="check" />
                <span>{t(outcome)}</span>
              </li>
            ))}
          </ul>
          <ul className="chips rise" style={vars({ '--i': 6 })} aria-label={t(ui.capabilities)}>
            {module.capabilities.map((capability, index) => (
              <li key={index}>
                <Icon name={capability.icon} />
                {t(capability.label)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="module-path">
        <h3 className="mini-title">{t(ui.deliveryPath)}</h3>
        <ol className="path">
          {module.stages.map((stage, index) => (
            <li className="path-item rise" key={stage.id} style={vars({ '--i': index + 5 })}>
              <button type="button" className="path-card" onClick={() => goTo(stage.id)}>
                <span className="path-top">
                  <span className="path-num">{index + 1}</span>
                  <span className="path-icon">
                    <Icon name={stage.icon} />
                  </span>
                </span>
                <strong>{t(stage.title)}</strong>
                <span className="path-tag">{t(stage.tagline)}</span>
                <span className="path-open">
                  {t(ui.openStage)} <Icon name="open" />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
