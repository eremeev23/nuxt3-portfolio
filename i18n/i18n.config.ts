import { datetimeFormats } from './utils/datetimeFormats'
import { pluralRules } from './utils/pluralRules'

export default defineI18nConfig(() => ({
  legacy: false,
  // ru and en fall back to ru (the default); the newer locales fall back to en.
  fallbackLocale: {
    cs: ['en'],
    sr: ['en'],
    es: ['en'],
    de: ['en'],
    pt: ['en'],
    it: ['en'],
    fr: ['en'],
    default: ['ru'],
  },
  missingWarn: false,
  fallbackWarn: false,
  pluralRules,
  datetimeFormats: {
    en: datetimeFormats,
    ru: datetimeFormats,
    cs: datetimeFormats,
    sr: datetimeFormats,
    es: datetimeFormats,
    de: datetimeFormats,
    pt: datetimeFormats,
    it: datetimeFormats,
    fr: datetimeFormats,
  },
}))
