import { ChevronLeft24Regular, ChevronRight24Regular } from '@fluentui/react-icons'
import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import { slides } from '../../content/journey'
import { vars } from './visuals/helpers'

interface RailProps {
  index: number
  goToIndex: (index: number) => void
}

export default function Rail({ index, goToIndex }: RailProps) {
  const { t } = useLang()
  const total = slides.length
  const current = slides[index]

  return (
    <footer className="rail">
      <button
        type="button"
        className="rail-btn"
        onClick={() => goToIndex(index - 1)}
        disabled={index === 0}
        aria-label={t(ui.prev)}
      >
        <ChevronLeft24Regular />
      </button>

      <div className="rail-main">
        <p className="rail-label" aria-hidden="true">
          <span className="rail-count">
            {String(index + 1).padStart(2, '0')}
            <small>/{total}</small>
          </span>
          <span className="rail-title">{t(current.title)}</span>
        </p>
        <div className="rail-track" style={vars({ '--idx': index, '--total': total })}>
          <span className="rail-line" aria-hidden="true" />
          <span className="rail-fill" aria-hidden="true" />
          <span className="rail-beacon" aria-hidden="true" />
          <ol className="rail-nodes">
            {slides.map((slide, slideIndex) => (
              <li key={slide.id}>
                <button
                  type="button"
                  className={`rail-node rail-${slide.kind}${slideIndex <= index ? ' is-passed' : ''}${
                    slideIndex === index ? ' is-current' : ''
                  }`}
                  data-accent={slide.accent}
                  title={t(slide.title)}
                  aria-label={`${t(slide.title)} (${slideIndex + 1}/${total})`}
                  aria-current={slideIndex === index ? 'step' : undefined}
                  onClick={() => goToIndex(slideIndex)}
                >
                  <i />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <button
        type="button"
        className="rail-btn"
        onClick={() => goToIndex(index + 1)}
        disabled={index === total - 1}
        aria-label={t(ui.next)}
      >
        <ChevronRight24Regular />
      </button>
    </footer>
  )
}
