/**
 * Delivery status for every public item in AiLab.
 *
 * Nothing may be presented as a working model or agent result until a real,
 * reproducible artifact is connected. Until then an item stays `planned` or
 * `building` so visitors are never shown mock output as live output.
 */
export type DeliveryStatus = 'planned' | 'building' | 'published'

export const DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  'planned',
  'building',
  'published',
] as const

export const STATUS_LABEL: Record<DeliveryStatus, string> = {
  planned: 'Planned',
  building: 'Building',
  published: 'Published',
}

export const STATUS_DESCRIPTION: Record<DeliveryStatus, string> = {
  planned: 'Scoped, not started yet.',
  building: 'In progress; no verified result published yet.',
  published: 'Implemented, verified and inspectable.',
}

export interface ExpertiseArea {
  id: string
  title: string
  summary: string
  topics: readonly string[]
}

export interface ModuleStage {
  status: DeliveryStatus
  detail: string
}

export interface LearningModule {
  id: string
  title: string
  summary: string
  decisions: readonly string[]
  theory: ModuleStage
  build: ModuleStage
  evidence: ModuleStage
}

export interface PlaygroundExperience {
  id: string
  title: string
  description: string
  signals: readonly string[]
  status: DeliveryStatus
}

export interface PlaybookStage {
  id: string
  phase: string
  title: string
  question: string
  activities: readonly string[]
}

export const highestStatus = (stages: readonly ModuleStage[]): DeliveryStatus => {
  if (stages.some((stage) => stage.status === 'published')) return 'published'
  if (stages.some((stage) => stage.status === 'building')) return 'building'
  return 'planned'
}
