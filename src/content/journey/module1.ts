import { l, type Module } from './types'

export const module1: Module = {
  id: 'm1',
  number: 1,
  accent: 'blue',
  icon: 'sparkle',
  title: l('Generative AI Apps', '생성형 AI 앱'),
  subtitle: l(
    'Select, evaluate, build and govern model-powered applications',
    'model 기반 애플리케이션의 선정, 평가, 구축, 거버넌스',
  ),
  pitch: l(
    'From the first model choice to a governed chat application: one Foundry project, measurable quality, and safety designed in layers.',
    '첫 model 선택부터 거버넌스가 적용된 chat 애플리케이션까지. 하나의 Foundry project에서 측정 가능한 품질과 계층형 안전 설계를 제공합니다.',
  ),
  outcomes: [
    l('Benchmark-backed model and deployment selection', 'benchmark 기반 model 및 deployment 선정'),
    l('Repeatable evaluation of quality, risk and latency', '품질, 위험, latency에 대한 반복 가능한 evaluation'),
    l('Streaming chat apps on the Responses API with tool calling', 'Responses API 기반 streaming chat 앱과 tool calling'),
    l('RAG, fine-tuning and layered safety controls', 'RAG, fine-tuning, 계층형 안전 통제'),
  ],
  capabilities: [
    { icon: 'search', label: l('Model catalog', 'Model catalog') },
    { icon: 'beaker', label: l('Evaluation', 'Evaluation') },
    { icon: 'chat', label: l('Responses API', 'Responses API') },
    { icon: 'database', label: l('RAG', 'RAG') },
    { icon: 'wand', label: l('Fine-tuning', 'Fine-tuning') },
    { icon: 'shield', label: l('Guardrails', 'Guardrails') },
  ],
  stages: [
    {
      id: 'm1-s1',
      title: l('Plan & Select', '계획 및 모델 선정'),
      tagline: l('Choose the right model and deployment before writing code.', '코드 작성 전에 적합한 model과 deployment를 결정합니다.'),
      deliverable: l(
        'A benchmarked model shortlist and a deployment plan matched to the workload.',
        '워크로드에 맞춘 benchmark 기반 model 후보와 deployment 계획.',
      ),
      icon: 'target',
      keyPoints: [
        {
          icon: 'cube',
          title: l('One project, four asset types', '하나의 project, 네 가지 자산'),
          text: l(
            'Models, Agents, Tools and Knowledge live under one Foundry project with a single endpoint, identity and governance boundary.',
            'Models, Agents, Tools, Knowledge를 하나의 Foundry project에서 단일 endpoint, ID, 거버넌스 경계로 관리합니다.',
          ),
          key: true,
        },
        {
          icon: 'plug',
          title: l('Foundry Tools for focused tasks', '목적형 Foundry Tools'),
          text: l(
            'Language, Speech, Translator, Document Intelligence and Content Understanding deliver proven capabilities at predictable cost.',
            'Language, Speech, Translator, Document Intelligence, Content Understanding이 검증된 기능을 예측 가능한 비용으로 제공합니다.',
          ),
        },
        {
          icon: 'search',
          title: l('A catalog built for filtering', '필터링에 최적화된 catalog'),
          text: l(
            'Filter by provider, capability, region and industry. Use LLMs for deep reasoning and SLMs where speed and cost lead.',
            'provider, capability, region, industry로 필터링합니다. 심층 추론은 LLM, 속도와 비용이 중요한 곳은 SLM을 사용합니다.',
          ),
        },
        {
          icon: 'chart',
          title: l('Four benchmark lenses', '네 가지 benchmark 관점'),
          text: l(
            'Quality, safety, cost and performance metrics replace guesswork. Leaderboards, trade-off charts and side-by-side views make the choice explicit.',
            'quality, safety, cost, performance 지표로 판단 근거를 확보합니다. leaderboard, trade-off chart, side-by-side 비교로 선택을 명확히 합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'hub',
          title: l('Foundry project scope', 'Foundry project 범위'),
          center: { label: l('Foundry project', 'Foundry project'), sub: l('endpoint · identity · governance', 'endpoint · ID · 거버넌스'), icon: 'cube', key: true },
          nodes: [
            { icon: 'brain', label: l('Models', 'Models'), sub: l('OpenAI and partner providers', 'OpenAI 및 파트너 provider') },
            { icon: 'bot', label: l('Agents', 'Agents'), sub: l('Instructions and tools', 'Instructions와 tools') },
            { icon: 'wrench', label: l('Tools', 'Tools'), sub: l('Web search, code, MCP', 'Web search, code, MCP') },
            { icon: 'database', label: l('Knowledge', 'Knowledge'), sub: l('Foundry IQ', 'Foundry IQ') },
            { icon: 'apps', label: l('Foundry Tools', 'Foundry Tools'), sub: l('Language, Speech, Vision', 'Language, Speech, Vision') },
            { icon: 'lock', label: l('Access', 'Access'), sub: l('Endpoints, keys, RBAC', 'Endpoints, keys, RBAC') },
          ],
        },
        {
          kind: 'tiles',
          title: l('Benchmark lenses', 'Benchmark 관점'),
          columns: 2,
          items: [
            { icon: 'chart', label: l('Quality', 'Quality'), sub: l('Arena-Hard · GPQA · MMLU-Pro · HumanEval+ · MATH · IFEval', 'Arena-Hard · GPQA · MMLU-Pro · HumanEval+ · MATH · IFEval'), tag: l('Higher is better', '높을수록 우수'), key: true },
            { icon: 'shield', label: l('Safety', 'Safety'), sub: l('HarmBench ASR · ToxiGen F1 · WMDP', 'HarmBench ASR · ToxiGen F1 · WMDP'), tag: l('ASR lower is better', 'ASR는 낮을수록 우수') },
            { icon: 'money', label: l('Cost', 'Cost'), sub: l('Input and output price per 1M tokens, 3:1 blended estimate', '1M token당 입력/출력 단가, 3:1 혼합 추정'), tag: l('Lower is better', '낮을수록 우수') },
            { icon: 'gauge', label: l('Performance', 'Performance'), sub: l('Latency mean, P50-P99 · TTFT · tokens per second', 'Latency 평균, P50-P99 · TTFT · 초당 token'), tag: l('Latency lower, throughput higher', 'Latency 낮게, throughput 높게') },
          ],
        },
        {
          kind: 'compare',
          title: l('Deployment types', 'Deployment 유형'),
          columns: [
            { label: l('Global', 'Global'), sub: l('Any region', '모든 region'), key: true },
            { label: l('Data Zone', 'Data Zone'), sub: l('EU or US zone', 'EU 또는 US zone') },
            { label: l('Regional', 'Regional'), sub: l('Single region', '단일 region') },
          ],
          rows: [
            { label: l('Standard', 'Standard'), cells: [l('Pay-per-token, highest quota', 'token 단위 과금, 최대 quota'), l('Pay-per-token in zone', 'zone 내 token 단위 과금'), l('Data residency, low volume', '데이터 상주, 소규모 사용')] },
            { label: l('Provisioned', 'Provisioned'), cells: [l('Reserved PTU, predictable throughput', 'PTU 예약, 예측 가능한 throughput'), l('Reserved PTU in zone', 'zone 내 PTU 예약'), l('Reserved PTU in one region', '단일 region PTU 예약')] },
            { label: l('Batch', 'Batch'), cells: [l('50% discount, 24h jobs', '50% 할인, 24시간 작업'), l('Async batch in zone', 'zone 내 비동기 batch'), l('Not applicable', '해당 없음')] },
          ],
          caption: l(
            'PTU reserves inference capacity. Developer deployments (any region, pay-per-token) serve fine-tuned model evaluation.',
            'PTU는 inference 처리 용량을 예약하는 단위입니다. Developer deployment(모든 region, token 단위 과금)는 fine-tuned model 평가에 사용합니다.',
          ),
        },
      ],
      decision: {
        title: l('Select by evidence', '근거 기반 선정'),
        text: l(
          'Compare quality, safety, cost and latency side by side. Deploy Global Standard for general workloads and move to Provisioned when throughput must be guaranteed.',
          'quality, safety, cost, latency를 나란히 비교합니다. 일반 워크로드는 Global Standard로 배포하고 throughput 보장이 필요하면 Provisioned로 전환합니다.',
        ),
      },
      evidence: [
        { img: 1, caption: l('Foundry resource and project with Models, Agents, Tools and Knowledge', 'Models, Agents, Tools, Knowledge를 갖춘 Foundry resource와 project') },
        { img: 2, caption: l('Catalog filters narrow 240 models by capability', 'Catalog 필터로 240개 model을 capability 기준으로 압축') },
        { img: 6, caption: l('Trade-off chart plots quality against cost', 'Trade-off chart로 quality와 cost를 한 번에 비교') },
        { img: 7, caption: l('Side-by-side view compares candidate models in detail', 'Side-by-side 화면에서 후보 model을 상세 비교') },
      ],
    },
    {
      id: 'm1-s2',
      title: l('Evaluate', '평가'),
      tagline: l('Measure quality and safety with repeatable evaluations.', '반복 가능한 evaluation으로 품질과 안전성을 측정합니다.'),
      deliverable: l(
        'An evaluation suite that scores quality, risk and latency and gates every release.',
        '품질, 위험, latency를 점수화하고 모든 릴리스의 기준이 되는 evaluation 체계.',
      ),
      icon: 'beaker',
      keyPoints: [
        {
          icon: 'target',
          title: l('Verify before production', '운영 전 검증'),
          text: l(
            'Quality assurance, user satisfaction, continuous improvement and compliance are confirmed before users see the application.',
            '품질 보증, 사용자 만족, 지속적 개선, 컴플라이언스를 사용자 노출 전에 확인합니다.',
          ),
        },
        {
          icon: 'beaker',
          title: l('Manual first, automated at scale', '수동 검증에서 자동화로'),
          text: l(
            'Playground testing and 1-5 structured scoring set the baseline. Foundry evaluators then scale the same criteria.',
            'Playground 테스트와 1-5점 구조화 평가로 기준선을 만들고, Foundry evaluator로 같은 기준을 대규모로 적용합니다.',
          ),
        },
        {
          icon: 'scales',
          title: l('One job, three targets', '하나의 job, 세 가지 대상'),
          text: l(
            'Evaluate a Model, an Agent or a pre-generated Dataset with uploaded, existing or synthetic test data. Runs execute asynchronously.',
            'Model, Agent, 사전 생성된 Dataset을 업로드, 기존, synthetic 테스트 데이터로 평가합니다. 실행은 비동기로 진행됩니다.',
          ),
          key: true,
        },
        {
          icon: 'repeat',
          title: l('Iterate on the score', '점수 기반 개선'),
          text: l(
            'Low quality scores point to prompt, model, RAG or fine-tuning changes. Low safety scores point to content filters, prompt hardening and output validation.',
            '품질 점수가 낮으면 prompt, model, RAG, fine-tuning을 조정하고 안전 점수가 낮으면 content filter, prompt hardening, output validation을 적용합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'tiles',
          title: l('Evaluator library', 'Evaluator library'),
          columns: 3,
          items: [
            { icon: 'sparkle', label: l('Generation quality', 'Generation quality'), sub: l('Groundedness · Relevance · Coherence · Fluency', 'Groundedness · Relevance · Coherence · Fluency'), tag: l('AI-assisted', 'AI 기반 평가'), key: true },
            { icon: 'shield', label: l('Risk and safety', 'Risk and safety'), sub: l('Self-harm · Hate and unfairness · Violence · Sexual · Protected material · Indirect attack', 'Self-harm · Hate and unfairness · Violence · Sexual · Protected material · Indirect attack'), tag: l('Defect rate', 'Defect rate') },
            { icon: 'calculator', label: l('NLP metrics', 'NLP metrics'), sub: l('F1 · BLEU · METEOR · ROUGE · GLEU', 'F1 · BLEU · METEOR · ROUGE · GLEU'), tag: l('Ground truth', 'Ground truth') },
          ],
          caption: l(
            'Safety results aggregate as defect rate = true instances ÷ total instances × 100. NLP metrics need reference answers and suit closed-form tasks.',
            'Safety 결과는 defect rate = true instances ÷ total instances × 100으로 집계합니다. NLP metrics는 기준 정답이 필요하며 정답이 명확한 작업에 적합합니다.',
          ),
        },
        {
          kind: 'flow',
          title: l('Evaluation workflow', 'Evaluation 워크플로'),
          nodes: [
            { icon: 'target', label: l('Target', 'Target'), sub: l('Model · Agent · Dataset', 'Model · Agent · Dataset') },
            { icon: 'table', label: l('Test data', 'Test data'), sub: l('Upload · existing · synthetic', '업로드 · 기존 · synthetic') },
            { icon: 'beaker', label: l('Evaluators', 'Evaluators'), sub: l('Quality · safety · NLP', 'Quality · safety · NLP'), key: true },
            { icon: 'clock', label: l('Async run', 'Async run'), sub: l('Job executes in the cloud', '클라우드에서 job 실행') },
            { icon: 'chart', label: l('Scores', 'Scores'), sub: l('Summary and per-prompt detail', '요약 및 prompt별 상세') },
          ],
          loop: l('Improve and re-run', '개선 후 재실행'),
        },
        {
          kind: 'bars',
          title: l('Tune randomness: Top P selects by cumulative probability', '무작위성 조정: Top P는 누적 확률로 후보를 선택'),
          items: [
            { label: l('Seoul', 'Seoul'), value: 70, display: '70%' },
            { label: l('Busan', 'Busan'), value: 85, display: '+15% → 85%' },
            { label: l('Incheon', 'Incheon'), value: 93, display: '+8% → 93%' },
          ],
          marker: { value: 90, label: l('Top P 0.9', 'Top P 0.9') },
          caption: l(
            'Prompt: "The capital of Korea is". At Top P 0.9 the three leading tokens remain candidates; at 0.7 only Seoul remains. Tune temperature or Top P, not both.',
            'Prompt: "The capital of Korea is". Top P 0.9에서는 상위 3개 token이 후보이며 0.7에서는 Seoul만 남습니다. temperature와 Top P는 둘 중 하나만 조정합니다.',
          ),
        },
        {
          kind: 'stats',
          title: l('Recorded evaluation run', '기록된 evaluation 실행'),
          items: [
            { value: '77%', label: l('Overall score', 'Overall score'), sub: l('81 of 105 checks', '105개 중 81개 통과'), key: true },
            { value: '$0.02', label: l('Estimated cost', 'Estimated cost') },
            { value: '7.8s', label: l('P50 latency', 'P50 latency') },
            { value: '9.4s', label: l('P95 latency', 'P95 latency') },
          ],
          caption: l(
            'gpt-4.1-mini on a synthetic travel dataset, 11,221 target tokens.',
            'synthetic 여행 dataset에서 실행한 gpt-4.1-mini, target token 11,221개.',
          ),
        },
      ],
      decision: {
        title: l('Gate releases on evaluation', 'Evaluation을 릴리스 기준으로'),
        text: l(
          'Re-run the same evaluation after every prompt, model or data change so regressions surface before users see them.',
          'prompt, model, 데이터가 바뀔 때마다 같은 evaluation을 재실행해 사용자에게 노출되기 전에 품질 저하를 발견합니다.',
        ),
      },
      evidence: [
        { img: 9, caption: l('Playground compares two models on the same prompt', '같은 prompt로 두 model을 비교하는 Playground') },
        { img: 11, caption: l('Evaluation wizard with a developer prompt and criteria', 'developer prompt와 criteria를 설정하는 evaluation wizard') },
        { img: 10, caption: l('Per-metric results such as Fluency with detail drill-down', 'Fluency 등 지표별 결과와 상세 드릴다운') },
        { img: 12, caption: l('Run summary with cost, latency, tokens and overall score', 'cost, latency, token, overall score를 보여주는 실행 요약') },
      ],
    },
    {
      id: 'm1-s3',
      title: l('Build', '구현'),
      tagline: l('Ship a chat app on the Responses API with the right SDK.', '적합한 SDK로 Responses API 기반 chat 앱을 구축합니다.'),
      deliverable: l(
        'A streaming, async-capable chat application with tool calling, wired to a Foundry deployment.',
        'Foundry deployment에 연결된 streaming, async, tool calling 지원 chat 애플리케이션.',
      ),
      icon: 'code',
      keyPoints: [
        {
          icon: 'plug',
          title: l('Two endpoints, two SDKs', '두 개의 endpoint, 두 개의 SDK'),
          text: l(
            'The project endpoint with the Foundry SDK unlocks agents, cloud evaluation and tracing. The OpenAI endpoint with the OpenAI SDK maximizes compatibility.',
            'project endpoint와 Foundry SDK는 agent, cloud evaluation, tracing을 제공하고 OpenAI endpoint와 OpenAI SDK는 최대 호환성을 제공합니다.',
          ),
          key: true,
        },
        {
          icon: 'chat',
          title: l('Stateful by design', '상태 유지 설계'),
          text: l(
            'The Responses API carries context with previous_response_id. Chat Completions is stateless, so the application tracks history itself.',
            'Responses API는 previous_response_id로 대화 맥락을 유지합니다. Chat Completions는 stateless이므로 애플리케이션이 history를 직접 관리합니다.',
          ),
        },
        {
          icon: 'flash',
          title: l('Streaming and async', 'Streaming과 async'),
          text: l(
            'Event-based streaming delivers text as it is generated. AsyncOpenAI with asyncio.gather runs prompts concurrently and preserves order.',
            'event 기반 streaming은 생성되는 즉시 텍스트를 전달합니다. AsyncOpenAI와 asyncio.gather는 prompt를 동시에 실행하고 순서를 보장합니다.',
          ),
        },
        {
          icon: 'wrench',
          title: l('Tools extend the model', 'Tool로 model 확장'),
          text: l(
            'The model selects a tool, the application executes it, and the result returns to the model for the final answer.',
            'model이 tool을 선택하고 애플리케이션이 실행한 뒤 결과를 model에 돌려주어 최종 답변을 생성합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'compare',
          title: l('Choose the SDK', 'SDK 선택'),
          columns: [
            { label: l('Foundry SDK', 'Foundry SDK'), sub: l('AIProjectClient · project endpoint', 'AIProjectClient · project endpoint'), key: true },
            { label: l('OpenAI SDK', 'OpenAI SDK'), sub: l('OpenAI · OpenAI endpoint', 'OpenAI · OpenAI endpoint') },
          ],
          rows: [
            { label: l('Best for', '적합한 용도'), cells: [l('Agents, evaluation, tracing', 'Agent, evaluation, tracing'), l('Model inference workloads', 'Model inference 워크로드')] },
            { label: l('Connects with', '연결 방식'), cells: [l('credential + endpoint', 'credential + endpoint'), l('api_key + base_url', 'api_key + base_url')] },
            { label: l('Adds', '추가 기능'), cells: [l('Tool approval, connections, governance', 'Tool approval, connections, governance'), l('Chat Completions, Responses, Images', 'Chat Completions, Responses, Images')] },
            { label: l('Portability', '이식성'), cells: [l('Foundry-specific features', 'Foundry 전용 기능'), l('Reuses existing OpenAI code', '기존 OpenAI 코드 재사용')] },
          ],
        },
        {
          kind: 'code',
          title: l('Multi-turn conversation, keyless', 'Multi-turn 대화, keyless 인증'),
          lang: 'python',
          code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint="https://<resource-name>.services.ai.azure.com/api/projects/<project-name>",
)

with project.get_openai_client() as client:
    first = client.responses.create(
        model="gpt-4.1-mini",
        input="Plan a 3-day trip to Busan.",
    )
    follow = client.responses.create(
        model="gpt-4.1-mini",
        input="Make it budget friendly.",
        previous_response_id=first.id,
    )
    print(follow.output_text)`,
          highlight: [4, 16],
          caption: l(
            'Developer instructions define app rules; platform system prompts take priority (System > Developer).',
            'developer instructions는 앱 규칙을 정의하며 플랫폼 system prompt가 우선합니다 (System > Developer).',
          ),
        },
        {
          kind: 'steps',
          title: l('Streaming event sequence', 'Streaming event 순서'),
          steps: [
            { label: l('response.created', 'response.created'), text: l('Response object created', 'Response 객체 생성') },
            { label: l('response.in_progress', 'response.in_progress'), text: l('Generation started', '생성 시작') },
            { label: l('response.output_item.added', 'response.output_item.added'), text: l('Output item opened', 'Output item 시작') },
            { label: l('response.content_part.added', 'response.content_part.added'), text: l('Content part opened', 'Content part 시작') },
            { label: l('response.output_text.delta', 'response.output_text.delta'), text: l('Text chunks stream here', '텍스트 chunk가 여기서 전달') , icon: 'flash' },
            { label: l('response.output_text.done', 'response.output_text.done'), text: l('Text complete', '텍스트 완료') },
            { label: l('response.output_item.done', 'response.output_item.done'), text: l('Output item closed', 'Output item 종료') },
            { label: l('response.completed', 'response.completed'), text: l('Response complete', 'Response 완료') },
          ],
        },
        {
          kind: 'tiles',
          title: l('Responses API tools', 'Responses API tools'),
          columns: 2,
          items: [
            { icon: 'code', label: l('code_interpreter', 'code_interpreter'), sub: l('Sandboxed Python for analysis and file conversion', '분석과 파일 변환을 위한 sandbox Python'), tag: l('Built-in', 'Built-in') },
            { icon: 'globe', label: l('web_search', 'web_search'), sub: l('Live, source-grounded answers beyond training data', '학습 데이터 이후의 최신 정보를 출처와 함께 제공'), tag: l('Built-in', 'Built-in') },
            { icon: 'folder', label: l('file_search', 'file_search'), sub: l('Private documents through a vector store, with citations', 'vector store 기반 사내 문서 검색과 citation'), tag: l('Built-in', 'Built-in') },
            { icon: 'wrench', label: l('function', 'function'), sub: l('The model requests a call; your code runs it and returns the result', 'model이 호출을 요청하면 애플리케이션이 실행하고 결과를 반환'), tag: l('Custom', 'Custom'), key: true },
          ],
        },
      ],
      decision: {
        title: l('Entra ID in production', '운영 환경은 Entra ID'),
        text: l(
          'Use DefaultAzureCredential and managed identity for deployed apps. Reserve API keys for quick local tests.',
          '배포된 앱은 DefaultAzureCredential과 managed identity를 사용하고 API key는 빠른 로컬 테스트에만 사용합니다.',
        ),
      },
      evidence: [
        { img: 14, caption: l('Project endpoint call from VS Code with keyless credential', 'VS Code에서 keyless credential로 호출한 project endpoint') },
        { img: 16, caption: l('Foundry SDK and OpenAI SDK connection patterns side by side', 'Foundry SDK와 OpenAI SDK 연결 방식 비교') },
        { img: 19, caption: l('Streaming event log in order', '순서대로 기록된 streaming event log') },
        { img: 25, caption: l('Function calling: the model requests get_time, the app executes it', 'Function calling: model이 get_time을 요청하고 앱이 실행') },
      ],
    },
    {
      id: 'm1-s4',
      title: l('Optimize & Govern', '최적화 및 거버넌스'),
      tagline: l('Raise quality in measured steps and contain risk in layers.', '측정 가능한 단계로 품질을 높이고 위험은 계층으로 통제합니다.'),
      deliverable: l(
        'An optimization path from prompt to fine-tuning and a four-layer safety design with guardrails.',
        'prompt에서 fine-tuning까지의 최적화 경로와 guardrails를 포함한 4계층 안전 설계.',
      ),
      icon: 'shield',
      keyPoints: [
        {
          icon: 'trend',
          title: l('Escalate in order', '순서대로 확장'),
          text: l(
            'Start with prompt engineering, add RAG for accuracy, add fine-tuning for consistency, and combine them when the workload demands it.',
            'prompt engineering으로 시작하고 정확도는 RAG, 일관성은 fine-tuning으로 보강하며 필요하면 조합합니다.',
          ),
          key: true,
        },
        {
          icon: 'database',
          title: l('RAG grounds answers', 'RAG로 답변 근거 확보'),
          text: l(
            'Retrieve, augment, generate: answers rest on your data. Hybrid search, combining keyword, semantic and vector, is the recommended default.',
            'Retrieve, augment, generate 순서로 답변이 사내 데이터에 근거합니다. keyword, semantic, vector를 결합한 hybrid search를 기본으로 권장합니다.',
          ),
        },
        {
          icon: 'wand',
          title: l('Fine-tune for behavior', '동작 특화 fine-tuning'),
          text: l(
            'SFT, RFT and DPO shape style, output format and tool use from JSONL data. Plan for training and hourly hosting cost.',
            'SFT, RFT, DPO로 JSONL 데이터 기반 스타일, 출력 형식, tool 사용을 조정합니다. 학습 비용과 시간당 호스팅 비용을 함께 계획합니다.',
          ),
        },
        {
          icon: 'shield',
          title: l('Layered mitigation', '계층형 위험 완화'),
          text: l(
            'Model, safety system, system message with grounding, and user experience work together. Guardrails add content filters, prompt shields and PII controls.',
            'Model, safety system, system message와 grounding, user experience가 함께 동작합니다. Guardrails는 content filter, prompt shield, PII 통제를 제공합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'matrix',
          title: l('Optimization map', '최적화 지도'),
          xAxis: l('Context optimization: what the model knows', 'Context 최적화: model이 아는 것'),
          yAxis: l('Model optimization: how it behaves', 'Model 최적화: model의 동작 방식'),
          cells: [
            { icon: 'wand', label: l('Fine-tuning', 'Fine-tuning'), sub: l('Style, tone, format', '스타일, 톤, 형식') },
            { icon: 'layers', label: l('Combined', 'Combined'), sub: l('Maximum optimization', '최대 최적화'), key: true },
            { icon: 'pen', label: l('Prompt engineering', 'Prompt engineering'), sub: l('Fastest start, no infrastructure', '가장 빠른 시작, 인프라 불필요') },
            { icon: 'database', label: l('RAG', 'RAG'), sub: l('Current, domain-specific facts', '최신 도메인 지식') },
          ],
        },
        {
          kind: 'flow',
          title: l('RAG pipeline', 'RAG 파이프라인'),
          nodes: [
            { icon: 'chat', label: l('Question', 'Question'), sub: l('User prompt', '사용자 prompt') },
            { icon: 'search', label: l('Retrieve', 'Retrieve'), sub: l('Azure AI Search index', 'Azure AI Search index') },
            { icon: 'layers', label: l('Augment', 'Augment'), sub: l('Add context to the prompt', 'prompt에 context 추가'), key: true },
            { icon: 'sparkle', label: l('Generate', 'Generate'), sub: l('Grounded answer', '근거 기반 답변') },
          ],
          caption: l(
            'Embeddings and cosine similarity find related content even without exact keyword matches.',
            'embedding과 cosine similarity로 정확한 keyword가 없어도 관련 콘텐츠를 찾습니다.',
          ),
        },
        {
          kind: 'cycle',
          title: l('Responsible AI process', 'Responsible AI 프로세스'),
          center: l('Responsible AI', 'Responsible AI'),
          nodes: [
            { icon: 'target', label: l('Map', 'Map'), sub: l('Rank harms by likelihood × impact', '가능성 × 영향도로 위험 우선순위화') },
            { icon: 'gauge', label: l('Measure', 'Measure'), sub: l('Red-team and score outputs', 'Red teaming과 출력 평가') },
            { icon: 'shield', label: l('Mitigate', 'Mitigate'), sub: l('Controls across four layers', '4개 계층 통제'), key: true },
            { icon: 'settings', label: l('Manage', 'Manage'), sub: l('Phased release, incident response, telemetry', '단계적 배포, 사고 대응, telemetry') },
          ],
          caption: l(
            'Six principles: Fairness · Reliability & Safety · Privacy & Security · Inclusiveness · Transparency · Accountability.',
            '6가지 원칙: Fairness · Reliability & Safety · Privacy & Security · Inclusiveness · Transparency · Accountability.',
          ),
        },
        {
          kind: 'layers',
          title: l('Layered mitigation', '계층형 위험 완화'),
          layers: [
            { icon: 'person', label: l('User experience', 'User experience'), sub: l('Input validation, transparency, documentation', '입력 검증, 투명성, 문서화') },
            { icon: 'doc', label: l('System message and grounding', 'System message와 grounding'), sub: l('Instructions, RAG, grounding data', 'Instructions, RAG, grounding data') },
            { icon: 'shield', label: l('Safety system', 'Safety system'), sub: l('Guardrails: 4 categories × 4 severity levels, prompt shields', 'Guardrails: 4개 카테고리 × 4개 심각도, prompt shield'), key: true },
            { icon: 'cube', label: l('Model', 'Model'), sub: l('Right-sized model, fine-tuning', '적정 규모 model, fine-tuning') },
          ],
        },
      ],
      decision: {
        title: l('Guardrails on every deployment', '모든 deployment에 Guardrails'),
        text: l(
          'Attach guardrails for content filters, jailbreak detection and PII controls to each model and agent deployment, then verify them with the evaluation suite.',
          '각 model과 agent deployment에 content filter, jailbreak 탐지, PII 통제 guardrails를 적용하고 evaluation으로 검증합니다.',
        ),
      },
      evidence: [
        { img: 29, caption: l('Fine-tune wizard with a JSONL dataset and training type', 'JSONL dataset과 training type을 설정하는 fine-tune wizard') },
        { img: 30, caption: l('Fine-tune job logs track progress step by step', 'Fine-tune job log로 진행 상황을 단계별 추적') },
        { img: 31, caption: l('Four-layer safety architecture', '4계층 안전 아키텍처') },
        { img: 32, caption: l('Guardrails policy with content, jailbreak and PII controls', 'content, jailbreak, PII 통제를 포함한 Guardrails 정책') },
      ],
    },
  ],
}
