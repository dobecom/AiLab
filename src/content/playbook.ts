import type { PlaybookStage } from './types'

export const playbookIntro =
  'The same path is used for every lab here, and it is the path an organisation can reuse when it moves from an AI experiment to an AI capability.'

export const playbookStages: readonly PlaybookStage[] = [
  {
    id: 'discover',
    phase: '01',
    title: 'Discover',
    question: 'Is AI genuinely the right answer to this problem?',
    activities: [
      'Identify the business problem worth solving',
      'Define who the users actually are',
      'Confirm which data exists and may be used',
      'Agree on success metrics before building',
      'Validate that AI beats the simpler alternative',
    ],
  },
  {
    id: 'prove',
    phase: '02',
    title: 'Prove',
    question: 'Does it work well enough, safely enough, at an acceptable cost?',
    activities: [
      'Build the smallest honest prototype',
      'Measure output quality against the metrics',
      'Run safety and groundedness checks',
      'Record latency and cost per interaction',
      'Compare the result with the existing process',
    ],
  },
  {
    id: 'operationalize',
    phase: '03',
    title: 'Operationalize',
    question: 'Can it be run, observed and repaired by a team?',
    activities: [
      'Make evaluation repeatable and automated',
      'Add tracing, monitoring and alerting',
      'Apply least privilege and keyless authentication',
      'Place human approval where risk requires it',
      'Ship through CI/CD with regression gates',
      'Define data, model and incident governance',
    ],
  },
  {
    id: 'scale',
    phase: '04',
    title: 'Scale',
    question: 'Can the next team reuse this instead of starting over?',
    activities: [
      'Consolidate shared AI platform components',
      'Publish reusable patterns and templates',
      'Set organisational standards and responsible AI policy',
      'Control cost with budgets, tagging and cleanup',
      'Train teams and define operating ownership',
      'Extend to further services and business units',
    ],
  },
] as const
