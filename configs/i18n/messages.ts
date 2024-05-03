import en from "./en.json";
import ru from "./ru.json";

interface LocaleObject extends Record<string, any> {
  code: 'en' | 'ru';
  name?: string;
  domain?: string;
  file?: string;
  isCatchallLocale?: boolean;
  iso?: string;
}

export const messages = {
  en,
  ru,
}

export const availableLocales = Object.keys(messages)

export const LOCALE_DEFAULT = 'ru-RU'

export const LOCALES: LocaleObject[] = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English',
    icon: 'emojione:flag-for-united-kingdom',
    dateFormat: 'MM/DD/YYYY',
    dateFormatBackend: 'MM/dd/yyyy HH:mm:ss',
  },
  {
    code: 'ru',
    iso: 'ru-RU',
    name: 'Русский',
    icon: 'emojione:flag-for-russia',
    dateFormat: 'DD.MM.YYYY',
    dateFormatBackend: 'dd.MM.yyyy HH:mm:ss',
  },
]
