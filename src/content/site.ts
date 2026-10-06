export interface NavItem {
  id: string
  label: string
}

export const site = {
  name: 'AiLab',
  role: 'AI Apps and Agents Developer',
  tagline: 'Building AI applications. Engineering trusted agents.',
  intro:
    'AiLab is a working engineering lab for generative AI applications and agents built on Microsoft Foundry. Every topic here is written to end in something you can inspect: an architecture decision, running code, a model or agent result, and the evaluation, trace, security and cost evidence behind it.',
  platform: 'Microsoft Foundry',
  focus: [
    'Model and deployment selection for generative AI workloads',
    'Retrieval-augmented generation with grounding and citations',
    'Agents with tools, memory, approval controls and tracing',
    'Multimodal understanding across vision, speech and documents',
    'Evaluation, observability, responsible AI, security and cost control',
  ],
  honesty:
    'This lab is published while it is being built. Items are labelled Planned, Building or Published, and no placeholder is ever presented as a live model result.',
} as const

export const navigation: readonly NavItem[] = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'modules', label: 'Modules & Labs' },
  { id: 'playground', label: 'Playground' },
  { id: 'playbook', label: 'Transformation' },
  { id: 'about', label: 'About' },
] as const
