import type { ContentBundle, LocaleCode } from '#shared/types'

import { header as headerEn } from './en/header'
import { mainPage as mainPageEn } from './en/mainPage'
import { projects as projectsEn } from './en/projects'
import { contacts as contactsEn } from './en/contacts'

import { header as headerRu } from './ru/header'
import { mainPage as mainPageRu } from './ru/mainPage'
import { projects as projectsRu } from './ru/projects'
import { contacts as contactsRu } from './ru/contacts'

const en: ContentBundle = {
  header: headerEn,
  mainPage: mainPageEn,
  projects: projectsEn,
  contacts: contactsEn,
}

/*
 * cs, sr, es, de, pt, it and fr have UI strings (i18n/locales) but no translated copy yet, so
 * they serve the English content until their own trees are written.
 */
export const content: Record<LocaleCode, ContentBundle> = {
  en,
  cs: en,
  sr: en,
  es: en,
  de: en,
  pt: en,
  it: en,
  fr: en,
  ru: {
    header: headerRu,
    mainPage: mainPageRu,
    projects: projectsRu,
    contacts: contactsRu,
  },
}
