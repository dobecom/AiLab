import type { IconName } from './iconNames'

/** Single-sourced bilingual text. Every public string carries both languages. */
export interface L {
  en: string
  ko: string
}

export const l = (en: string, ko: string): L => ({ en, ko })

export type Accent = 'blue' | 'violet' | 'teal' | 'amber'

export interface Node {
  label: L
  sub?: L
  icon?: IconName
  /** Highlights the single most important element of a visual. */
  key?: boolean
}

export interface FlowVisual {
  kind: 'flow'
  title: L
  nodes: Node[]
  /** Vertical flow reads better for 5+ nodes. */
  direction?: 'row' | 'col'
  /** Draws a return arrow from the last node to the first (agent loops, retries). */
  loop?: L
  caption?: L
}

export interface HubVisual {
  kind: 'hub'
  title: L
  center: Node
  nodes: Node[]
  caption?: L
}

export interface LayersVisual {
  kind: 'layers'
  title: L
  /** Top layer first. */
  layers: Node[]
  caption?: L
}

export interface CycleVisual {
  kind: 'cycle'
  title: L
  nodes: Node[]
  center?: L
  caption?: L
}

export interface MatrixVisual {
  kind: 'matrix'
  title: L
  xAxis: L
  yAxis: L
  /** Exactly four cells: top-left, top-right, bottom-left, bottom-right. */
  cells: Node[]
  caption?: L
}

export interface CompareVisual {
  kind: 'compare'
  title: L
  columns: { label: L; sub?: L; key?: boolean }[]
  rows: { label: L; cells: L[] }[]
  caption?: L
}

export interface SpectrumVisual {
  kind: 'spectrum'
  title: L
  /** Axis end labels, e.g. "Low effort" / "High effort". */
  from: L
  to: L
  items: Node[]
  caption?: L
}

export interface BarsVisual {
  kind: 'bars'
  title: L
  /** Only values that appear in the notes. value is a 0-100 percentage of the bar. */
  items: { label: L; value: number; display?: string; key?: boolean }[]
  marker?: { value: number; label: L }
  caption?: L
}

export interface StepsVisual {
  kind: 'steps'
  title: L
  steps: { label: L; text?: L; icon?: IconName }[]
  caption?: L
}

export interface StatsVisual {
  kind: 'stats'
  title: L
  /** Only recorded values from real runs or documented limits. */
  items: { value: string; label: L; sub?: L; key?: boolean }[]
  caption?: L
}

export interface CodeVisual {
  kind: 'code'
  title: L
  lang: 'python' | 'json' | 'yaml' | 'text'
  /** Placeholders only: <resource-name>, <project-name>, <API-KEY>, <tenant-id>. */
  code: string
  caption?: L
  /** Zero-based line indexes to emphasise. */
  highlight?: number[]
}

export interface TilesVisual {
  kind: 'tiles'
  title: L
  items: { icon: IconName; label: L; sub?: L; tag?: L; key?: boolean }[]
  columns?: 2 | 3 | 4
  caption?: L
}

export type Visual =
  | FlowVisual
  | HubVisual
  | LayersVisual
  | CycleVisual
  | MatrixVisual
  | CompareVisual
  | SpectrumVisual
  | BarsVisual
  | StepsVisual
  | StatsVisual
  | CodeVisual
  | TilesVisual

export interface KeyPoint {
  icon: IconName
  title: L
  text: L
  /** At most one highlighted point per stage. */
  key?: boolean
}

export interface Evidence {
  /** Screenshot number: /img/foundry/img{n}.png with thumb/img{n}.webp. */
  img: number
  caption: L
}

export interface Stage {
  /** `${moduleId}-s${1..4}` */
  id: string
  title: L
  tagline: L
  /** Proposal-style one-liner describing what the client receives from this stage. */
  deliverable: L
  icon: IconName
  keyPoints: KeyPoint[]
  visuals: Visual[]
  /** The recommended design decision for this stage. */
  decision?: { title: L; text: L }
  evidence?: Evidence[]
  /** A light environment note. Never blocked-procedure content. */
  limitation?: L
}

export interface Module {
  /** 'm1'..'m4' */
  id: string
  number: 1 | 2 | 3 | 4
  accent: Accent
  icon: IconName
  title: L
  subtitle: L
  pitch: L
  /** Three to four outcomes written as capabilities delivered. */
  outcomes: L[]
  /** Short capability chips shown on the module overview. */
  capabilities: { icon: IconName; label: L }[]
  stages: [Stage, Stage, Stage, Stage]
}
