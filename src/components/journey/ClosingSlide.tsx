import { useLang } from '../../i18n/lang'
import { closing } from '../../content/journey'
import { Icon } from './icons'
import { vars } from './visuals/helpers'

export default function ClosingSlide() {
  const { t } = useLang()

  return (
    <div className="closing">
      <header className="closing-head rise">
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          {t(closing.eyebrow)}
        </p>
        <h2 className="slide-title">{t(closing.title)}</h2>
        <p className="slide-lede">{t(closing.lede)}</p>
      </header>

      <section className="playbook" aria-label={t(closing.playbookTitle)}>
        <h3 className="mini-title rise">{t(closing.playbookTitle)}</h3>
        <ol className="playbook-track">
          {closing.playbook.map((stage, index) => (
            <li className="playbook-stage rise" key={stage.id} style={vars({ '--i': index + 1 })}>
              <span className="playbook-top">
                <span className="playbook-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="playbook-icon">
                  <Icon name={stage.icon} />
                </span>
              </span>
              <strong>{t(stage.title)}</strong>
              <em>{t(stage.goal)}</em>
              <ul>
                {stage.activities.map((activity, activityIndex) => (
                  <li key={activityIndex}>{t(activity)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="playbook-ramp rise" style={vars({ '--i': 5 })} aria-hidden="true">
          <span>{t(closing.rampFrom)}</span>
          <i />
          <span>{t(closing.rampTo)}</span>
        </div>
      </section>
    </div>
  )
}
