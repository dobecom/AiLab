import { l, type L } from './types'
import type { IconName } from './iconNames'

export const cover = {
  eyebrow: l('AiLab · Microsoft Foundry', 'AiLab · Microsoft Foundry'),
  role: l('AI Apps and Agents Developer', 'AI Apps and Agents Developer'),
  headline: l(
    'Building AI applications. Engineering trusted agents.',
    'AI application을 만들고, 신뢰할 수 있는 agent를 설계합니다.',
  ),
  lede: l(
    'A guided tour of what Microsoft Foundry delivers: generative AI apps, agents, language and voice, vision and documents. Each module runs in four stages, from the design decision to recorded evidence.',
    'Microsoft Foundry로 구현할 수 있는 범위를 안내합니다. 생성형 AI 앱, agent, 언어와 음성, 비전과 문서를 각각 설계 판단부터 기록된 실행 근거까지 4개 Stage로 보여줍니다.',
  ),
  begin: l('Begin the journey', '여정 시작'),
  map: l('View the map', '전체 지도 보기'),
  verbs: [
    { icon: 'search', label: l('Explore', 'Explore') },
    { icon: 'wrench', label: l('Build', 'Build') },
    { icon: 'beaker', label: l('Evaluate', 'Evaluate') },
    { icon: 'rocket', label: l('Transform', 'Transform') },
  ] as { icon: IconName; label: L }[],
} as const

export const overview = {
  eyebrow: l('The map', '전체 지도'),
  title: l('Four modules. Sixteen stages. One delivery path.', '4개 Module, 16개 Stage, 하나의 구현 경로.'),
  lede: l(
    'Every module follows the same four-stage arc. Each capability can be scoped, built and reviewed the same way, from the first design choice to evidence you can inspect.',
    '모든 module은 동일한 4단계 흐름을 따릅니다. 첫 설계 판단부터 직접 확인할 수 있는 근거까지, 각 기능을 같은 방식으로 범위 산정, 구축, 검토할 수 있습니다.',
  ),
  legend: [
    { icon: 'target', label: l('Key points', '핵심 포인트') },
    { icon: 'chart', label: l('Visual model', '시각 모델') },
    { icon: 'camera', label: l('Recorded evidence', '기록된 실행 화면') },
  ] as { icon: IconName; label: L }[],
} as const

interface PlaybookStage {
  id: string
  icon: IconName
  title: L
  goal: L
  activities: L[]
}

export const closing = {
  eyebrow: l('From experiment to capability', '실험에서 조직 역량으로'),
  title: l('A repeatable path from Foundry prototype to governed AI', 'Foundry prototype에서 거버넌스를 갖춘 AI까지 반복 가능한 경로'),
  lede: l(
    'The four modules prove what the platform can do. This playbook turns each result into something a team can run, observe, secure and extend.',
    '네 개의 module은 플랫폼이 할 수 있는 범위를 보여줍니다. 이 playbook은 각 결과를 팀이 운영하고, 관찰하고, 보호하고, 확장할 수 있는 형태로 전환합니다.',
  ),
  playbookTitle: l('AI transformation playbook', 'AI 전환 playbook'),
  rampFrom: l('Foundry experiment', 'Foundry experiment'),
  rampTo: l('Governed organizational capability', '거버넌스를 갖춘 조직 역량'),
  notesEyebrow: l('How the lab works', 'Lab 운영 방식'),
  notesTitle: l('Expertise, standards and continuous practice', '전문 영역, 기준, 그리고 지속적인 실습'),
  playbook: [
    {
      id: 'discover',
      icon: 'search',
      title: l('Discover', 'Discover'),
      goal: l('Confirm AI is the right solution for the problem', 'AI가 해당 문제에 적합한 해법임을 확정'),
      activities: [
        l('Define the business problem and the users', '해결할 업무 문제와 사용자 정의'),
        l('Confirm which data exists and may be used', '사용 가능한 데이터 확인'),
        l('Agree on success metrics before building', '구축 전에 성공 지표 합의'),
        l('Validate AI against the simpler alternative', '더 단순한 대안과 비교 검증'),
      ],
    },
    {
      id: 'prove',
      icon: 'beaker',
      title: l('Prove', 'Prove'),
      goal: l('Demonstrate quality, safety and cost targets', '품질, 안전성, 비용 목표 달성을 입증'),
      activities: [
        l('Build the smallest working prototype', '가장 작은 동작 prototype 구축'),
        l('Measure quality, safety and groundedness', 'Quality, safety, groundedness 측정'),
        l('Record latency and cost per interaction', '상호작용당 latency와 cost 기록'),
        l('Compare with the existing process', '기존 프로세스와 비교'),
      ],
    },
    {
      id: 'operationalize',
      icon: 'settings',
      title: l('Operationalize', 'Operationalize'),
      goal: l('Hand over a solution a team can run, observe and repair', '팀이 운영, 관찰, 복구할 수 있는 상태로 인계'),
      activities: [
        l('Automate evaluation and add regression gates', 'Evaluation 자동화와 regression gate 적용'),
        l('Add tracing, monitoring and alerting', 'Tracing, monitoring, alerting 추가'),
        l('Apply least privilege and keyless authentication', 'Least privilege와 keyless 인증 적용'),
        l('Place human approval where risk requires it', '위험 구간에 사람의 승인 배치'),
      ],
    },
    {
      id: 'scale',
      icon: 'layers',
      title: l('Scale', 'Scale'),
      goal: l('Make the solution reusable for the next team', '다음 팀이 재사용할 수 있는 자산으로 전환'),
      activities: [
        l('Share platform components and templates', '플랫폼 구성요소와 template 공유'),
        l('Set responsible AI standards and ownership', 'Responsible AI 표준과 책임 체계 수립'),
        l('Control cost with budgets, tags and cleanup', 'Budget, tag, cleanup으로 cost 통제'),
        l('Extend to further services and business units', '다른 서비스와 사업 단위로 확장'),
      ],
    },
  ] as PlaybookStage[],
  expertiseTitle: l('Core expertise', '핵심 전문 영역'),
  expertise: [
    {
      icon: 'sparkle',
      title: l('Generative AI Applications', 'Generative AI Applications'),
      text: l(
        'Model selection, prompt design, structured output, RAG with citations and evaluation.',
        'Model 선정, prompt 설계, structured output, citation을 갖춘 RAG, evaluation.',
      ),
    },
    {
      icon: 'bot',
      title: l('AI Agents', 'AI Agents'),
      text: l(
        'Tools, knowledge, memory, approval controls and multi-agent orchestration.',
        'Tool, knowledge, memory, 승인 통제, multi-agent orchestration.',
      ),
    },
    {
      icon: 'eye',
      title: l('Multimodal AI', 'Multimodal AI'),
      text: l(
        'Vision, speech, translation, document extraction and video understanding.',
        'Vision, speech, translation, 문서 추출, video 이해.',
      ),
    },
    {
      icon: 'shield',
      title: l('Responsible AI Operations', 'Responsible AI Operations'),
      text: l(
        'Guardrails, tracing, evaluation gates, security and cost discipline.',
        'Guardrails, tracing, evaluation gate, 보안, cost 관리.',
      ),
    },
  ] as { icon: IconName; title: L; text: L }[],
  standardsTitle: l('Standards on every build', '모든 구축에 적용하는 기준'),
  standards: [
    { icon: 'key', text: l('Keyless authentication and least-privilege RBAC', 'Keyless 인증과 least-privilege RBAC') },
    { icon: 'lock', text: l('No secret, key or private data in source control', 'Source control에 secret, key, 개인 데이터 미포함') },
    { icon: 'money', text: l('Billing meter, smallest SKU, budget and resource tags', 'Billing meter, 최소 SKU, budget, resource tag') },
    { icon: 'check', text: l('Documented teardown and a leftover-resource check', '문서화된 teardown과 잔여 resource 점검') },
    { icon: 'beaker', text: l('Success and expected-failure paths both tested', '정상 경로와 예상 실패 경로 모두 테스트') },
    { icon: 'gauge', text: l('Tracing, latency and token cost recorded', 'Tracing, latency, token cost 기록') },
  ] as { icon: IconName; text: L }[],
  playground: {
    title: l('Embedded playground', 'Embedded playground'),
    status: l('Building', '구축 중'),
    text: l(
      'Live model and agent experiences are being connected through the shared Core-Server API with managed identity. No Azure credential reaches the browser. Until each experience is live, every result on this site is a recorded capture from a real Foundry session.',
      '공용 Core-Server API와 managed identity를 통해 실시간 model, agent 체험을 연결하고 있습니다. Azure credential은 browser에 전달되지 않습니다. 각 체험이 연결되기 전까지 이 사이트의 모든 결과는 실제 Foundry 세션에서 기록한 캡처입니다.',
    ),
    items: [
      { icon: 'brain', label: l('Model comparison on one prompt', '동일 prompt로 model 비교') },
      { icon: 'code', label: l('Structured JSON output', 'Structured JSON output') },
      { icon: 'database', label: l('RAG answers with citations', 'Citation을 갖춘 RAG 답변') },
      { icon: 'wrench', label: l('Agent tool-call trace', 'Agent tool-call trace') },
      { icon: 'team', label: l('Multi-agent workflow', 'Multi-agent workflow') },
      { icon: 'document', label: l('Document extraction', '문서 추출') },
    ] as { icon: IconName; label: L }[],
  },
  growth: l(
    'AiLab grows through continuous practice. Each new lab joins the map with the same four parts: the concept, a Foundry build, embedded evidence and the operating notes.',
    'AiLab은 지속적인 실습을 통해 확장됩니다. 새로운 lab은 개념, Foundry 구현, 내장된 실행 근거, 운영 노트의 동일한 네 가지 구성으로 지도에 추가됩니다.',
  ),
  limitationsTitle: l('Environment notes', '환경 참고 사항'),
  limitationsLead: l(
    'Availability differs by subscription type and region. These items were noted during the recorded sessions.',
    '제공 여부는 구독 유형과 region에 따라 다릅니다. 기록된 실행 중 확인한 항목입니다.',
  ),
} as const
