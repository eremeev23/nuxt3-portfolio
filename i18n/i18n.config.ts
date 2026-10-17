import { datetimeFormats } from './utils/datetimeFormats'
import { pluralRules } from './utils/pluralRules'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'ru',
  missingWarn: false,
  fallbackWarn: false,
  pluralRules,
  datetimeFormats: {
    en: datetimeFormats,
    ru: datetimeFormats,
  },
}))
