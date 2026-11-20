import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { ChevronLeft24Regular, ChevronRight24Regular } from '@fluentui/react-icons'
import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import { modules, slides, type Slide } from '../../content/journey'
import { DeckContext, type DeckState } from './deckContext'
import TopBar from './TopBar'
import Rail from './Rail'
import CoverSlide from './CoverSlide'
import OverviewSlide from './OverviewSlide'
import ModuleSlide from './ModuleSlide'
import StageSlide from './StageSlide'
import ClosingSlide from './ClosingSlide'
import NotesSlide from './NotesSlide'
import { vars } from './visuals/helpers'

const LAST = slides.length - 1
const SWIPE_DISTANCE = 64

function indexFromHash(): number {
  const id = window.location.hash.replace(/^#/, '')
  const found = slides.findIndex((slide) => slide.id === id)
  return found >= 0 ? found : 0
}

function SlideContent({ slide, near }: { slide: Slide; near: boolean }) {
  switch (slide.kind) {
    case 'cover':
      return <CoverSlide />
    case 'overview':
      return <OverviewSlide />
    case 'module':
      return <ModuleSlide module={modules[slide.moduleIndex ?? 0]} near={near} />
    case 'stage': {
      const module = modules[slide.moduleIndex ?? 0]
      const stageIndex = slide.stageIndex ?? 0
      return <StageSlide module={module} stage={module.stages[stageIndex]} stageIndex={stageIndex} near={near} />
    }
    case 'closing':
      return <ClosingSlide />
    case 'notes':
      return <NotesSlide />
  }
}

export default function Journey() {
  const { t } = useLang()
  const [index, setIndex] = useState(indexFromHash)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const moved = useRef(false)

  const goToIndex = useCallback((next: number) => {
    setIndex(Math.min(LAST, Math.max(0, next)))
    moved.current = true
  }, [])

  const goTo = useCallback(
    (id: string) => {
      const found = slides.findIndex((slide) => slide.id === id)
      if (found >= 0) goToIndex(found)
    },
    [goToIndex],
  )

  useEffect(() => {
    const onHashChange = () => setIndex(indexFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#${slides[index].id}`)
    const element = slideRefs.current[index]
    if (element) {
      element.scrollTop = 0
      if (moved.current) element.focus({ preventScroll: true })
    }
  }, [index])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (document.querySelector('[role="dialog"]')) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [role="tablist"], .table-wrap, .code')) return

      if (event.key === 'ArrowRight') goToIndex(index + 1)
      else if (event.key === 'ArrowLeft') goToIndex(index - 1)
      else if (event.key === 'Home') goToIndex(0)
      else if (event.key === 'End') goToIndex(LAST)
      else return
      event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, goToIndex])

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') touchStart.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || event.pointerType !== 'touch') return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goToIndex(index + (dx < 0 ? 1 : -1))
    }
  }

  const current = slides[index]
  const deck = useMemo<DeckState>(() => ({ activeId: current.id, goTo }), [current.id, goTo])

  return (
    <DeckContext.Provider value={deck}>
      <div
        className="app"
        data-accent={current.accent}
        style={vars({ '--p': LAST === 0 ? 0 : index / LAST })}
      >
        <a className="skip-link" href="#journey">
          {t(ui.skip)}
        </a>
        <div className="backdrop" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
          <span className="grid-lines" />
        </div>

        <TopBar activeId={current.id} goTo={goTo} />

        <main className="deck" id="journey">
          <div
            className="deck-track"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              touchStart.current = null
            }}
          >
            {slides.map((slide, slideIndex) => {
              const active = slideIndex === index
              return (
                <section
                  key={slide.id}
                  id={`slide-${slide.id}`}
                  ref={(node) => {
                    slideRefs.current[slideIndex] = node
                  }}
                  className={`slide slide-${slide.kind}${active ? ' is-active' : ''}`}
                  data-accent={slide.accent}
                  aria-roledescription="slide"
                  aria-label={`${t(slide.title)} — ${t(ui.slideOf(slideIndex + 1, slides.length))}`}
                  aria-hidden={active ? undefined : true}
                  inert={!active}
                  tabIndex={-1}
                >
                  <div className="slide-inner">
                    <SlideContent slide={slide} near={Math.abs(slideIndex - index) <= 1} />
                  </div>
                </section>
              )
            })}
          </div>

          <button
            type="button"
            className="edge edge-prev"
            onClick={() => goToIndex(index - 1)}
            disabled={index === 0}
            aria-label={t(ui.prev)}
          >
            <ChevronLeft24Regular />
          </button>
          <button
            type="button"
            className="edge edge-next"
            onClick={() => goToIndex(index + 1)}
            disabled={index === LAST}
            aria-label={t(ui.next)}
          >
            <ChevronRight24Regular />
          </button>
        </main>

        <Rail index={index} goToIndex={goToIndex} />
        <div className="sr-only" aria-live="polite" role="status">
          {t(current.title)} — {t(ui.slideOf(index + 1, slides.length))}
        </div>
      </div>
    </DeckContext.Provider>
  )
}
