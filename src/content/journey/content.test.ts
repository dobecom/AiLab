import { describe, expect, it } from 'vitest'
import { closing, cover, evidenceCount, modules, overview, slides, stageCount } from '.'
import { ICON_NAMES } from './iconNames'
import imageSizes from './imageSizes.json'
import type { L } from './types'

interface Entry {
  path: string
  text: L
}

const isL = (value: unknown): value is L =>
  typeof value === 'object' &&
  value !== null &&
  Object.keys(value).sort().join() === 'en,ko' &&
  typeof (value as L).en === 'string' &&
  typeof (value as L).ko === 'string'

function collect(value: unknown, path: string, out: Entry[]): Entry[] {
  if (isL(value)) {
    out.push({ path, text: value })
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => collect(item, `${path}[${index}]`, out))
  } else if (typeof value === 'object' && value !== null) {
    for (const [key, item] of Object.entries(value)) collect(item, `${path}.${key}`, out)
  }
  return out
}

const entries = [
  ...collect(modules, 'modules', []),
  ...collect(cover, 'cover', []),
  ...collect(overview, 'overview', []),
  ...collect(closing, 'closing', []),
]

const foundryImages = new Set(Object.keys(import.meta.glob('/public/img/foundry/*.png')))
const thumbImages = new Set(Object.keys(import.meta.glob('/public/img/foundry/thumb/*.webp')))
const artImages = new Set(Object.keys(import.meta.glob('/public/img/art/*.webp')))

describe('journey structure', () => {
  it('has four modules with four stages each', () => {
    expect(modules).toHaveLength(4)
    for (const module of modules) expect(module.stages).toHaveLength(4)
    expect(stageCount).toBe(16)
  })

  it('uses unique slide and stage ids in the expected order', () => {
    const ids = slides.map((slide) => slide.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids[0]).toBe('cover')
    expect(ids[1]).toBe('overview')
    expect(ids.slice(-2)).toEqual(['closing', 'notes'])
    expect(slides).toHaveLength(2 + modules.length * 5 + 2)
    for (const module of modules) {
      module.stages.forEach((stage, index) => expect(stage.id).toBe(`${module.id}-s${index + 1}`))
    }
  })

  it('gives every stage a recommended design and recorded evidence', () => {
    for (const module of modules) {
      for (const stage of module.stages) {
        expect(stage.visuals.length, stage.id).toBeGreaterThan(0)
        expect(stage.keyPoints.length, stage.id).toBeGreaterThanOrEqual(3)
        expect(stage.keyPoints.filter((point) => point.key).length, stage.id).toBeLessThanOrEqual(1)
        expect(stage.decision, stage.id).toBeDefined()
      }
    }
    expect(evidenceCount).toBeGreaterThanOrEqual(40)
  })

  it('uses only registered icon names', () => {
    const names = new Set<string>(ICON_NAMES)
    const used = JSON.stringify([modules, closing]).match(/"icon":"([^"]+)"/g) ?? []
    for (const match of used) {
      const name = match.slice(8, -1)
      expect(names.has(name), name).toBe(true)
    }
  })
})

describe('bilingual content', () => {
  it('has English and Korean text for every public string', () => {
    expect(entries.length).toBeGreaterThan(500)
    for (const { path, text } of entries) {
      expect(text.en.trim(), `${path} (en)`).not.toBe('')
      expect(text.ko.trim(), `${path} (ko)`).not.toBe('')
    }
  })

  it('does not publish private planning context or exam framing', () => {
    const forbidden = [
      /\b(?:580|520)\b/,
      /countdown/i,
      /ai-103/i,
      /passing score|pass score|exam score|attempt score/i,
      /\bexams?\b/i,
      /certification/i,
      /failed the/i,
    ]
    for (const { path, text } of entries) {
      for (const pattern of forbidden) {
        expect(text.en, `${path} (en) ${pattern}`).not.toMatch(pattern)
        expect(text.ko, `${path} (ko) ${pattern}`).not.toMatch(pattern)
      }
    }
  })

  it('avoids uncertain or questioning wording', () => {
    for (const { path, text } of entries) {
      expect(text.en, `${path} (en)`).not.toContain('?')
      expect(text.ko, `${path} (ko)`).not.toContain('?')
    }
  })

  it('contains no secrets, tenant identifiers or real resource endpoints', () => {
    const serialized = JSON.stringify([modules, cover, overview, closing])
    expect(serialized).not.toMatch(/\b(?=[A-Za-z0-9]*\d)(?=[A-Za-z0-9]*[A-Za-z])[A-Za-z0-9]{32,}\b/)
    expect(serialized).not.toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    )
    expect(serialized).not.toMatch(
      /https:\/\/[a-z0-9-]+\.(?:services\.ai|cognitiveservices|openai)\.azure\.com/i,
    )
  })
})

describe('static assets', () => {
  it('ships a masked image and a thumbnail for every referenced capture', () => {
    const sizes = imageSizes as unknown as Record<string, [number, number]>
    let checked = 0
    for (const module of modules) {
      for (const stage of module.stages) {
        for (const item of stage.evidence ?? []) {
          expect(foundryImages.has(`/public/img/foundry/img${item.img}.png`), `img${item.img}`).toBe(true)
          expect(thumbImages.has(`/public/img/foundry/thumb/img${item.img}.webp`), `thumb ${item.img}`).toBe(true)
          expect(sizes[String(item.img)], `size ${item.img}`).toBeDefined()
          checked += 1
        }
      }
    }
    expect(checked).toBe(evidenceCount)
  })

  it('ships the cover and module artwork', () => {
    for (const name of ['hero', 'm1', 'm2', 'm3', 'm4']) {
      expect(artImages.has(`/public/img/art/${name}.webp`), name).toBe(true)
    }
  })
})
