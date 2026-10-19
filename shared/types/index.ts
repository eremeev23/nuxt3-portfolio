export const LOCALE_CODES = ['en', 'ru'] as const

export type LocaleCode = (typeof LOCALE_CODES)[number]

export type NavItem = {
  id: number
  text: string
  href: string
}

export type Icon = {
  name?: string
  icon: string
  href?: string
}

export type Skill = {
  title: string
  list: string[]
}

export type Project = {
  slug: string
  title: string
  stack: string[]
  image: string
  icon?: string
  caption: string
  link: string
  repository: string | null
  commerce: boolean
  slides: string[]
  description?: string
  designed: string
}

export type Career = {
  id: number
  title: string
  link: string
  from: string
  to: string
  role: string
  summary: string
  list?: string[]
  order: number
}

export type IPageBlock<T> = {
  title: string
  list: T[]
}

export type HeaderData = {
  navigation: NavItem[]
  icons: Icon[]
}

export type MainPageData = {
  title_text: string
  main_text: string
  photo: string
  skills: IPageBlock<Skill>
  facts: IPageBlock<string>
  career: IPageBlock<Career>
}

export type Contact = {
  title: string
  hrefPref: string
  value: string
  href: string
}

export type ContentBundle = {
  header: HeaderData
  mainPage: MainPageData
  projects: Project[]
  contacts: Contact[]
}

export type ContentSection = keyof ContentBundle
