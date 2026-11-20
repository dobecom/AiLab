import { l, type Accent, type L, type Module } from './types'
import { module1 } from './module1'
import { module2 } from './module2'
import { module3 } from './module3'
import { module4 } from './module4'

export const modules: readonly Module[] = [module1, module2, module3, module4]

export type SlideKind = 'cover' | 'overview' | 'module' | 'stage' | 'closing' | 'notes'

export interface Slide {
  /** Used as the URL hash: cover, overview, m1, m1-s1 ... closing, notes. */
  id: string
  kind: SlideKind
  title: L
  accent: Accent
  moduleIndex?: number
  stageIndex?: number
}

function buildSlides(): Slide[] {
  const slides: Slide[] = [
    { id: 'cover', kind: 'cover', title: l('Start', '시작'), accent: 'blue' },
    { id: 'overview', kind: 'overview', title: l('Overview', '개요'), accent: 'blue' },
  ]
  modules.forEach((module, moduleIndex) => {
    slides.push({
      id: module.id,
      kind: 'module',
      title: module.title,
      accent: module.accent,
      moduleIndex,
    })
    module.stages.forEach((stage, stageIndex) => {
      slides.push({
        id: stage.id,
        kind: 'stage',
        title: stage.title,
        accent: module.accent,
        moduleIndex,
        stageIndex,
      })
    })
  })
  slides.push({ id: 'closing', kind: 'closing', title: l('Playbook', 'Playbook'), accent: 'blue' })
  slides.push({ id: 'notes', kind: 'notes', title: l('Standards and notes', '기준과 참고 사항'), accent: 'blue' })
  return slides
}

export const slides: readonly Slide[] = buildSlides()

export const stageCount = modules.reduce((total, module) => total + module.stages.length, 0)

export const evidenceCount = modules.reduce(
  (total, module) =>
    total + module.stages.reduce((sum, stage) => sum + (stage.evidence?.length ?? 0), 0),
  0,
)

export interface LimitationNote {
  stageId: string
  moduleNumber: number
  stageTitle: L
  text: L
}

export const limitationNotes: readonly LimitationNote[] = modules.flatMap((module) =>
  module.stages.flatMap((stage) =>
    stage.limitation
      ? [{ stageId: stage.id, moduleNumber: module.number, stageTitle: stage.title, text: stage.limitation }]
      : [],
  ),
)

export { cover, overview, closing } from './site'
export type { Module, Stage, Visual } from './types'
