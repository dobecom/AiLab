import { describe, expect, it } from 'vitest'
import { expertiseAreas } from './expertise'
import { learningModules } from './modules'
import { playgroundExperiences, playgroundNotice } from './playground'
import { playbookStages } from './playbook'
import { aboutBlocks } from './about'
import { navigation, site } from './site'
import { DELIVERY_STATUSES, highestStatus, type DeliveryStatus } from './types'

/**
 * Content these pages must never expose publicly: private exam attempt scores,
 * a pass-score dashboard, or a countdown that reframes the lab as an exam site.
 */
const FORBIDDEN_PUBLIC_TERMS = [
  'countdown',
  'passing score',
  'pass score',
  'failed the exam',
  'exam score',
  'attempt score',
  '580',
  '520',
  '700',
]

const allText = [
  site.role,
  site.tagline,
  site.intro,
  site.honesty,
  ...site.focus,
  ...navigation.map((item) => item.label),
  ...expertiseAreas.flatMap((area) => [area.title, area.summary, ...area.topics]),
  ...learningModules.flatMap((module) => [
    module.title,
    module.summary,
    ...module.decisions,
    module.theory.detail,
    module.build.detail,
    module.evidence.detail,
  ]),
  playgroundNotice,
  ...playgroundExperiences.flatMap((item) => [item.title, item.description, ...item.signals]),
  ...playbookStages.flatMap((stage) => [stage.title, stage.question, ...stage.activities]),
  ...aboutBlocks.flatMap((block) => [block.title, block.body, ...(block.points ?? [])]),
].join('\n')

const collectStatuses = (): DeliveryStatus[] => [
  ...learningModules.flatMap((module) => [
    module.theory.status,
    module.build.status,
    module.evidence.status,
  ]),
  ...playgroundExperiences.map((item) => item.status),
]

const expectUniqueIds = (ids: readonly string[]) => {
  expect(new Set(ids).size).toBe(ids.length)
}

describe('public content safety', () => {
  it.each(FORBIDDEN_PUBLIC_TERMS)('does not expose "%s"', (term) => {
    expect(allText.toLowerCase()).not.toContain(term.toLowerCase())
  })

  it('does not frame the lab as an exam preparation site', () => {
    expect(allText.toLowerCase()).not.toContain('ai-103')
  })

  it('states that the playground sends no credential to the browser', () => {
    expect(playgroundNotice).toMatch(/\/api\/v1\/ailab\//)
    expect(playgroundNotice.toLowerCase()).toContain('managed identity')
    expect(playgroundNotice.toLowerCase()).toContain('ever sent to the browser')
  })

  it('tells visitors that unfinished items are labelled', () => {
    expect(site.honesty.toLowerCase()).toContain('planned')
    expect(site.honesty.toLowerCase()).toContain('building')
  })
})

describe('delivery status integrity', () => {
  it('uses only known statuses', () => {
    for (const status of collectStatuses()) {
      expect(DELIVERY_STATUSES).toContain(status)
    }
  })

  it('never publishes evidence for a build that is not published', () => {
    for (const module of learningModules) {
      if (module.evidence.status === 'published') {
        expect(module.build.status).toBe('published')
      }
      if (module.build.status === 'published') {
        expect(module.theory.status).toBe('published')
      }
    }
  })

  it('keeps the playground honest until a live result exists', () => {
    for (const experience of playgroundExperiences) {
      expect(experience.status).not.toBe('published')
    }
  })

  it('rolls a module up to its most advanced stage', () => {
    expect(
      highestStatus([
        { status: 'planned', detail: 'a' },
        { status: 'building', detail: 'b' },
      ]),
    ).toBe('building')
    expect(
      highestStatus([
        { status: 'planned', detail: 'a' },
        { status: 'published', detail: 'b' },
      ]),
    ).toBe('published')
    expect(highestStatus([{ status: 'planned', detail: 'a' }])).toBe('planned')
  })
})

describe('information architecture', () => {
  it('declares the required public sections in order', () => {
    expect(navigation.map((item) => item.id)).toEqual([
      'expertise',
      'modules',
      'playground',
      'playbook',
      'about',
    ])
  })

  it('covers the four core expertise areas', () => {
    expect(expertiseAreas.map((area) => area.id)).toEqual([
      'generative-ai-applications',
      'ai-agents',
      'multimodal-ai',
      'responsible-ai-operations',
    ])
  })

  it('covers the four transformation stages', () => {
    expect(playbookStages.map((stage) => stage.id)).toEqual([
      'discover',
      'prove',
      'operationalize',
      'scale',
    ])
  })

  it('gives every module all three stages and at least one decision point', () => {
    expect(learningModules.length).toBeGreaterThanOrEqual(8)
    for (const module of learningModules) {
      expect(module.decisions.length).toBeGreaterThan(0)
      expect(module.theory.detail).not.toHaveLength(0)
      expect(module.build.detail).not.toHaveLength(0)
      expect(module.evidence.detail).not.toHaveLength(0)
    }
  })

  it('uses unique identifiers', () => {
    expectUniqueIds(expertiseAreas.map((area) => area.id))
    expectUniqueIds(learningModules.map((module) => module.id))
    expectUniqueIds(playgroundExperiences.map((item) => item.id))
    expectUniqueIds(playbookStages.map((stage) => stage.id))
    expectUniqueIds(aboutBlocks.map((block) => block.id))
  })
})
