export interface AboutBlock {
  id: string
  title: string
  body: string
  points?: readonly string[]
}

export const aboutBlocks: readonly AboutBlock[] = [
  {
    id: 'how-it-grows',
    title: 'How this lab grows',
    body: 'Every entry is added as one set: the theory, the Microsoft Foundry build that applies it, the result it produced, and the evidence that makes the result checkable. Nothing is added as a slide-deck claim.',
    points: [
      'Theory — concepts, service selection criteria and the decision points that matter',
      'Foundry build — model deployment, retrieval, agents and connected Azure services',
      'Result — real model and agent output, traces, token usage, latency and scores',
      'Evidence — architecture, code, configuration, failures, fixes, security and cost',
    ],
  },
  {
    id: 'standards',
    title: 'Standards applied to every lab',
    body: 'A lab is only finished when someone else could repeat it from a clean environment and get the same answer, including the cleanup.',
    points: [
      'Keyless authentication with DefaultAzureCredential and managed identity',
      'Least-privilege role assignments instead of broad subscription access',
      'No secret, key, connection string or private data in this repository',
      'Expected billing meters, smallest practical SKU, budgets and resource tags',
      'A documented teardown and a post-deletion check for leftover resources',
      'Both the success path and the expected failure path are tested',
    ],
  },
  {
    id: 'learning-journey',
    title: 'Learning journey',
    body: 'The structured source of theory is the Microsoft Learn study path for developing AI apps and agents on Azure. It supplies the curriculum; the implementations, evaluations and operational evidence published here are the actual outcome. Certifications are listed only once they are held.',
  },
  {
    id: 'engineering',
    title: 'How this site is engineered',
    body: 'The public site is a static React and TypeScript application built with Vite and Fluent UI, served by Nginx behind Cloudflare and Caddy. Live Foundry features will be served by the shared Core-Server API at /api/v1/ailab/*, so Azure credentials stay on the server side and never reach the browser.',
    points: [
      'React 19, TypeScript, Vite and Fluent UI React Components',
      'Python first for the lab code, with TypeScript SDK examples where useful',
      'Strict security headers, structured access logs and a loopback-only local binding',
      'Responsive layout, keyboard navigation, 200% zoom and reduced-motion support',
    ],
  },
  {
    id: 'reuse',
    title: 'Why it is public',
    body: 'A personal learning record is useful once. A documented set of working patterns, trade-offs, evaluation methods, costs and failure cases can be reused by an organisation that is deciding how to adopt AI properly.',
  },
] as const
