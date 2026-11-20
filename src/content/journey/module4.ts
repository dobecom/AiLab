import { l, type Module } from './types'

export const module4: Module = {
  id: 'm4',
  number: 4,
  accent: 'amber',
  icon: 'eye',
  title: l('Vision & Documents', '비전 & 문서'),
  subtitle: l(
    'See, create, extract and mine knowledge from images, video and documents.',
    '이미지, 비디오, 문서를 보고, 만들고, 추출하고, 지식으로 전환합니다.',
  ),
  pitch: l(
    'Models read images, generate visuals and video, and turn documents into structured data. The results flow into a search index that grounds agents.',
    '모델이 이미지를 읽고, 이미지와 비디오를 생성하며, 문서를 구조화된 데이터로 변환합니다. 그 결과는 agent의 근거가 되는 search index로 이어집니다.',
  ),
  outcomes: [
    l(
      'Vision-enabled apps that answer questions about photos and scans.',
      '사진과 스캔 이미지에 대한 질문에 답하는 vision 지원 앱.',
    ),
    l(
      'Keyless image and video generation with gpt-image, FLUX and Sora 2.',
      'gpt-image, FLUX, Sora 2 기반의 keyless 이미지 및 비디오 생성.',
    ),
    l(
      'Schema-driven extraction that returns typed fields with confidence scores.',
      'confidence score와 함께 타입이 지정된 필드를 반환하는 schema 기반 추출.',
    ),
    l(
      'A searchable knowledge index that grounds agents with enriched content.',
      '보강된 콘텐츠로 agent의 근거가 되는 검색 가능한 knowledge index.',
    ),
  ],
  capabilities: [
    { icon: 'eye', label: l('Image understanding', '이미지 이해') },
    { icon: 'imageSparkle', label: l('Image generation', '이미지 생성') },
    { icon: 'video', label: l('Sora 2 video', 'Sora 2 비디오') },
    { icon: 'scan', label: l('Content Understanding', 'Content Understanding') },
    { icon: 'document', label: l('Document Intelligence', 'Document Intelligence') },
    { icon: 'search', label: l('AI Search', 'AI Search') },
  ],
  stages: [
    {
      id: 'm4-s1',
      title: l('See', '시각 이해'),
      tagline: l(
        'Give models eyes: send images and text in one request.',
        '이미지와 텍스트를 하나의 요청으로 전달해 모델이 보고 답하게 합니다.',
      ),
      deliverable: l(
        'A vision-enabled assistant that reads photos and answers questions about them in context.',
        '사진을 읽고 맥락에 맞게 질문에 답하는 vision 지원 assistant.',
      ),
      icon: 'camera',
      keyPoints: [
        {
          icon: 'eye',
          title: l('Images join the prompt', 'prompt에 이미지 포함'),
          text: l(
            'Multimodal models such as gpt-4.1, gpt-4.1-mini and Phi-4-multimodal-instruct accept image and text together in one request.',
            'gpt-4.1, gpt-4.1-mini, Phi-4-multimodal-instruct 같은 multimodal 모델은 이미지와 텍스트를 하나의 요청으로 받습니다.',
          ),
          key: true,
        },
        {
          icon: 'image',
          title: l('Three ways to send', '이미지 전달 방식 3가지'),
          text: l(
            'Pass a web image URL, load a local file, or encode the image as a Base64 data URL inside the request.',
            '웹 이미지 URL을 전달하거나, 로컬 파일을 불러오거나, 이미지를 Base64 data URL로 인코딩해 요청에 포함합니다.',
          ),
        },
        {
          icon: 'code',
          title: l('Two API shapes', '두 가지 API 형태'),
          text: l(
            'The Responses API uses input_image content; Chat Completions uses image_url content for models such as Phi-4-multimodal-instruct.',
            'Responses API는 input_image 콘텐츠를, Chat Completions는 Phi-4-multimodal-instruct 같은 모델에 image_url 콘텐츠를 사용합니다.',
          ),
        },
        {
          icon: 'settings',
          title: l('Role-scoped assistant', '역할이 정해진 assistant'),
          text: l(
            "A developer or system message fixes the assistant's role, such as a recipe planner, before the image is analyzed.",
            'developer 또는 system message로 레시피 플래너 같은 assistant의 역할을 먼저 정한 뒤 이미지를 분석합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'hub',
          title: l('Everything in one request', '하나의 요청에 모두 포함'),
          center: {
            label: l('Multimodal model', 'Multimodal 모델'),
            sub: l('Deployed in a Foundry project', 'Foundry project에 배포'),
            icon: 'brain',
            key: true,
          },
          nodes: [
            { label: l('Web image URL', '웹 이미지 URL'), icon: 'globe' },
            { label: l('Local image', '로컬 이미지'), icon: 'folder' },
            { label: l('Base64 data URL', 'Base64 data URL'), icon: 'code' },
            { label: l('Text question', '텍스트 질문'), icon: 'chat' },
            { label: l('Role instruction', '역할 지시문'), icon: 'pen' },
          ],
          caption: l(
            'One request carries image and text to a vision-capable deployment.',
            '하나의 요청으로 이미지와 텍스트를 vision 지원 deployment에 전달합니다.',
          ),
        },
        {
          kind: 'code',
          title: l('Image prompt with the Responses API', 'Responses API 이미지 prompt'),
          lang: 'python',
          code: [
            'response = client.responses.create(',
            '    model="gpt-4.1",',
            '    input=[',
            '        {"role": "developer",',
            '         "content": "You are an AI assistant for chefs planning recipes."},',
            '        {"role": "user", "content": [',
            '            {"type": "input_text",',
            '             "text": "Suggest desserts I can make with this."},',
            '            {"type": "input_image", "image_url": data_url},',
            '        ]},',
            '    ],',
            ')',
          ].join('\n'),
          highlight: [6, 8],
          caption: l(
            'The image travels as a content part next to the text question.',
            '이미지는 텍스트 질문과 나란히 content part로 전달됩니다.',
          ),
        },
      ],
      decision: {
        title: l('Encode local images as data URLs', '로컬 이미지는 data URL로 인코딩'),
        text: l(
          'Base64 data URLs send private local images without public hosting; reserve web URLs for assets that are already public.',
          'Base64 data URL은 공개 호스팅 없이 비공개 로컬 이미지를 전달합니다. 웹 URL은 이미 공개된 자산에만 사용합니다.',
        ),
      },
    },
    {
      id: 'm4-s2',
      title: l('Create', '생성'),
      tagline: l(
        'Generate images and video from prompts without storing a key.',
        'key를 저장하지 않고 prompt로 이미지와 비디오를 생성합니다.',
      ),
      deliverable: l(
        'Keyless image and video generation clients, ready to embed in an application.',
        '애플리케이션에 바로 넣을 수 있는 keyless 이미지 및 비디오 생성 client.',
      ),
      icon: 'imageSparkle',
      keyPoints: [
        {
          icon: 'key',
          title: l('Keyless by design', 'Keyless 설계'),
          text: l(
            'DefaultAzureCredential with a bearer token provider authenticates the OpenAI client, so no API key is stored for image or video calls.',
            'DefaultAzureCredential과 bearer token provider로 OpenAI client를 인증하므로 이미지와 비디오 호출에 API key를 저장하지 않습니다.',
          ),
          key: true,
        },
        {
          icon: 'image',
          title: l('Image model choice', '이미지 모델 선택'),
          text: l(
            'The gpt-image-1 series and Black Forest Labs FLUX models generate images from text prompts through Foundry deployments.',
            'gpt-image-1 시리즈와 Black Forest Labs FLUX 모델이 Foundry deployment를 통해 텍스트 prompt로 이미지를 생성합니다.',
          ),
        },
        {
          icon: 'video',
          title: l('Sora 2 video', 'Sora 2 비디오'),
          text: l(
            'Sora 2 turns text or an image into video, with remix, audio generation, two orientations and 4, 8 or 12 second durations.',
            'Sora 2는 텍스트 또는 이미지를 비디오로 만들며 remix, audio generation, 두 가지 방향, 4/8/12초 길이를 지원합니다.',
          ),
        },
        {
          icon: 'pen',
          title: l('Storyboard prompting', '스토리보드형 prompt'),
          text: l(
            'Describe camera framing, subject, action, lighting and style; express timing as beats, such as four steps, a pause, then a curtain pull.',
            '카메라 프레이밍, 피사체, 동작, 조명, 스타일을 묘사하고 타이밍은 네 걸음, 멈춤, 커튼 당기기처럼 박자로 표현합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'flow',
          title: l('Keyless generation path', 'Keyless 생성 경로'),
          nodes: [
            {
              label: l('DefaultAzureCredential', 'DefaultAzureCredential'),
              sub: l('Entra ID identity, no stored key', 'Entra ID 인증, 저장된 key 없음'),
              icon: 'key',
            },
            {
              label: l('Token provider', 'Token provider'),
              sub: l('get_bearer_token_provider', 'get_bearer_token_provider'),
              icon: 'lock',
              key: true,
            },
            {
              label: l('OpenAI client', 'OpenAI client'),
              sub: l('base_url = endpoint', 'base_url = endpoint'),
              icon: 'plug',
            },
            {
              label: l('Generate', '생성 요청'),
              sub: l('Image or video request', '이미지 또는 비디오 요청'),
              icon: 'imageSparkle',
            },
            {
              label: l('Result', '결과'),
              sub: l('Poll video job until completed', '비디오 job은 completed까지 polling'),
              icon: 'play',
            },
          ],
          caption: l(
            'The same credential pattern serves image and video clients.',
            '동일한 credential 패턴이 이미지와 비디오 client에 모두 적용됩니다.',
          ),
        },
        {
          kind: 'tiles',
          title: l('Sora 2 at a glance', 'Sora 2 한눈에 보기'),
          columns: 3,
          items: [
            {
              icon: 'video',
              label: l('Text to video', '텍스트에서 비디오로'),
              sub: l('A prompt becomes a clip', 'prompt가 clip이 됩니다'),
              tag: l('sora-2, sora-2-pro', 'sora-2, sora-2-pro'),
              key: true,
            },
            {
              icon: 'image',
              label: l('Image to video', '이미지에서 비디오로'),
              sub: l('input_reference: JPEG, PNG, WebP', 'input_reference: JPEG, PNG, WebP'),
            },
            {
              icon: 'repeat',
              label: l('Remix', 'Remix'),
              sub: l('Adjust an existing video by ID', '기존 비디오를 ID로 수정'),
            },
            {
              icon: 'speaker',
              label: l('Audio generation', 'Audio generation'),
              sub: l('Sound generated with the clip', 'clip과 함께 소리 생성'),
            },
            {
              icon: 'camera',
              label: l('Two orientations', '두 가지 방향'),
              sub: l('Portrait 720x1280, landscape 1280x720', '세로 720x1280, 가로 1280x720'),
            },
            {
              icon: 'timer',
              label: l('Variable duration', '길이 선택'),
              sub: l('4, 8 or 12 seconds', '4, 8, 12초'),
            },
          ],
        },
      ],
      decision: {
        title: l('Token provider over API keys', 'API key 대신 token provider'),
        text: l(
          'Use a token provider for generation clients: credentials stay out of code, and the same pattern covers image and video.',
          '생성 client에는 token provider를 사용합니다. credential이 코드에 남지 않고 같은 패턴이 이미지와 비디오에 적용됩니다.',
        ),
      },
      evidence: [
        {
          img: 76,
          caption: l(
            'Credential and token provider replace a stored key in client setup',
            'client 설정에서 저장된 key 대신 credential과 token provider 사용',
          ),
        },
        {
          img: 77,
          caption: l(
            'Recorded sora-2 playground run: 16:9, 4 seconds, text prompt',
            'sora-2 playground 기록: 16:9, 4초, 텍스트 prompt',
          ),
        },
      ],
    },
    {
      id: 'm4-s3',
      title: l('Understand & Extract', '이해 및 추출'),
      tagline: l(
        'Turn invoices, images and slides into structured fields with confidence.',
        '청구서, 이미지, 슬라이드를 confidence가 포함된 구조화 필드로 변환합니다.',
      ),
      deliverable: l(
        'A schema-driven extraction service that returns typed fields with confidence scores for invoices, slides and images.',
        '청구서, 슬라이드, 이미지에서 confidence score가 포함된 타입 지정 필드를 반환하는 schema 기반 추출 서비스.',
      ),
      icon: 'scan',
      keyPoints: [
        {
          icon: 'scan',
          title: l('Schema-driven extraction', 'Schema 기반 추출'),
          text: l(
            'An analyzer turns documents, images, audio and video into structured fields with confidence scores and source grounding.',
            'analyzer가 문서, 이미지, 오디오, 비디오를 confidence score와 source grounding이 포함된 구조화 필드로 변환합니다.',
          ),
          key: true,
        },
        {
          icon: 'wand',
          title: l('Three field methods', '세 가지 필드 method'),
          text: l(
            'Each field uses extract for visible text, classify for a fixed set of labels, or generate for a written description.',
            '각 필드는 보이는 텍스트는 extract, 정해진 label 분류는 classify, 서술형 설명은 generate를 사용합니다.',
          ),
        },
        {
          icon: 'gauge',
          title: l('Confidence per field', '필드별 confidence'),
          text: l(
            'Scores run from 0 to 1 per field. In the recorded invoice test, InvoiceNumber scored 98.30%; above 0.9 supports automation.',
            '필드마다 0에서 1 사이의 score를 제공합니다. 기록된 청구서 테스트에서 InvoiceNumber는 98.30%였고, 0.9 이상은 자동 처리에 적합합니다.',
          ),
        },
        {
          icon: 'layers',
          title: l('Prebuilt first, custom next', 'Prebuilt 우선, custom 확장'),
          text: l(
            'Prebuilt analyzers and models cover invoices, receipts, identity and tax documents; custom analyzers and models handle business-specific layouts.',
            'Prebuilt analyzer와 모델이 청구서, 영수증, 신분증, 세금 문서를 다루고, custom analyzer와 모델이 업무별 레이아웃을 처리합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'flow',
          title: l('Content Understanding analyzer', 'Content Understanding analyzer'),
          nodes: [
            {
              label: l('Input', '입력'),
              sub: l('Document, image, audio, video', '문서, 이미지, 오디오, 비디오'),
              icon: 'document',
            },
            {
              label: l('Analyzer', 'Analyzer'),
              sub: l('Prebuilt or custom', 'Prebuilt 또는 custom'),
              icon: 'settings',
            },
            {
              label: l('Content extraction', '콘텐츠 추출'),
              sub: l('OCR, layout, transcription', 'OCR, layout, 음성 전사'),
              icon: 'text',
            },
            {
              label: l('Field methods', '필드 method'),
              sub: l('extract, classify, generate', 'extract, classify, generate'),
              icon: 'wand',
              key: true,
            },
            {
              label: l('Structured output', '구조화 출력'),
              sub: l('JSON fields with confidence', 'confidence가 포함된 JSON 필드'),
              icon: 'table',
            },
          ],
          caption: l(
            'Recorded invoice test: InvoiceNumber 98.30%, CustomerName 97.10%, PostalCode 95.60% confidence.',
            '기록된 청구서 테스트: InvoiceNumber 98.30%, CustomerName 97.10%, PostalCode 95.60% confidence.',
          ),
        },
        {
          kind: 'compare',
          title: l('Content Understanding vs Document Intelligence', 'Content Understanding vs Document Intelligence'),
          columns: [
            { label: l('Content Understanding', 'Content Understanding'), sub: l('Multimodal analyzers', 'Multimodal analyzer'), key: true },
            { label: l('Document Intelligence', 'Document Intelligence'), sub: l('Document models', '문서 모델') },
          ],
          rows: [
            {
              label: l('Inputs', '입력'),
              cells: [
                l('Documents, images, audio, video', '문서, 이미지, 오디오, 비디오'),
                l('PDF, images, Office files', 'PDF, 이미지, Office 파일'),
              ],
            },
            {
              label: l('Extraction', '추출 방식'),
              cells: [
                l('Schema with extract, classify, generate', 'extract, classify, generate schema'),
                l('OCR and deep-learning models', 'OCR과 딥러닝 모델'),
              ],
            },
            {
              label: l('Customization', 'Customization'),
              cells: [
                l('No-code studio, custom analyzers', 'No-code studio, custom analyzer'),
                l('Label sample forms in Studio', 'Studio에서 샘플 양식 labeling'),
              ],
            },
            {
              label: l('Prebuilt', 'Prebuilt'),
              cells: [
                l('Layout, invoice, identity, call center', 'Layout, invoice, identity, call center'),
                l('Invoice, receipt, ID, US tax, mortgage', 'Invoice, receipt, ID, US tax, mortgage'),
              ],
            },
            {
              label: l('Output', '출력'),
              cells: [
                l('Markdown for search, JSON for automation', '검색용 Markdown, 자동화용 JSON'),
                l('Structured JSON with relationships', '관계를 보존한 구조화 JSON'),
              ],
            },
            {
              label: l('Best fit', '적합한 용도'),
              cells: [
                l('Mixed media, search, RAG, agents', '혼합 미디어, 검색, RAG, agent'),
                l('Form and document extraction', '양식 및 문서 추출'),
              ],
            },
          ],
        },
      ],
      decision: {
        title: l('Choose by content scope', '콘텐츠 범위로 선택'),
        text: l(
          'Pick Content Understanding for mixed media and RAG-ready output; pick Document Intelligence for form-centric extraction with trained prebuilt or custom models.',
          '혼합 미디어와 RAG에 적합한 출력에는 Content Understanding을, 양식 중심 추출에는 학습된 prebuilt 또는 custom 모델을 쓰는 Document Intelligence를 선택합니다.',
        ),
      },
      evidence: [
        {
          img: 78,
          caption: l(
            'Field schema assigns extract, classify or generate to each image field',
            'Field schema가 각 이미지 필드에 extract, classify, generate를 지정',
          ),
        },
        {
          img: 81,
          caption: l(
            'Invoice schema defines typed fields, each with an Extract method',
            '청구서 schema가 필드별 타입과 Extract method를 정의',
          ),
        },
        {
          img: 82,
          caption: l(
            'Each extracted field carries a confidence score, such as 98.30%',
            '추출된 각 필드에 98.30% 같은 confidence score가 표시됨',
          ),
        },
        {
          img: 83,
          caption: l(
            'Document Intelligence Studio offers task-specific prebuilt models for common documents',
            'Document Intelligence Studio가 일반 문서용 prebuilt 모델을 제공',
          ),
        },
      ],
    },
    {
      id: 'm4-s4',
      title: l('Mine Knowledge', '지식 마이닝'),
      tagline: l(
        'Index files, enrich them with AI skills and ground agents.',
        '파일을 index하고 AI skill로 보강해 agent의 근거 지식으로 활용합니다.',
      ),
      deliverable: l(
        'A searchable knowledge index built from raw files, enriched by AI skills and ready to ground agents.',
        'AI skill로 보강한 원본 파일 기반의 검색 가능한 knowledge index로, agent의 근거 지식으로 바로 사용합니다.',
      ),
      icon: 'search',
      keyPoints: [
        {
          icon: 'database',
          title: l('Knowledge from raw files', '원본 파일에서 지식으로'),
          text: l(
            'Azure AI Search extracts, enriches and indexes content from many data sources, so people and agents can find it.',
            'Azure AI Search는 다양한 data source의 콘텐츠를 추출, 보강, index하여 사람과 agent가 찾을 수 있게 합니다.',
          ),
          key: true,
        },
        {
          icon: 'wand',
          title: l('AI skills enrich', 'AI skill로 보강'),
          text: l(
            'Skills such as language detection, OCR and merge add fields the source documents never contained, written into an enrichment document.',
            'language detection, OCR, merge 같은 skill이 원본에 없던 필드를 만들어 enrichment document에 추가합니다.',
          ),
        },
        {
          icon: 'repeat',
          title: l('Automated ingestion', '자동화된 수집'),
          text: l(
            'Document cracking extracts content and metadata, then the indexer runs Extract, Enrich, Map and Index; direct API upload also works.',
            'Document cracking이 콘텐츠와 metadata를 추출하고, indexer가 Extract, Enrich, Map and Index를 수행합니다. API 직접 업로드도 가능합니다.',
          ),
        },
        {
          icon: 'list',
          title: l('Filter, facet, sort', 'Filter, facet, sort'),
          text: l(
            'Simple and full query syntax, filters, facets and sorting narrow results, and the same index grounds RAG answers.',
            'Simple/Full query 구문, filter, facet, 정렬로 결과를 좁히고, 같은 index가 RAG 답변의 근거가 됩니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'flow',
          title: l('Knowledge mining pipeline', 'Knowledge mining pipeline'),
          direction: 'col',
          nodes: [
            {
              label: l('Data source', 'Data source'),
              sub: l('Blob Storage, databases', 'Blob Storage, database'),
              icon: 'database',
            },
            {
              label: l('Indexer', 'Indexer'),
              sub: l('Crack, extract, map', 'Crack, extract, map'),
              icon: 'repeat',
            },
            {
              label: l('Enrichment', 'Enrichment'),
              sub: l('Skillset of AI skills', 'AI skill로 구성된 skillset'),
              icon: 'wand',
              key: true,
            },
            {
              label: l('Index', 'Index'),
              sub: l('Searchable fields', '검색 가능한 필드'),
              icon: 'table',
            },
            {
              label: l('Search', 'Search'),
              sub: l('Query, filter, facet', 'Query, filter, facet'),
              icon: 'search',
            },
            {
              label: l('Agent', 'Agent'),
              sub: l('Grounded answers with RAG', 'RAG 기반 근거 답변'),
              icon: 'bot',
            },
          ],
        },
        {
          kind: 'steps',
          title: l('Query processing', 'Query 처리'),
          steps: [
            {
              label: l('Query parsing', 'Query parsing'),
              text: l('Reads the search text and syntax', '검색어와 구문을 해석'),
              icon: 'code',
            },
            {
              label: l('Lexical analysis', 'Lexical analysis'),
              text: l('Refines the search terms', '검색어를 정제'),
              icon: 'text',
            },
            {
              label: l('Document retrieval', 'Document retrieval'),
              text: l('Finds matching documents', '일치하는 문서를 조회'),
              icon: 'search',
            },
            {
              label: l('Scoring', 'Scoring'),
              text: l('Ranks results by relevance', '관련도 순으로 결과를 정렬'),
              icon: 'gauge',
            },
          ],
          caption: l(
            'Filters, facets and sorting then narrow and order the ranked results.',
            '이후 filter, facet, 정렬로 순위가 매겨진 결과를 좁히고 정돈합니다.',
          ),
        },
      ],
      decision: {
        title: l('Enrich at indexing time', 'Indexing 시점에 보강'),
        text: l(
          'Run OCR and language detection in the skillset so queries and agents read prepared fields instead of repeating extraction on every request.',
          'OCR과 language detection을 skillset에서 실행하면 query와 agent가 요청마다 추출을 반복하지 않고 준비된 필드를 읽습니다.',
        ),
      },
      evidence: [
        {
          img: 84,
          caption: l(
            'Pipeline summary maps Data Source to Search with each component role',
            'Data Source부터 Search까지 구성 요소별 역할을 정리한 pipeline 요약',
          ),
        },
      ],
    },
  ],
}
