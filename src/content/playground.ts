import type { PlaygroundExperience } from './types'

export const playgroundNotice =
  'The playground is not connected to a live model yet. When an experience goes live it runs through the shared Core-Server API at /api/v1/ailab/*, authenticated with managed identity. No Azure credential, Foundry key or connection string is ever sent to the browser.'

export const playgroundExperiences: readonly PlaygroundExperience[] = [
  {
    id: 'model-comparison',
    title: 'Compare Foundry models on one prompt',
    description:
      'Send the same prompt to several deployed models and read the answers next to each other instead of trusting a benchmark table.',
    signals: ['Response quality', 'Latency', 'Token usage', 'Estimated cost'],
    status: 'planned',
  },
  {
    id: 'prompt-parameters',
    title: 'Change the prompt and the parameters',
    description:
      'Edit the system instruction, temperature and response limits and watch how deterministic the output becomes.',
    signals: ['System instruction', 'Temperature', 'Max output tokens', 'Finish reason'],
    status: 'planned',
  },
  {
    id: 'structured-output',
    title: 'Structured JSON output',
    description:
      'Request a schema-constrained response and see the validation result, not just a formatted string.',
    signals: ['Target schema', 'Raw response', 'Validation outcome'],
    status: 'planned',
  },
  {
    id: 'rag-answers',
    title: 'Ask questions against a document set',
    description:
      'Retrieval-augmented answers where every claim can be traced back to the retrieved passage it came from.',
    signals: ['Retrieved chunks', 'Ranking scores', 'Citations', 'Groundedness'],
    status: 'planned',
  },
  {
    id: 'agent-conversation',
    title: 'Talk to an agent and watch its tools',
    description:
      'A conversation with the tool calls, arguments, results and recovery steps exposed rather than hidden.',
    signals: ['Tool calls', 'Arguments and results', 'Approval steps', 'Run trace'],
    status: 'planned',
  },
  {
    id: 'multi-agent',
    title: 'Multi-agent workflow',
    description:
      'Several specialised agents handing work to each other, with the orchestration path shown end to end.',
    signals: ['Agent handoffs', 'Per-agent cost', 'Failure and retry path'],
    status: 'planned',
  },
  {
    id: 'vision-analysis',
    title: 'Vision analysis',
    description:
      'Upload or pick an image and inspect the structured understanding plus the accessible description produced for it.',
    signals: ['Detected content', 'Generated alt text', 'Safety outcome'],
    status: 'planned',
  },
  {
    id: 'speech',
    title: 'Speech to text and text to speech',
    description:
      'The full speech round trip with timing, so transcription quality and latency can be judged honestly.',
    signals: ['Transcript', 'Confidence', 'Synthesis latency'],
    status: 'planned',
  },
  {
    id: 'document-extraction',
    title: 'Document extraction',
    description:
      'Turn a sample document into structured fields and Markdown, including what the model was not confident about.',
    signals: ['Extracted fields', 'Confidence scores', 'Markdown output'],
    status: 'planned',
  },
  {
    id: 'evaluation-cost',
    title: 'Evaluation, latency and cost comparison',
    description:
      'The same scenario scored by evaluators and compared on latency and cost, so a choice can be defended with numbers.',
    signals: ['Evaluator scores', 'Latency distribution', 'Cost per run'],
    status: 'planned',
  },
] as const
