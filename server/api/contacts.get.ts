import type { LocaleCode } from '#shared/types'
import { LOCALE_CODES } from '#shared/types'
import { content } from '../content'

/*
 * Contact links for the given locale (`?locale=en`); unknown or missing
 * locales get the default (ru).
 */
export default defineEventHandler(event => {
  const { locale } = getQuery(event)
  const code = LOCALE_CODES.includes(locale as LocaleCode) ? locale as LocaleCode : 'ru'

  return content[code].contacts
})
