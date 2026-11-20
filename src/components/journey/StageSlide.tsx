import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import type { Evidence, Module, Stage, Visual } from '../../content/journey/types'
import type { IconName } from '../../content/journey/iconNames'
import { Icon } from './icons'
import { useDeck } from './deckContext'
import Lightbox from './Lightbox'
import VisualRenderer from './visuals/VisualRenderer'
import { vars } from './visuals/helpers'

const KIND_ICON: Record<Visual['kind'], IconName> = {
  flow: 'flow',
  hub: 'apps',
  layers: 'layers',
  cycle: 'repeat',
  matrix: 'target',
  compare: 'scales',
  spectrum: 'gauge',
  bars: 'chart',
  steps: 'list',
  stats: 'calculator',
  code: 'code',
  tiles: 'cube',
}

function VisualTabs({ stageId, visuals }: { stageId: string; visuals: Visual[] }) {
  const { t } = useLang()
  const [selected, setSelected] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  if (visuals.length === 0) return null
  if (visuals.length === 1) return <VisualRenderer visual={visuals[0]} />

  const select = (next: number) => {
    const index = (next + visuals.length) % visuals.length
    setSelected(index)
    refs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') select(selected + 1)
    else if (event.key === 'ArrowLeft') select(selected - 1)
    else if (event.key === 'Home') select(0)
    else if (event.key === 'End') select(visuals.length - 1)
    else return
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className="visual-tabs" data-stage={stageId}>
      <div className="tablist" role="tablist" aria-label={t(ui.visualTabs)}>
        {visuals.map((visual, index) => (
          <button
            key={index}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`${baseId}-panel`}
            tabIndex={selected === index ? 0 : -1}
            className="tab"
            onClick={() => setSelected(index)}
            onKeyDown={onKeyDown}
          >
            <Icon name={KIND_ICON[visual.kind]} />
            <span>{t(visual.title)}</span>
          </button>
        ))}
      </div>
      <div
        className="tabpanel"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${selected}`}
        key={selected}
      >
        <VisualRenderer visual={visuals[selected]} />
      </div>
    </div>
  )
}

function EvidenceStrip({ items, near }: { items: Evidence[]; near: boolean }) {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="evidence rise" aria-label={t(ui.evidence)}>
      <div className="evidence-head">
        <Icon name="camera" />
        <h3>{t(ui.evidence)}</h3>
        <span className="evidence-hint">{t(ui.evidenceHint)}</span>
      </div>
      <ul className="evidence-list">
        {items.map((item, index) => (
          <li key={item.img}>
            <button
              type="button"
              className="evidence-item"
              onClick={() => setOpen(index)}
              aria-label={`${t(ui.openEvidence)}: ${t(item.caption)}`}
            >
              <span className="evidence-thumb">
                {near && (
                  <img
                    src={`/img/foundry/thumb/img${item.img}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </span>
              <span className="evidence-cap">{t(item.caption)}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onChange={setOpen} />
    </section>
  )
}

interface StageSlideProps {
  module: Module
  stage: Stage
  stageIndex: number
  near: boolean
}

export default function StageSlide({ module, stage, stageIndex, near }: StageSlideProps) {
  const { t } = useLang()
  const { goTo } = useDeck()

  return (
    <div className="stage">
      <header className="stage-head rise" style={vars({ '--i': 0 })}>
        <div className="stage-eyebrow">
          <span className="chip-module">
            {t(ui.moduleWord)} {String(module.number).padStart(2, '0')}
          </span>
          <span>{t(module.title)}</span>
          <span className="stage-dots" role="group" aria-label={t(ui.stageOf(stageIndex + 1))}>
            {module.stages.map((sibling, index) => (
              <button
                key={sibling.id}
                type="button"
                className={`stage-dot${index === stageIndex ? ' is-current' : ''}`}
                aria-label={`${t(ui.stageWord)} ${index + 1}: ${t(sibling.title)}`}
                aria-current={index === stageIndex ? 'step' : undefined}
                onClick={() => goTo(sibling.id)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
        <h2 className="stage-title">
          <span className="stage-icon">
            <Icon name={stage.icon} />
          </span>
          <span>
            <span className="stage-number">{t(ui.stageWord)} {stageIndex + 1}</span>
            {t(stage.title)}
          </span>
        </h2>
        <p className="stage-tagline">{t(stage.tagline)}</p>
        <div className="deliverable">
          <span className="deliverable-label">
            <Icon name="check" />
            {t(ui.deliverable)}
          </span>
          <p>{t(stage.deliverable)}</p>
        </div>
      </header>

      <div className="stage-grid">
        <div className="stage-left">
          <h3 className="sr-only">{t(ui.keyPoints)}</h3>
          <ul className="keypoints">
            {stage.keyPoints.map((point, index) => (
              <li
                key={index}
                className={`keypoint rise${point.key ? ' is-key' : ''}`}
                style={vars({ '--i': index + 2 })}
              >
                <span className="keypoint-icon">
                  <Icon name={point.icon} />
                </span>
                <span className="keypoint-body">
                  <strong>{t(point.title)}</strong>
                  <span>{t(point.text)}</span>
                </span>
              </li>
            ))}
          </ul>

          {stage.decision && (
            <aside className="decision rise" style={vars({ '--i': stage.keyPoints.length + 2 })}>
              <span className="decision-label">
                <Icon name="target" />
                {t(ui.decision)}
              </span>
              <strong>{t(stage.decision.title)}</strong>
              <p>{t(stage.decision.text)}</p>
            </aside>
          )}
        </div>

        <div className="stage-right">
          <div className="rise" style={vars({ '--i': 2 })}>
            <VisualTabs stageId={stage.id} visuals={stage.visuals} />
          </div>
          {stage.evidence && stage.evidence.length > 0 && (
            <EvidenceStrip items={stage.evidence} near={near} />
          )}
          {stage.limitation && (
            <p className="limitation rise">
              <Icon name="info" />
              <span>
                <strong>{t(ui.limitation)}</strong> {t(stage.limitation)}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
