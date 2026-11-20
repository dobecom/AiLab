import { l, type Module } from './types'

export const module3: Module = {
  id: 'm3',
  number: 3,
  accent: 'teal',
  icon: 'chats',
  title: l('Language & Voice', '언어와 음성'),
  subtitle: l(
    'Text analysis, speech and translation delivered as Foundry tools and agents.',
    'Foundry tool과 agent로 제공하는 텍스트 분석, 음성, 번역.',
  ),
  pitch: l(
    'Give applications and agents the ability to read, listen, speak and translate. Language and speech capabilities plug in as SDK clients or as MCP tools governed by approval gates.',
    'application과 agent가 텍스트를 읽고, 듣고, 말하고, 번역하도록 만듭니다. Language와 speech 기능은 SDK client 또는 승인 gate가 적용된 MCP tool로 연결됩니다.',
  ),
  outcomes: [
    l(
      'Extract language, entities and PII from text with an SDK client or an approval-gated MCP tool.',
      'SDK client 또는 승인 gate가 적용된 MCP tool로 텍스트에서 언어, entity, PII를 추출합니다.',
    ),
    l(
      'Transcribe and synthesize speech through dedicated models, the Speech SDK or a Speech MCP tool.',
      '전용 model, Speech SDK, Speech MCP tool로 음성을 받아쓰고 합성합니다.',
    ),
    l(
      'Run real-time voice conversations over a single Voice Live streaming session.',
      '하나의 Voice Live streaming session으로 실시간 음성 대화를 운영합니다.',
    ),
    l(
      'Translate text and speech into multiple target languages from one Foundry resource.',
      '하나의 Foundry resource에서 텍스트와 음성을 여러 대상 언어로 번역합니다.',
    ),
  ],
  capabilities: [
    { icon: 'text', label: l('Text analysis', '텍스트 분석') },
    { icon: 'mic', label: l('Speech to text', 'Speech to text') },
    { icon: 'speaker', label: l('Text to speech', 'Text to speech') },
    { icon: 'flash', label: l('Voice Live', 'Voice Live') },
    { icon: 'translate', label: l('Translation', '번역') },
    { icon: 'plug', label: l('MCP tools', 'MCP tool') },
  ],
  stages: [
    {
      id: 'm3-s1',
      title: l('Understand text', '텍스트 이해'),
      tagline: l(
        'Extract language, entities and sensitive data from unstructured text.',
        '비정형 텍스트에서 언어, entity, 민감 정보를 추출합니다.',
      ),
      deliverable: l(
        'A text-analysis service that detects language, entities and PII, callable from code or as a governed agent tool.',
        '언어, entity, PII를 탐지하며 코드 또는 통제된 agent tool로 호출할 수 있는 텍스트 분석 서비스.',
      ),
      icon: 'text',
      keyPoints: [
        {
          icon: 'search',
          title: l('Three core extractions', '세 가지 핵심 추출'),
          text: l(
            'Azure Language detects the language, recognizes entities such as people and places, and finds PII like account numbers and emails.',
            'Azure Language는 언어를 감지하고, 사람과 장소 같은 entity를 인식하며, 계좌번호와 이메일 같은 PII를 찾아냅니다.',
          ),
        },
        {
          icon: 'code',
          title: l('Keyless SDK client', 'Keyless SDK client'),
          text: l(
            'TextAnalyticsClient connects to the Foundry endpoint with DefaultAzureCredential, then calls detect_language, recognize_entities and recognize_pii_entities.',
            'TextAnalyticsClient는 DefaultAzureCredential로 Foundry endpoint에 연결하고 detect_language, recognize_entities, recognize_pii_entities를 호출합니다.',
          ),
        },
        {
          icon: 'plug',
          title: l('Language as MCP tool', 'MCP tool로서의 Language'),
          text: l(
            'The catalog lists Azure Language as a remote MCP tool in Preview, so agents call it without custom code.',
            'Catalog는 Azure Language를 Preview 단계의 remote MCP tool로 제공하며, agent가 별도 코드 없이 호출합니다.',
          ),
        },
        {
          icon: 'lock',
          title: l('Human approval gate', '사람의 승인 gate'),
          text: l(
            'require_approval="always" pauses every tool call until a person approves it, keeping sensitive text and PII under human control.',
            'require_approval="always"는 모든 tool 호출을 사람이 승인할 때까지 보류하여 민감한 텍스트와 PII를 사람의 통제 아래 둡니다.',
          ),
          key: true,
        },
      ],
      visuals: [
        {
          kind: 'hub',
          title: l('Azure Language capabilities', 'Azure Language 기능'),
          center: {
            label: l('Azure Language', 'Azure Language'),
            sub: l('in Foundry Tools', 'Foundry Tools 제공'),
            icon: 'text',
          },
          nodes: [
            {
              label: l('Language detection', '언어 감지'),
              sub: l('Which language the text is written in', '텍스트가 어떤 언어로 작성되었는지 판별'),
              icon: 'globe',
            },
            {
              label: l('Named entities', '명명된 entity'),
              sub: l('People, places, organizations', '사람, 장소, 조직'),
              icon: 'search',
            },
            {
              label: l('PII detection', 'PII 탐지'),
              sub: l('Names, accounts, emails, phones', '이름, 계좌, 이메일, 전화번호'),
              icon: 'shield',
              key: true,
            },
            {
              label: l('Sentiment', '감성 분석'),
              sub: l('Positive, neutral or negative tone', '긍정, 중립, 부정 어조'),
              icon: 'emoji',
            },
            {
              label: l('Key phrases', '핵심 구문'),
              sub: l('Main topics at a glance', '핵심 주제를 한눈에'),
              icon: 'list',
            },
            {
              label: l('Summarization', '요약'),
              sub: l('Condensed meaning of long text', '긴 텍스트의 핵심 의미 압축'),
              icon: 'doc',
            },
          ],
          caption: l(
            'Detection, entities and PII are covered in this build; other capabilities follow the same pattern.',
            '이번 구현은 언어 감지, entity, PII를 다루며, 나머지 기능도 같은 방식으로 확장됩니다.',
          ),
        },
        {
          kind: 'flow',
          title: l('Text analysis through an MCP tool', 'MCP tool을 통한 텍스트 분석'),
          nodes: [
            {
              label: l('User prompt', '사용자 prompt'),
              sub: l('Text to analyze', '분석할 텍스트'),
              icon: 'chat',
            },
            {
              label: l('Agent', 'Agent'),
              sub: l('Instructions: use the Azure Language tool', 'Azure Language tool 사용 instructions'),
              icon: 'bot',
            },
            {
              label: l('Approval gate', '승인 gate'),
              sub: l('require_approval="always"', 'require_approval="always"'),
              icon: 'lock',
              key: true,
            },
            {
              label: l('Azure Language', 'Azure Language'),
              sub: l('Remote MCP tool', 'Remote MCP tool'),
              icon: 'plug',
            },
            {
              label: l('Insights', 'Insight'),
              sub: l('Language, entities, PII', '언어, entity, PII'),
              icon: 'sparkle',
            },
          ],
          caption: l(
            'Every tool call waits for a person before text reaches the service.',
            '모든 tool 호출은 텍스트가 서비스에 전달되기 전에 사람의 승인을 기다립니다.',
          ),
        },
      ],
      decision: {
        title: l('Gate tools that read text', '텍스트를 읽는 tool에 승인 적용'),
        text: l(
          'Keep require_approval="always" for tools that read customer text; relax it per tool only after reviewing data handling.',
          '고객 텍스트를 읽는 tool에는 require_approval="always"를 유지하고, data handling을 검토한 뒤에만 tool별로 완화합니다.',
        ),
      },
      evidence: [
        {
          img: 64,
          caption: l('One document in, language, entities and PII out', '문서 하나에서 언어, entity, PII를 추출하는 구조'),
        },
        {
          img: 65,
          caption: l(
            'Foundry tool catalog lists Azure Language as a remote MCP tool',
            'Foundry tool catalog에서 Azure Language를 remote MCP tool로 확인',
          ),
        },
        {
          img: 66,
          caption: l(
            'Client call selects the agent by name through agent_reference',
            'Client 호출은 agent_reference로 agent를 이름으로 지정',
          ),
        },
        {
          img: 67,
          caption: l('MCPTool definition sets require_approval to always', 'MCPTool 정의에서 require_approval을 always로 설정'),
        },
      ],
    },
    {
      id: 'm3-s2',
      title: l('Speak & listen', '듣기와 말하기'),
      tagline: l(
        'Give apps ears and a voice with dedicated speech models.',
        '전용 speech model로 앱에 듣는 능력과 목소리를 부여합니다.',
      ),
      deliverable: l(
        'Speech-to-text and text-to-speech capabilities that apps call through an SDK or agents call as a Speech MCP tool.',
        'SDK로 앱이 호출하거나 Speech MCP tool로 agent가 호출하는 speech-to-text 및 text-to-speech 기능.',
      ),
      icon: 'mic',
      keyPoints: [
        {
          icon: 'mic',
          title: l('Dedicated speech models', '전용 speech model'),
          text: l(
            'Transcription models include gpt-4o-transcribe and its mini and diarize (speaker label) variants; synthesis uses gpt-4o-tts or gpt-4o-mini-tts.',
            'Transcription model은 gpt-4o-transcribe와 mini, diarize(화자 구분) 변형이 있고, 음성 합성은 gpt-4o-tts 또는 gpt-4o-mini-tts를 사용합니다.',
          ),
        },
        {
          icon: 'speaker',
          title: l('Steerable voices', '제어 가능한 음성'),
          text: l(
            'Speech synthesis takes a voice and a style instruction such as an upbeat tone; the Speech SDK adds output format and SSML control.',
            '음성 합성은 voice와 활기찬 어조 같은 style instruction을 받으며, Speech SDK는 출력 format과 SSML 제어를 추가합니다.',
          ),
        },
        {
          icon: 'plug',
          title: l('Speech as agent tool', 'agent tool로서의 Speech'),
          text: l(
            'A hosted Speech MCP server (Preview) lets agents transcribe and synthesize on request, using Azure Blob Storage for audio files.',
            '호스팅되는 Speech MCP server(Preview)는 agent가 요청 시 받아쓰기와 음성 합성을 수행하게 하며, 오디오 파일에는 Azure Blob Storage를 사용합니다.',
          ),
          key: true,
        },
        {
          icon: 'key',
          title: l('Scoped audio access', '범위가 제한된 오디오 접근'),
          text: l(
            'The MCP connection needs the project key as bearer plus a SAS URL granting read, add, create, write and list on the blob container.',
            'MCP 연결에는 bearer로 쓰는 project key와, blob container에 read, add, create, write, list 권한을 부여한 SAS URL이 필요합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'compare',
          title: l('Speech capabilities side by side', '음성 기능 비교'),
          columns: [
            { label: l('Speech to text', 'Speech to text'), sub: l('Transcription', '받아쓰기') },
            { label: l('Text to speech', 'Text to speech'), sub: l('Synthesis', '합성') },
            { label: l('Speech translation', 'Speech translation'), sub: l('Spoken source, translated text', '음성 원본, 번역 텍스트') },
          ],
          rows: [
            {
              label: l('Input', '입력'),
              cells: [
                l('Microphone or audio file', '마이크 또는 오디오 파일'),
                l('Text or SSML markup', '텍스트 또는 SSML markup'),
                l('Microphone or audio file', '마이크 또는 오디오 파일'),
              ],
            },
            {
              label: l('Output', '출력'),
              cells: [
                l('Transcript with result reason', 'Reason이 포함된 transcript'),
                l('Audio stream or file', '오디오 stream 또는 파일'),
                l('Translated text per language', '언어별 번역 텍스트'),
              ],
            },
            {
              label: l('Built with', '구현 방식'),
              cells: [
                l('gpt-4o-transcribe or Speech SDK', 'gpt-4o-transcribe 또는 Speech SDK'),
                l('gpt-4o-tts or Speech SDK', 'gpt-4o-tts 또는 Speech SDK'),
                l('Speech SDK translation recognizer', 'Speech SDK translation recognizer'),
              ],
            },
            {
              label: l('Tuning', '조정 요소'),
              cells: [
                l('Phrase hints, profanity filter', 'Phrase hint, 비속어 필터'),
                l('Voice, format, tone, SSML', 'Voice, format, 어조, SSML'),
                l('Source and target languages', '원본 및 대상 언어'),
              ],
            },
          ],
        },
        {
          kind: 'steps',
          title: l('Speech SDK recognizer pipeline', 'Speech SDK recognizer pipeline'),
          steps: [
            {
              label: l('Create SpeechConfig', 'SpeechConfig 생성'),
              text: l('Resource endpoint and key', 'Resource endpoint와 key'),
              icon: 'settings',
            },
            {
              label: l('Pick AudioConfig', 'AudioConfig 선택'),
              text: l('Default microphone or an audio file', '기본 마이크 또는 오디오 파일'),
              icon: 'mic',
            },
            {
              label: l('Build SpeechRecognizer', 'SpeechRecognizer 생성'),
              text: l('Proxy client that joins both configs', '두 설정을 결합하는 proxy client'),
              icon: 'cube',
            },
            {
              label: l('Recognize once', '한 번 인식'),
              text: l('RecognizeOnceAsync listens for one utterance', 'RecognizeOnceAsync가 발화 하나를 인식'),
              icon: 'play',
            },
            {
              label: l('Check the reason', 'Reason 확인'),
              text: l('RecognizedSpeech, NoMatch or Cancelled', 'RecognizedSpeech, NoMatch, Cancelled'),
              icon: 'check',
            },
            {
              label: l('Use the transcript', 'Transcript 활용'),
              text: l('Text, duration and offset', 'Text, duration, offset'),
              icon: 'doc',
            },
          ],
        },
      ],
      decision: {
        title: l('SDK for control, MCP for agents', '제어는 SDK, agent는 MCP'),
        text: l(
          'Use the Speech SDK when the app owns audio capture and playback; use the Speech MCP tool when an agent should transcribe or synthesize on demand.',
          'app이 오디오 캡처와 재생을 직접 다룰 때는 Speech SDK를, agent가 필요할 때 받아쓰기나 음성 합성을 수행해야 할 때는 Speech MCP tool을 사용합니다.',
        ),
      },
      evidence: [
        {
          img: 68,
          caption: l(
            'Catalog search for speech returns transcription and synthesis models',
            'Catalog에서 speech를 검색하면 transcription과 synthesis model이 표시됨',
          ),
        },
        {
          img: 69,
          caption: l(
            'SDK flow: SpeechConfig and AudioConfig feed the recognizer',
            'SDK 흐름: SpeechConfig와 AudioConfig가 recognizer로 연결됨',
          ),
        },
        {
          img: 71,
          caption: l(
            'Speech MCP connection requires a bearer key and blob SAS URL',
            'Speech MCP 연결에는 bearer key와 blob SAS URL이 필요함',
          ),
        },
        {
          img: 72,
          caption: l(
            'Client call targets the Speech agent through agent_reference',
            'Client 호출이 agent_reference로 Speech agent를 지정함',
          ),
        },
      ],
    },
    {
      id: 'm3-s3',
      title: l('Real-time voice', '실시간 음성'),
      tagline: l(
        'Hold natural spoken conversations with an agent in real time.',
        'agent와 자연스러운 음성 대화를 실시간으로 나눕니다.',
      ),
      deliverable: l(
        'A voice agent experience where users speak naturally and hear spoken replies through one streaming session.',
        '사용자가 자연스럽게 말하고 음성 응답을 듣는 voice agent 경험을 하나의 streaming session으로 제공합니다.',
      ),
      icon: 'flash',
      keyPoints: [
        {
          icon: 'flash',
          title: l('One streaming session', '하나의 streaming session'),
          text: l(
            'Voice Live API combines speech recognition, a generative model and speech synthesis behind one WebSocket session of JSON events and audio chunks.',
            'Voice Live API는 음성 인식, 생성형 model, 음성 합성을 JSON event와 오디오 chunk로 이루어진 하나의 WebSocket session으로 묶습니다.',
          ),
          key: true,
        },
        {
          icon: 'chat',
          title: l('Natural turn-taking', '자연스러운 턴 전환'),
          text: l(
            'Semantic voice activity detection and end-of-utterance models decide when the user has finished, while noise suppression and echo cancellation clean the input.',
            'Semantic voice activity detection과 end-of-utterance model이 발화 종료를 판단하고, noise suppression과 echo cancellation이 입력 음성을 정리합니다.',
          ),
        },
        {
          icon: 'lock',
          title: l('Keyless connection', 'Keyless 연결'),
          text: l(
            'Entra ID is the recommended path: grant Cognitive Services User to the account or managed identity and send the token in the WebSocket request.',
            'Entra ID를 권장하며, 계정 또는 managed identity에 Cognitive Services User 역할을 부여하고 WebSocket 요청에 token을 전달합니다.',
          ),
        },
        {
          icon: 'flow',
          title: l('Event-driven protocol', 'Event 기반 protocol'),
          text: l(
            'Clients send session.update, input_audio_buffer.append and response.create; the server replies with session.updated, conversation.item.created and response.done.',
            'Client는 session.update, input_audio_buffer.append, response.create를 보내고, server는 session.updated, conversation.item.created, response.done으로 응답합니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'flow',
          title: l('Real-time voice pipeline', '실시간 음성 pipeline'),
          nodes: [
            {
              label: l('Microphone', '마이크'),
              sub: l('PCM16 or G.711 audio', 'PCM16 또는 G.711 오디오'),
              icon: 'mic',
            },
            {
              label: l('Voice Live session', 'Voice Live session'),
              sub: l('WebSocket with JSON events', 'JSON event 기반 WebSocket'),
              icon: 'flash',
              key: true,
            },
            {
              label: l('Audio cleanup', '오디오 정리'),
              sub: l('Noise, echo and turn detection', '노이즈, 에코, 턴 감지'),
              icon: 'settings',
            },
            {
              label: l('Model', 'Model'),
              sub: l('Reasons over the transcript', 'Transcript를 기반으로 응답 생성'),
              icon: 'brain',
            },
            {
              label: l('Speech out', '음성 출력'),
              sub: l('Neural voice or avatar', 'Neural voice 또는 avatar'),
              icon: 'speaker',
            },
          ],
          loop: l('Next turn', '다음 턴'),
          caption: l(
            'Audio streams in both directions over a single WebSocket connection.',
            '하나의 WebSocket 연결에서 오디오가 양방향으로 stream됩니다.',
          ),
        },
        {
          kind: 'code',
          title: l('Voice Live session settings', 'Voice Live session 설정'),
          lang: 'python',
          code: [
            'voice_live_config = {',
            '    "session": {',
            '        "voice": {"name": "en-US-Ava:DragonHDLatestNeural", "type": "azure-standard"},',
            '        "input_audio_transcription": {"model": "azure-speech"},',
            '        "turn_detection": {',
            '            "type": "azure_semantic_vad",',
            '            "end_of_utterance_detection": {"model": "semantic_detection_v1_multilingual"},',
            '        },',
            '        "input_audio_noise_reduction": {"type": "azure_deep_noise_suppression"},',
            '        "input_audio_echo_cancellation": {"type": "server_echo_cancellation"},',
            '    },',
            '}',
          ].join('\n'),
          highlight: [5, 8, 9],
          caption: l(
            'Turn detection, noise suppression and echo cancellation are declared as session settings.',
            'Turn detection, noise suppression, echo cancellation은 session 설정값으로 선언합니다.',
          ),
        },
      ],
      decision: {
        title: l('Keyless auth, explicit session', 'Keyless 인증과 명시적 session'),
        text: l(
          'Authenticate with Entra ID and define voice, turn detection and noise settings in the first session.update, so behavior is explicit and repeatable.',
          'Entra ID로 인증하고 첫 session.update에 voice, turn detection, noise 설정을 명시하여 동작을 분명하고 반복 가능하게 합니다.',
        ),
      },
      evidence: [
        {
          img: 74,
          caption: l(
            'Session settings define voice, turn detection, noise and echo handling',
            'Session 설정으로 voice, turn detection, noise, echo 처리를 정의함',
          ),
        },
      ],
      limitation: l(
        'Voice Live availability depends on region; it was not available in the Korea Central region used for this lab.',
        'Voice Live 제공 여부는 region에 따라 다르며, 이 lab에서 사용한 Korea Central region에서는 사용할 수 없었습니다.',
      ),
    },
    {
      id: 'm3-s4',
      title: l('Translate', '번역'),
      tagline: l(
        'Bridge languages in text and speech from one Foundry resource.',
        '하나의 Foundry resource로 텍스트와 음성의 언어 장벽을 해소합니다.',
      ),
      deliverable: l(
        'A multilingual path that translates text and spoken audio into every target language your audience needs.',
        '텍스트와 음성 오디오를 대상 청중이 필요로 하는 모든 언어로 번역하는 다국어 경로.',
      ),
      icon: 'translate',
      keyPoints: [
        {
          icon: 'text',
          title: l('Text translation client', 'Text translation client'),
          text: l(
            'TextTranslationClient connects to the Foundry resource endpoint with a key credential and translates text between languages.',
            'TextTranslationClient는 key credential로 Foundry resource endpoint에 연결해 언어 간 텍스트를 번역합니다.',
          ),
        },
        {
          icon: 'mic',
          title: l('Speech translation', 'Speech translation'),
          text: l(
            'SpeechTranslationConfig sets the spoken source language and one or more target languages; the recognizer returns each translation.',
            'SpeechTranslationConfig로 음성 원본 언어와 하나 이상의 대상 언어를 지정하면 recognizer가 각 번역 결과를 반환합니다.',
          ),
          key: true,
        },
        {
          icon: 'cloud',
          title: l('One Foundry endpoint', '하나의 Foundry endpoint'),
          text: l(
            'Text and speech translation both connect to the Foundry resource endpoint, keeping identity and governance in one place.',
            '텍스트 번역과 음성 번역 모두 Foundry resource endpoint에 연결되어 ID와 거버넌스를 한곳에서 관리합니다.',
          ),
        },
        {
          icon: 'search',
          title: l('Detect, then translate', '감지 후 번역'),
          text: l(
            'Language detection from the first stage can identify the source language before translation, so mixed-language input needs no manual tagging.',
            '첫 단계의 language detection이 번역 전에 원본 언어를 식별하므로, 여러 언어가 섞인 입력도 수동으로 태깅할 필요가 없습니다.',
          ),
        },
      ],
      visuals: [
        {
          kind: 'tiles',
          title: l('Translation options', '번역 옵션'),
          columns: 2,
          items: [
            {
              icon: 'text',
              label: l('Text translation', '텍스트 번역'),
              sub: l('TextTranslationClient on the Foundry endpoint', 'Foundry endpoint의 TextTranslationClient'),
              tag: l('Azure Translator', 'Azure Translator'),
            },
            {
              icon: 'document',
              label: l('Document translation', '문서 번역'),
              sub: l('Whole files with layout preserved', '레이아웃을 유지한 파일 단위 번역'),
              tag: l('Region dependent', 'Region별 제공'),
            },
            {
              icon: 'mic',
              label: l('Speech translation', '음성 번역'),
              sub: l('Spoken source, translated text per target', '음성 원본, 대상별 번역 텍스트'),
              tag: l('Speech SDK', 'Speech SDK'),
              key: true,
            },
            {
              icon: 'globe',
              label: l('Multi-target output', '다중 대상 언어'),
              sub: l('Add several target languages to one recognizer', '하나의 recognizer에 여러 대상 언어 추가'),
              tag: l('Speech SDK', 'Speech SDK'),
            },
          ],
        },
        {
          kind: 'code',
          title: l('Speech translation setup', '음성 번역 설정'),
          lang: 'python',
          code: [
            'translation_cfg = speech_sdk.translation.SpeechTranslationConfig(',
            '    subscription="<API-KEY>",',
            '    endpoint="https://<resource-name>.cognitiveservices.azure.com/",',
            ')',
            'translation_cfg.speech_recognition_language = "en-US"',
            'translation_cfg.add_target_language("fr")',
            'translation_cfg.add_target_language("ja")',
            '',
            'translator = speech_sdk.translation.TranslationRecognizer(',
            '    translation_config=translation_cfg,',
            '    audio_config=audio_cfg,',
            ')',
          ].join('\n'),
          highlight: [5, 6, 8],
          caption: l(
            'Each target language is one call; the recognizer returns all translations.',
            '대상 언어마다 한 번씩 추가하며, recognizer가 모든 번역을 반환합니다.',
          ),
        },
      ],
      decision: {
        title: l('One recognizer, many languages', '하나의 recognizer, 여러 언어'),
        text: l(
          'Add every target language to one SpeechTranslationConfig; a single TranslationRecognizer returns all translations, so audio capture runs once instead of once per language.',
          '모든 대상 언어를 하나의 SpeechTranslationConfig에 추가하면 TranslationRecognizer 하나가 모든 번역을 반환하므로, 오디오 캡처를 언어마다 반복하지 않고 한 번만 수행합니다.',
        ),
      },
      limitation: l(
        'Translator model and document translation deployment are not offered in the Korea Central region used for this lab; availability depends on region.',
        '이 lab에서 사용한 Korea Central region에서는 Translator model과 문서 번역 deployment를 제공하지 않으며, 제공 여부는 region에 따라 다릅니다.',
      ),
    },
  ],
}
