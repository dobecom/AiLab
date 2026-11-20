import { useLang } from '../../i18n/lang'
import { closing, limitationNotes } from '../../content/journey'
import { Icon } from './icons'
import { useDeck } from './deckContext'
import { vars } from './visuals/helpers'

export default function NotesSlide() {
  const { t } = useLang()
  const { goTo } = useDeck()

  return (
    <div className="closing notes-slide">
      <header className="closing-head rise">
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          {t(closing.notesEyebrow)}
        </p>
        <h2 className="slide-title">{t(closing.notesTitle)}</h2>
      </header>

      <div className="closing-grid">
        <section className="panel rise" style={vars({ '--i': 1 })}>
          <h3 className="mini-title">{t(closing.expertiseTitle)}</h3>
          <ul className="expertise">
            {closing.expertise.map((area, index) => (
              <li key={index}>
                <span className="expertise-icon">
                  <Icon name={area.icon} />
                </span>
                <span>
                  <strong>{t(area.title)}</strong>
                  <span>{t(area.text)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel rise" style={vars({ '--i': 2 })}>
          <h3 className="mini-title">{t(closing.standardsTitle)}</h3>
          <ul className="standards">
            {closing.standards.map((standard, index) => (
              <li key={index}>
                <Icon name={standard.icon} />
                <span>{t(standard.text)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel panel-playground rise" style={vars({ '--i': 3 })}>
          <h3 className="mini-title">
            {t(closing.playground.title)}
            <span className="status-tag">{t(closing.playground.status)}</span>
          </h3>
          <p>{t(closing.playground.text)}</p>
          <ul className="chips chips-compact">
            {closing.playground.items.map((item, index) => (
              <li key={index}>
                <Icon name={item.icon} />
                {t(item.label)}
              </li>
            ))}
          </ul>
        </section>

        {limitationNotes.length > 0 && (
          <section className="panel rise" style={vars({ '--i': 4 })}>
            <h3 className="mini-title">{t(closing.limitationsTitle)}</h3>
            <p className="panel-lead">{t(closing.limitationsLead)}</p>
            <ul className="notes">
              {limitationNotes.map((note) => (
                <li key={note.stageId}>
                  <button type="button" onClick={() => goTo(note.stageId)}>
                    <Icon name="info" />
                    <span>
                      <strong>
                        M{note.moduleNumber} · {t(note.stageTitle)}
                      </strong>
                      {t(note.text)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <p className="growth rise" style={vars({ '--i': 5 })}>
        <Icon name="sparkle" />
        {t(closing.growth)}
      </p>
    </div>
  )
}
