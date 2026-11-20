export const ICON_NAMES = [
  'bot', 'brain', 'wrench', 'database', 'search', 'shield', 'mic', 'speaker', 'translate', 'eye',
  'image', 'video', 'document', 'chart', 'money', 'flash', 'code', 'cloud', 'lock', 'key',
  'flow', 'repeat', 'sparkle', 'gauge', 'person', 'globe', 'plug', 'check', 'warning', 'layers',
  'target', 'rocket', 'clock', 'chat', 'mail', 'org', 'team', 'scales', 'beaker', 'settings',
  'play', 'calculator', 'book', 'link', 'table', 'text', 'emoji', 'pen', 'apps', 'branch',
  'calendar', 'cube', 'doc', 'heart', 'home', 'open', 'ribbon', 'wand', 'stack', 'chats',
  'bug', 'folder', 'list', 'timer', 'trend', 'megaphone', 'clip', 'camera', 'imageSparkle',
  'info', 'alert', 'scan',
] as const

export type IconName = (typeof ICON_NAMES)[number]
