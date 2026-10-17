import type { ContentBundle, LocaleCode } from '#shared/types'

import { header as headerEn } from './en/header'
import { mainPage as mainPageEn } from './en/mainPage'
import { projects as projectsEn } from './en/projects'
import { contacts as contactsEn } from './en/contacts'

import { header as headerRu } from './ru/header'
import { mainPage as mainPageRu } from './ru/mainPage'
import { projects as projectsRu } from './ru/projects'
import { contacts as contactsRu } from './ru/contacts'

export const content: Record<LocaleCode, ContentBundle> = {
  en: {
    header: headerEn,
    mainPage: mainPageEn,
    projects: projectsEn,
    contacts: contactsEn,
  },
  ru: {
    header: headerRu,
    mainPage: mainPageRu,
    projects: projectsRu,
    contacts: contactsRu,
  },
}
