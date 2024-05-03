// import { defineI18nConfig } from "#i18n";
import { messages } from "~/configs/i18n/messages";
import { datetimeFormats } from "~/configs/i18n/utils/datetimeFormats";
import { pluralRules } from "~/configs/i18n/utils/pluralRules";

type DatetimeFormat = Record<string, Intl.DateTimeFormatOptions>

const DATETIME_FORMAT_BY_LANG = Object.keys(messages).reduce((agg, lang) => {
  agg[lang] = datetimeFormats

  return agg
}, {} as Record<string, DatetimeFormat>)

// export default defineI18nConfig(() => ({
//   legacy: false,
//   messages,
//   fallbackLocale: 'en',
//   locale: 'en',
//   pluralRules,
//   missingWarn: false,
//   datetimeFormats: DATETIME_FORMAT_BY_LANG,
// }))
