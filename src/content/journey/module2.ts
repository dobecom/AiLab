import { l, type Module } from './types'

export const module2: Module = {
  id: 'm2',
  number: 2,
  accent: 'violet',
  icon: 'bot',
  title: l('Agentic Solutions', '에이전트 솔루션'),
  subtitle: l(
    'Agents that reason, use tools, connect knowledge and collaborate.',
    'tool을 사용해 추론하고, knowledge에 연결되며, 서로 협업하는 agent.',
  ),
  pitch: l(
    'Start with a single prompt agent and grow it into a governed team: tools for action, Foundry IQ for grounded answers, Microsoft 365 for reach and orchestration for complex work.',
    'prompt agent 하나로 시작해 거버넌스를 갖춘 agent 팀으로 확장합니다. tool로 실행하고, Foundry IQ로 근거 있는 답변을 만들며, Microsoft 365로 배포하고, orchestration으로 복잡한 업무를 처리합니다.',
  ),
  outcomes: [
    l(
      'Prompt agents with a dedicated Entra identity and a stable Responses endpoint.',
      '전용 Entra identity와 안정적인 Responses endpoint를 갖춘 prompt agent.',
    ),
    l(
      'Agents that act through function, OpenAPI and MCP tools and answer from Foundry IQ knowledge.',
      'function, OpenAPI, MCP tool로 실행하고 Foundry IQ knowledge로 답변하는 agent.',
    ),
    l(
      'Agents published to Teams and Microsoft 365 Copilot, plus workflows that route by confidence.',
      'Teams와 Microsoft 365 Copilot에 게시된 agent, 그리고 confidence로 라우팅하는 workflow.',
    ),
    l(
      'Multi-agent solutions built on handoff, Magentic and other orchestration patterns.',
      'handoff, Magentic 등 orchestration 패턴으로 구성한 multi-agent 솔루션.',
    ),
  ],
  capabilities: [
    { icon: 'bot', label: l('Prompt agents', 'Prompt agent') },
    { icon: 'wrench', label: l('Tools & MCP', 'Tool 및 MCP') },
    { icon: 'database', label: l('Foundry IQ knowledge', 'Foundry IQ knowledge') },
    { icon: 'apps', label: l('Teams & Microsoft 365', 'Teams 및 Microsoft 365') },
    { icon: 'flow', label: l('Workflows', 'Workflow') },
    { icon: 'team', label: l('Multi-agent orchestration', 'Multi-agent orchestration') },
  ],
  stages: [
    {
      id: 'm2-s1',
      title: l('Build an Agent', 'Agent 구축'),
      tagline: l(
        'One definition combines model, instructions, tools and identity.',
        '하나의 정의로 model, instructions, tool, identity를 묶습니다.',
      ),
      deliverable: l(
        'A versioned agent with its own Entra identity and a stable Responses endpoint, buildable in the portal, VS Code or code.',
        '고유한 Entra identity와 안정적인 Responses endpoint를 갖춘 versioned agent. portal, VS Code, 코드 어디서든 구축할 수 있습니다.',
      ),
      icon: 'bot',
      keyPoints: [
        {
          icon: 'code',
          title: l('Three authoring paths', '세 가지 개발 경로'),
          text: l(
            'Start in the portal, refine in VS Code with YAML definitions, and move to SDK code when you need full control.',
            'portal에서 시작하고 VS Code의 YAML 정의로 다듬은 뒤, 완전한 제어가 필요하면 SDK 코드로 확장합니다.',
          ),
        },
        {
          icon: 'pen',
          title: l('Instructions drive behavior', 'instructions가 동작을 결정'),
          text: l(
            'Clear instructions, model choice, temperature and top P define how the agent behaves; playground tests cover happy path, edge cases and boundaries.',
            '명확한 instructions, model 선택, temperature, top P가 agent의 동작을 정하며, playground 테스트로 정상 경로, edge case, 범위 경계를 검증합니다.',
          ),
        },
        {
          icon: 'key',
          title: l('Identity built in', '기본 제공 identity'),
          text: l(
            'Each agent gets a dedicated Entra identity with its own RBAC scope. Callers send an Entra ID bearer token; API keys are not supported.',
            '각 agent는 고유한 RBAC scope를 가진 전용 Entra identity를 받습니다. 호출자는 Entra ID bearer token을 보내며 API key는 지원되지 않습니다.',
          ),
          key: true,
        },
        {
          icon: 'link',
          title: l('Stable Responses endpoint', '안정적인 Responses endpoint'),
          text: l(
            'The endpoint URL stays stable across versions. It is stateless today, so the client keeps conversation history.',
            'endpoint URL은 version이 바뀌어도 유지됩니다. 현재 stateless이므로 대화 이력은 client가 보관합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'hub',
          title: l('Anatomy of a Foundry agent', 'Foundry agent의 구성'),
          center: {
            label: l('Foundry agent', 'Foundry agent'),
            sub: l('Versioned definition', 'Version 관리되는 정의'),
            icon: 'bot',
            key: true,
          },
          nodes: [
            { label: l('Model', 'Model'), sub: l('Deployment you choose', '선택한 deployment'), icon: 'brain' },
            { label: l('Instructions', 'Instructions'), sub: l('Role, rules, tone', '역할, 규칙, 어조'), icon: 'pen' },
            { label: l('Tools', 'Tools'), sub: l('Actions and search', '실행과 검색'), icon: 'wrench' },
            { label: l('Knowledge', 'Knowledge'), sub: l('Grounded answers', '근거 기반 답변'), icon: 'database' },
            { label: l('Identity', 'Identity'), sub: l('Entra and RBAC', 'Entra와 RBAC'), icon: 'key' },
            { label: l('Endpoint', 'Endpoint'), sub: l('Responses protocol', 'Responses protocol'), icon: 'link' },
          ],
          caption: l(
            'Everything the agent needs is defined together and reached through one endpoint.',
            'agent에 필요한 구성요소를 함께 정의하고 하나의 endpoint로 호출합니다.',
          ),
        },
        {
          kind: 'flow',
          title: l('The Responses loop', 'Responses loop'),
          direction: 'row',
          nodes: [
            { label: l('User', 'User'), sub: l('Sends a prompt', 'prompt 전송'), icon: 'person' },
            { label: l('Agent', 'Agent'), sub: l('Reasons over instructions', 'instructions 기반 추론'), icon: 'bot' },
            { label: l('Tool call', 'Tool call'), sub: l('Function, MCP or search', 'function, MCP, 검색'), icon: 'wrench', key: true },
            { label: l('Result', 'Result'), sub: l('Returned to the model', 'model로 반환'), icon: 'check' },
            { label: l('Answer', 'Answer'), sub: l('Grounded response', '근거 있는 응답'), icon: 'chat' },
          ],
          loop: l('Next turn', '다음 turn'),
          caption: l(
            'The agent decides when to call a tool, reads the result and then answers.',
            'agent가 tool 호출 시점을 판단하고, 결과를 읽은 뒤 답변합니다.',
          ),
        },
      ],
      decision: {
        title: l('Start with a prompt agent', 'Prompt agent로 시작'),
        text: l(
          'Begin with a declarative prompt agent and Entra-authenticated access; adopt hosted agents only when you need custom code or a container image.',
          '선언형 prompt agent와 Entra 인증 접근으로 시작하고, 사용자 지정 코드나 container image가 필요할 때만 hosted agent를 도입하는 구성을 권장합니다.',
        ),
      },
      evidence: [
        {
          img: 34,
          caption: l(
            'Foundry Toolkit groups resources, developer tools and help in one sidebar',
            'Foundry Toolkit이 resource, 개발 도구, 도움말을 한 사이드바에 모읍니다',
          ),
        },
        {
          img: 35,
          caption: l(
            'YAML definition captures model, instructions and tools for version control',
            'YAML 정의가 model, instructions, tool을 담아 version 관리를 지원합니다',
          ),
        },
        {
          img: 39,
          caption: l(
            'Agent Builder generates run_agent.py with authentication and streaming included',
            'Agent Builder가 인증과 streaming이 포함된 run_agent.py를 생성합니다',
          ),
        },
        {
          img: 38,
          caption: l(
            'Details page shows Entra identity, Responses endpoint and Teams channel',
            'Details 화면에서 Entra identity, Responses endpoint, Teams channel을 확인합니다',
          ),
        },
      ],
    },
    {
      id: 'm2-s2',
      title: l('Tools & Knowledge', 'Tool 및 Knowledge'),
      tagline: l(
        'Give agents the ability to act and the facts to answer correctly.',
        'agent가 실행할 능력과 정확히 답할 근거를 갖추게 합니다.',
      ),
      deliverable: l(
        'Agents wired to function, OpenAPI and MCP tools plus Foundry IQ knowledge bases, with cited answers grounded in organizational data.',
        'function, OpenAPI, MCP tool과 Foundry IQ knowledge base에 연결되어 조직 데이터 기반의 인용 답변을 제공하는 agent.',
      ),
      icon: 'wrench',
      keyPoints: [
        {
          icon: 'cube',
          title: l('Built-in tools first', '기본 제공 tool 우선'),
          text: l(
            'Code Interpreter, File Search, Azure AI Search and web search work out of the box; add custom tools only for business logic.',
            'Code Interpreter, File Search, Azure AI Search, web search는 바로 사용할 수 있으며, 업무 로직이 필요할 때만 custom tool을 추가합니다.',
          ),
        },
        {
          icon: 'plug',
          title: l('MCP and toolboxes', 'MCP와 toolbox'),
          text: l(
            'Model Context Protocol gives agents one standard way to discover and call tools. Toolboxes bundle tools behind a single governed MCP endpoint.',
            'Model Context Protocol은 tool 검색과 호출을 위한 표준 방식입니다. Toolbox는 여러 tool을 하나의 관리형 MCP endpoint로 묶습니다.',
          ),
        },
        {
          icon: 'database',
          title: l('Foundry IQ for grounding', 'Foundry IQ 기반 grounding'),
          text: l(
            'Foundry IQ builds on Azure AI Search so several agents share one knowledge base instead of rebuilding RAG pipelines per agent.',
            'Foundry IQ는 Azure AI Search 위에 구축되어 여러 agent가 하나의 knowledge base를 공유하므로, agent마다 RAG pipeline을 다시 만들 필요가 없습니다.',
          ),
          key: true,
        },
        {
          icon: 'pen',
          title: l('Specific instructions win', '구체적인 instructions'),
          text: l(
            'Tell the agent when to search, how to cite and what to say when the knowledge base has no answer.',
            'agent에게 언제 검색하고, 어떻게 인용하며, knowledge base에 답이 없을 때 무엇을 말할지 명시합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'compare',
          title: l('Choose the right tool type', '적합한 tool 유형 선택'),
          columns: [
            { label: l('Function tool', 'Function tool'), sub: l('FunctionTool', 'FunctionTool') },
            { label: l('Azure Function', 'Azure Function'), sub: l('AzureFunctionTool', 'AzureFunctionTool') },
            { label: l('OpenAPI', 'OpenAPI'), sub: l('OpenApiTool', 'OpenApiTool') },
            { label: l('MCP', 'MCP'), sub: l('MCPTool', 'MCPTool'), key: true },
          ],
          rows: [
            {
              label: l('Logic runs in', '로직 실행 위치'),
              cells: [
                l('Your application', 'application 코드'),
                l('Azure Functions', 'Azure Functions'),
                l('Any REST API', '모든 REST API'),
                l('MCP server', 'MCP server'),
              ],
            },
            {
              label: l('Defined by', '정의 방식'),
              cells: [
                l('JSON parameter schema', 'JSON parameter schema'),
                l('Queue input and output', 'Queue 입력 및 출력'),
                l('OpenAPI 3.0 spec', 'OpenAPI 3.0 spec'),
                l('Tools the server exposes', 'server가 노출하는 tool'),
              ],
            },
            {
              label: l('Discovery', '검색 방식'),
              cells: [
                l('Declared in code', '코드에서 선언'),
                l('Declared in code', '코드에서 선언'),
                l('Read from the spec', 'spec에서 읽음'),
                l('Dynamic at runtime', '런타임에 동적 검색'),
              ],
            },
            {
              label: l('Best for', '적합한 용도'),
              cells: [
                l('Custom app logic', '맞춤 app 로직'),
                l('Event-driven back ends', '이벤트 기반 back end'),
                l('Existing REST APIs', '기존 REST API'),
                l('Shared, reusable tools', '공유 가능한 재사용 tool'),
              ],
            },
          ],
          caption: l(
            'All four attach to the agent definition the same way, through its tools list.',
            '네 가지 모두 agent 정의의 tools 목록에 같은 방식으로 연결됩니다.',
          ),
        },
        {
          kind: 'layers',
          title: l('Microsoft IQ family', 'Microsoft IQ 제품군'),
          layers: [
            {
              label: l('Microsoft IQ', 'Microsoft IQ'),
              sub: l('The intelligence platform for agents', 'agent를 위한 인텔리전스 platform'),
              icon: 'brain',
            },
            {
              label: l('Foundry IQ', 'Foundry IQ'),
              sub: l('Shared knowledge bases on Azure AI Search', 'Azure AI Search 기반 공유 knowledge base'),
              icon: 'database',
              key: true,
            },
            {
              label: l('Web IQ', 'Web IQ'),
              sub: l('Grounding from web, news, image and video search', 'web, news, image, video 검색 기반 grounding'),
              icon: 'globe',
            },
            {
              label: l('Work IQ', 'Work IQ'),
              sub: l('Microsoft 365 emails, meetings, documents, Teams messages and people', 'Microsoft 365의 email, meeting, 문서, Teams 메시지, 사람 정보'),
              icon: 'mail',
            },
            {
              label: l('Fabric IQ', 'Fabric IQ'),
              sub: l('Business context from organizational data in Microsoft Fabric', 'Microsoft Fabric 조직 데이터의 비즈니스 context'),
              icon: 'chart',
            },
          ],
          caption: l(
            'Each IQ is attached as a tool, so the same agent pattern reaches every data source.',
            '각 IQ는 tool로 연결되므로 동일한 agent 패턴으로 모든 데이터 소스에 접근합니다.',
          ),
        },
      ],
      decision: {
        title: l('Share knowledge, not pipelines', 'Pipeline이 아닌 knowledge 공유'),
        text: l(
          'Connect agents to one shared Foundry IQ knowledge base instead of per-agent RAG pipelines, so every agent cites the same sources.',
          'agent별 RAG pipeline 대신 하나의 공유 Foundry IQ knowledge base에 연결하는 구성을 권장합니다. 모든 agent가 같은 출처를 인용합니다.',
        ),
      },
      evidence: [
        {
          img: 37,
          caption: l(
            'Tool Catalog lists toolboxes and remote MCP servers ready to connect',
            'Tool Catalog에 연결 가능한 toolbox와 remote MCP server가 나열됩니다',
          ),
        },
        {
          img: 40,
          caption: l(
            'FunctionTool schema registered with the agent through PromptAgentDefinition',
            'PromptAgentDefinition으로 agent에 등록하는 FunctionTool schema',
          ),
        },
        {
          img: 43,
          caption: l(
            'Retrieval instructions and a knowledge tool attach to the hr-assistant agent',
            'retrieval instructions와 knowledge tool이 hr-assistant agent에 연결됩니다',
          ),
        },
        {
          img: 48,
          caption: l(
            'Trace lists each response, mcp_list_tools and Web IQ tool call',
            'Trace에 각 response, mcp_list_tools, Web IQ tool 호출이 표시됩니다',
          ),
        },
      ],
      limitation: l(
        'Web IQ resources require a pay-as-you-go subscription; credit-only subscriptions are not eligible.',
        'Web IQ resource는 종량제(pay-as-you-go) subscription에서만 생성할 수 있으며, 크레딧 전용 subscription은 지원되지 않습니다.',
      ),
    },
    {
      id: 'm2-s3',
      title: l('Integrate & Automate', '통합 및 자동화'),
      tagline: l(
        'Meet users in Microsoft 365 and automate multi-step processes.',
        'Microsoft 365에서 사용자를 만나고 다단계 업무를 자동화합니다.',
      ),
      deliverable: l(
        'An agent published to Teams and Microsoft 365 Copilot, plus a workflow that routes work by classification and confidence.',
        'Teams와 Microsoft 365 Copilot에 게시된 agent, 그리고 분류와 confidence로 업무를 라우팅하는 workflow.',
      ),
      icon: 'plug',
      keyPoints: [
        {
          icon: 'rocket',
          title: l('Publish from Foundry', 'Foundry에서 바로 게시'),
          text: l(
            'The Publish menu creates the Azure Bot Service, Entra app registration and Microsoft 365 package, then distributes the agent to Teams and Copilot.',
            'Publish 메뉴가 Azure Bot Service, Entra app 등록, Microsoft 365 package를 만들고 agent를 Teams와 Copilot에 배포합니다.',
          ),
        },
        {
          icon: 'team',
          title: l('Pilot, then organization', 'Pilot 후 organization 확대'),
          text: l(
            'The Just you scope is available immediately for pilots; People in your organization requires Microsoft 365 admin approval for production.',
            'Just you 범위는 pilot용으로 즉시 사용할 수 있고, People in your organization 범위는 production용으로 Microsoft 365 admin 승인이 필요합니다.',
          ),
        },
        {
          icon: 'branch',
          title: l('Confidence-based routing', 'Confidence 기반 라우팅'),
          text: l(
            'A classifier agent returns a confidence score; an If/Else node auto-routes high-confidence results and sends the rest to a separate path.',
            'classifier agent가 confidence score를 반환하고, If/Else node가 높은 confidence는 자동 처리하며 나머지는 별도 경로로 보냅니다.',
          ),
          key: true,
        },
        {
          icon: 'code',
          title: l('Visual first, code ready', 'Visual 설계, 코드 확장'),
          text: l(
            'Define a workflow visually, then invoke it from an app through the Responses API; the same pattern is expressed with Microsoft Agent Framework.',
            'workflow를 visual로 정의한 뒤 Responses API로 app에서 호출합니다. 같은 패턴을 Microsoft Agent Framework로도 구현할 수 있습니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'flow',
          title: l('Publish to Teams and Copilot', 'Teams와 Copilot에 게시'),
          direction: 'row',
          nodes: [
            { label: l('Foundry agent', 'Foundry agent'), sub: l('Tested in playground', 'playground에서 테스트'), icon: 'bot' },
            { label: l('Publish', 'Publish'), sub: l('Direct or download', 'Direct 또는 download'), icon: 'rocket' },
            { label: l('Azure Bot Service', 'Azure Bot Service'), sub: l('With Entra app registration', 'Entra app 등록 포함'), icon: 'cloud' },
            { label: l('Package', 'Package'), sub: l('Microsoft 365 app package', 'Microsoft 365 app package'), icon: 'folder' },
            { label: l('Teams and Copilot', 'Teams와 Copilot'), sub: l('Just you or organization', 'Just you 또는 organization'), icon: 'team', key: true },
          ],
          caption: l(
            'Advanced path: Agents Toolkit adds a proxy app between Microsoft 365 and the Foundry agent for full control of the integration layer.',
            '고급 경로: Agents Toolkit의 proxy app을 Microsoft 365와 Foundry agent 사이에 두어 integration layer를 직접 제어합니다.',
          ),
        },
        {
          kind: 'steps',
          title: l('Confidence-routed workflow', 'Confidence 기반 workflow'),
          steps: [
            { label: l('Start', 'Start'), text: l('A message enters the workflow', 'message가 workflow에 진입'), icon: 'play' },
            { label: l('Invoke agent', 'Invoke agent'), text: l('Returns structured JSON with a confidence score', 'confidence score가 담긴 structured JSON 반환'), icon: 'bot' },
            { label: l('Set variable', 'Set variable'), text: l('Power Fx stores the result in a Local variable', 'Power Fx로 결과를 Local variable에 저장'), icon: 'calculator' },
            { label: l('If/Else', 'If/Else'), text: l('confidence > 0.6', 'confidence > 0.6'), icon: 'branch' },
            { label: l('Route', 'Route'), text: l('High confidence continues; low confidence takes its own branch', '높은 confidence는 계속 진행, 낮은 confidence는 별도 branch로 이동'), icon: 'check' },
          ],
          caption: l(
            'Power Fx works like Excel formulas, so conditions need no complex code.',
            'Power Fx는 Excel 수식과 유사해 복잡한 코드 없이 조건을 작성합니다.',
          ),
        },
      ],
      decision: {
        title: l('Route by confidence threshold', 'Confidence threshold로 라우팅'),
        text: l(
          'Tune the threshold to your risk tolerance: higher automates only confident results and adds review, lower automates more but raises misclassification risk.',
          'threshold는 위험 허용도에 맞게 조정합니다. 높이면 확신도 높은 결과만 자동 처리하고 review가 늘며, 낮추면 자동 처리가 늘지만 오분류 위험이 커집니다.',
        ),
      },
      evidence: [
        {
          img: 50,
          caption: l(
            'Publish options choose Just you or People in your organization',
            'Publish options에서 Just you 또는 People in your organization을 선택합니다',
          ),
        },
        {
          img: 52,
          caption: l(
            'Download and customize yields a teams-app.zip package for Teams admin upload',
            'Download and customize가 Teams admin 업로드용 teams-app.zip을 만듭니다',
          ),
        },
        {
          img: 55,
          caption: l(
            'If/Else node ends the loop or sends it back to the agents',
            'If/Else node가 loop를 종료하거나 agent로 되돌려 보냅니다',
          ),
        },
        {
          img: 59,
          caption: l(
            'Condition on the confidence score separates low-confidence classifications',
            'confidence score 조건이 낮은 confidence 분류를 구분합니다',
          ),
        },
      ],
      limitation: l(
        'Copilot store listing was not verified with a personal account, and the Workflows (Preview) UI announces its retirement on December 1, 2026, so the same pattern is also built with Microsoft Agent Framework.',
        'Copilot store 노출은 개인 계정으로 확인하지 못했으며, Foundry Workflows (Preview) UI는 2026년 12월 1일 종료를 공지하므로 같은 패턴을 Microsoft Agent Framework로도 구성합니다.',
      ),
    },
    {
      id: 'm2-s4',
      title: l('Orchestrate Agent Teams', 'Agent 팀 오케스트레이션'),
      tagline: l(
        'Coordinate specialist agents with the pattern the task demands.',
        '작업에 맞는 패턴으로 전문 agent를 조율합니다.',
      ),
      deliverable: l(
        'A multi-agent design using Microsoft Agent Framework executors and edges, with the orchestration pattern matched to the workload.',
        'Microsoft Agent Framework의 executor와 edge로 구성하고 workload에 맞는 orchestration 패턴을 적용한 multi-agent 설계.',
      ),
      icon: 'team',
      keyPoints: [
        {
          icon: 'layers',
          title: l('One framework, any service', '하나의 framework, 다양한 service'),
          text: l(
            'Successor to Semantic Kernel and AutoGen, one Agent base class supports function calling, structured output and streaming across model services.',
            'Semantic Kernel과 AutoGen의 차세대 framework로, 하나의 Agent base class가 model service 전반에서 function calling, structured output, streaming을 지원합니다.',
          ),
        },
        {
          icon: 'branch',
          title: l('Executors and edges', 'Executor와 edge'),
          text: l(
            'Executors do the work; direct, conditional, switch-case, fan-out and fan-in edges define how messages flow, with built-in events for observability.',
            'Executor가 작업을 수행하고, direct, conditional, switch-case, fan-out, fan-in edge가 message 흐름을 정의합니다. 내장 event로 observability를 확보합니다.',
          ),
        },
        {
          icon: 'chats',
          title: l('Five orchestration patterns', '다섯 가지 orchestration 패턴'),
          text: l(
            'Concurrent, sequential, handoff, group chat and Magentic cover parallel analysis, pipelines, escalation, brainstorming and open-ended planning.',
            'Concurrent, sequential, handoff, group chat, Magentic이 각각 병렬 분석, pipeline, escalation, brainstorming, 개방형 계획 문제를 다룹니다.',
          ),
          key: true,
        },
        {
          icon: 'link',
          title: l('A2A for interoperability', 'A2A 상호운용성'),
          text: l(
            'The A2A protocol standardizes how separately built and deployed agents communicate; orchestration decides who works when, A2A defines how they talk.',
            'A2A protocol은 독립적으로 개발·배포된 agent가 표준 방식으로 통신하게 합니다. orchestration은 협업 순서를, A2A는 통신 규약을 정합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'tiles',
          title: l('Five orchestration patterns', '다섯 가지 orchestration 패턴'),
          columns: 3,
          items: [
            {
              icon: 'layers',
              label: l('Concurrent', 'Concurrent'),
              sub: l('One task broadcast to many agents, results collected', '하나의 작업을 여러 agent에 동시에 전달하고 결과를 수집'),
              tag: l('Parallel', '병렬'),
            },
            {
              icon: 'list',
              label: l('Sequential', 'Sequential'),
              sub: l('Fixed step-by-step pipeline', '고정된 순서의 단계별 pipeline'),
              tag: l('Pipeline', 'Pipeline'),
            },
            {
              icon: 'repeat',
              label: l('Handoff', 'Handoff'),
              sub: l('Control passes between agents with shared context', '공유 context로 agent 간 제어권 전달'),
              tag: l('Escalation', 'Escalation'),
            },
            {
              icon: 'chats',
              label: l('Group chat', 'Group chat'),
              sub: l('A chat manager picks the next speaker', 'chat manager가 다음 발언자를 선택'),
              tag: l('Brainstorm', 'Brainstorm'),
            },
            {
              icon: 'target',
              label: l('Magentic', 'Magentic'),
              sub: l('A manager plans and delegates to specialists', 'manager가 계획을 세우고 전문 agent에 위임'),
              tag: l('Open-ended', '개방형'),
            },
          ],
        },
        {
          kind: 'compare',
          title: l('Handoff vs Magentic', 'Handoff와 Magentic 비교'),
          columns: [
            { label: l('Handoff', 'Handoff'), key: true },
            { label: l('Magentic', 'Magentic') },
          ],
          rows: [
            {
              label: l('Control', '제어 방식'),
              cells: [l('Agent hands off to agent', 'agent가 다른 agent에 인계'), l('Manager plans and delegates', 'manager가 계획 수립 및 위임')],
            },
            {
              label: l('Next step chosen by', '다음 단계 결정'),
              cells: [l('The current agent', '현재 agent'), l('The orchestrator', 'orchestrator')],
            },
            {
              label: l('Tracks', '추적 대상'),
              cells: [l('Context carried across agents', 'agent 간 이어지는 context'), l('Task and progress ledgers', 'Task ledger와 progress ledger')],
            },
            {
              label: l('Recovery', '복구 방식'),
              cells: [l('Complete or hand off again', '완료하거나 다시 인계'), l('Re-plan when progress stalls', '진행이 멈추면 재계획')],
            },
            {
              label: l('Best for', '적합한 용도'),
              cells: [l('Support triage, escalation', '지원 triage, escalation'), l('Complex, open-ended problems', '복잡하고 개방형인 문제')],
            },
          ],
        },
      ],
      decision: {
        title: l('Pick the simplest pattern', '가장 단순한 패턴 선택'),
        text: l(
          'Choose the simplest pattern: sequential or handoff for predictable routing and escalation, Magentic only when a manager must plan and re-plan open-ended work.',
          '가장 단순한 패턴을 권장합니다. 예측 가능한 라우팅과 escalation에는 sequential 또는 handoff를, manager가 개방형 작업을 계획하고 재계획해야 할 때만 Magentic을 사용합니다.',
        ),
      },
      evidence: [
        {
          img: 60,
          caption: l(
            'Agent Framework declares name, instructions and tools in one constructor',
            'Agent Framework가 name, instructions, tool을 하나의 constructor에 선언합니다',
          ),
        },
        {
          img: 61,
          caption: l(
            'Built-in workflow events expose each executor start and completion',
            '내장 workflow event가 executor의 시작과 완료를 노출합니다',
          ),
        },
        {
          img: 62,
          caption: l(
            'Handoff routes a general agent to technical or billing specialists',
            'Handoff가 일반 agent를 기술 또는 billing 전문 agent로 연결합니다',
          ),
        },
        {
          img: 63,
          caption: l(
            'Magentic orchestrator keeps task and progress ledgers and re-plans on stalls',
            'Magentic orchestrator가 task와 progress ledger를 유지하고 정체 시 재계획합니다',
          ),
        },
      ],
    },
  ],
}
