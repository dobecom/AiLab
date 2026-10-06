import type { LearningModule } from './types'

/**
 * Each module follows the same contract: the theory is written down, the idea
 * is built in a Microsoft Foundry project, and the result is published with
 * evidence. A module is never marked published because a portal wizard ran.
 */
export const learningModules: readonly LearningModule[] = [
  {
    id: 'foundry-foundations',
    title: 'Foundry projects, access and cost control',
    summary:
      'The groundwork every later lab depends on: project topology, keyless identity, least-privilege roles, quota awareness and a budget that fails loudly before a bill does.',
    decisions: [
      'Hub-based project versus standalone project',
      'Managed identity and DefaultAzureCredential over API keys',
      'Which built-in role is actually required for each caller',
      'Which resources keep charging while idle',
    ],
    theory: { status: 'building', detail: 'Notes on project topology, RBAC and billing meters.' },
    build: { status: 'building', detail: 'Reproducible CLI setup with tags, budget and teardown.' },
    evidence: {
      status: 'planned',
      detail: 'Role assignment proof, budget alert and post-teardown resource check.',
    },
  },
  {
    id: 'model-selection',
    title: 'Model choice and deployment strategy',
    summary:
      'Comparing model families and deployment types against latency, throughput, quality and cost rather than defaulting to the largest available model.',
    decisions: [
      'Standard or serverless versus managed compute',
      'LLM versus SLM for the same task',
      'Provisioned throughput and when it is justified',
      'Region, quota and capacity constraints',
    ],
    theory: { status: 'planned', detail: 'Deployment type trade-offs and quota model.' },
    build: { status: 'planned', detail: 'Parallel deployments used by one comparison harness.' },
    evidence: {
      status: 'planned',
      detail: 'Side-by-side quality, latency, token and cost measurements.',
    },
  },
  {
    id: 'prompting-structured-output',
    title: 'Prompt engineering and structured output',
    summary:
      'Making model behaviour predictable enough for an application: instruction design, parameters, schema-constrained output and content filtering.',
    decisions: [
      'System instruction versus few-shot examples',
      'Temperature and sampling for reproducible results',
      'JSON schema enforcement versus post-validation',
      'Default content filters versus custom severity thresholds',
    ],
    theory: { status: 'planned', detail: 'Prompt patterns and parameter effects.' },
    build: { status: 'planned', detail: 'Typed structured-output client with schema validation.' },
    evidence: { status: 'planned', detail: 'Schema conformance rate and blocked-content handling.' },
  },
  {
    id: 'rag-grounding',
    title: 'Retrieval-augmented generation and grounding',
    summary:
      'Turning a document set into answers that cite their sources, with retrieval quality measured instead of assumed.',
    decisions: [
      'Chunking and embedding strategy',
      'Keyword, vector, hybrid or semantic ranking',
      'When Azure AI Search cost is warranted',
      'Prompt-injection defences for retrieved content',
    ],
    theory: { status: 'planned', detail: 'Indexing, retrieval modes and grounding failure modes.' },
    build: { status: 'planned', detail: 'Ingestion pipeline and grounded question answering.' },
    evidence: {
      status: 'planned',
      detail: 'Retrieval relevance, groundedness scores and citation inspection.',
    },
  },
  {
    id: 'agents-tools-memory',
    title: 'Agents, tools and memory',
    summary:
      'Agents that call real functions, keep conversation state, ask for approval on sensitive actions and expose every step they took.',
    decisions: [
      'Single agent with tools versus multi-agent orchestration',
      'Stateless calls versus persisted threads',
      'Where a human approval gate belongs',
      'How tool failures are surfaced and retried',
    ],
    theory: { status: 'planned', detail: 'Agent lifecycle, tool contracts and memory options.' },
    build: { status: 'planned', detail: 'Agent with function tools, knowledge tool and approval gate.' },
    evidence: { status: 'planned', detail: 'Tool-call traces, recovery cases and run cost.' },
  },
  {
    id: 'vision-multimodal',
    title: 'Vision and multimodal understanding',
    summary:
      'Image and video workloads, generation and editing, with safety and accessible descriptions treated as requirements.',
    decisions: [
      'Vision-capable chat model versus a dedicated vision service',
      'Synchronous analysis versus batch processing',
      'Where generated media needs provenance and review',
      'Alt-text quality criteria',
    ],
    theory: { status: 'planned', detail: 'Capability map across vision and multimodal services.' },
    build: { status: 'planned', detail: 'Analysis and generation pipeline with safety checks.' },
    evidence: { status: 'planned', detail: 'Annotated results, rejected cases and cost per image.' },
  },
  {
    id: 'language-speech',
    title: 'Language and speech understanding',
    summary:
      'Classic language workloads next to generative ones: sentiment, entities, summarisation, translation and the full speech round trip.',
    decisions: [
      'Prebuilt language feature versus a prompted model',
      'Real-time versus batch speech transcription',
      'Custom voice and translation requirements',
      'Language detection and multilingual handling',
    ],
    theory: { status: 'planned', detail: 'Service selection matrix and quality expectations.' },
    build: { status: 'planned', detail: 'Text analysis and speech round-trip implementation.' },
    evidence: { status: 'planned', detail: 'Accuracy sampling, latency and per-call cost.' },
  },
  {
    id: 'information-extraction',
    title: 'Information extraction from documents',
    summary:
      'Converting unstructured files into structured, reviewable data with OCR, layout analysis and Document Intelligence.',
    decisions: [
      'Read OCR versus layout versus a prebuilt or custom model',
      'When Content Understanding is the better fit',
      'Markdown output for downstream RAG',
      'Confidence thresholds and human review routing',
    ],
    theory: { status: 'planned', detail: 'Extraction model families and output shapes.' },
    build: { status: 'planned', detail: 'Extraction pipeline producing validated structured data.' },
    evidence: { status: 'planned', detail: 'Field-level accuracy, low-confidence handling and cost.' },
  },
  {
    id: 'evaluation-operations',
    title: 'Evaluation, observability and lifecycle',
    summary:
      'The operational half: evaluation datasets, tracing, regression gates in CI/CD, monitoring and automated cleanup.',
    decisions: [
      'Which evaluators matter for the workload',
      'Offline evaluation versus continuous monitoring',
      'What blocks a release',
      'How idle resources get removed automatically',
    ],
    theory: { status: 'planned', detail: 'Evaluator catalogue and release gate design.' },
    build: { status: 'planned', detail: 'Evaluation run, trace export and cleanup automation.' },
    evidence: { status: 'planned', detail: 'Score history, regression report and teardown log.' },
  },
] as const
