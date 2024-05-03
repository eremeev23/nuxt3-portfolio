export const PAGES_MAP = {
  'projects': {
    'en': '/projects',
    'ru': '/projects'
  },
  'contacts': {
    'en': '/contacts',
    'ru': '/contacts'
  },
} as Record<string, Record<string, string>>

export type PageMapKey = keyof typeof PAGES_MAP
