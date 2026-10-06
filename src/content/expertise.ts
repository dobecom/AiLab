import type { ExpertiseArea } from './types'

export const expertiseAreas: readonly ExpertiseArea[] = [
  {
    id: 'generative-ai-applications',
    title: 'Generative AI Applications',
    summary:
      'Choosing the right model for a workload, shaping its behaviour deliberately, and proving the output is usable, grounded and safe.',
    topics: [
      'LLM and SLM selection against latency, quality and cost targets',
      'Prompt engineering and system instruction design',
      'Model parameters and deterministic behaviour',
      'Structured output and schema-constrained responses',
      'Content filtering and safety configuration',
      'Retrieval-augmented generation',
      'Grounding and verifiable citations',
      'Quality and safety evaluation',
    ],
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    summary:
      'Agents are only trustworthy when their goals, tools, state and failure paths are explicit and observable.',
    topics: [
      'Agent role, goal and instruction boundaries',
      'Tool and function calling',
      'Conversation state and memory strategies',
      'Knowledge integration and retrieval tools',
      'Human approval for sensitive actions',
      'Multi-agent orchestration and handoff',
      'Tool-call tracing and step inspection',
      'Error handling, retries and recovery',
    ],
  },
  {
    id: 'multimodal-ai',
    title: 'Multimodal AI',
    summary:
      'Real workloads arrive as images, audio and documents. Extraction quality and accessibility are part of the engineering, not an afterthought.',
    topics: [
      'Vision analysis and image understanding',
      'Speech to text and text to speech',
      'Image, video and audio comprehension',
      'Document extraction and layout analysis',
      'Document Intelligence',
      'Content Understanding',
      'Accessible descriptions and alt text',
      'Multimodal safety considerations',
    ],
  },
  {
    id: 'responsible-ai-operations',
    title: 'Responsible AI Operations',
    summary:
      'An AI feature becomes a system when it can be measured, secured, monitored, repaired and paid for predictably.',
    topics: [
      'Evaluation datasets and repeatable scoring',
      'Safety and groundedness evaluation',
      'Tracing and observability',
      'Token, latency and cost analysis',
      'Least privilege and keyless authentication',
      'CI/CD for AI workloads',
      'Monitoring and regression evaluation',
      'Resource cleanup and FinOps discipline',
    ],
  },
] as const
