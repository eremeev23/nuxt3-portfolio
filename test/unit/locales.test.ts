import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { LOCALE_CODES } from '../../shared/types'

const dir = new URL('../../i18n/locales/', import.meta.url)

function keys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') {
    return [prefix]
  }

  return Object.entries(value).flatMap(([key, nested]) => keys(nested, prefix ? `${prefix}.${key}` : key))
}

function load(code: string) {
  return JSON.parse(readFileSync(new URL(`${code}.json`, dir), 'utf-8'))
}

describe('locale messages', () => {
  it('has a messages file for every locale code and nothing else', () => {
    const files = readdirSync(dir).filter(file => file.endsWith('.json')).map(file => file.replace('.json', ''))

    expect(files.sort()).toEqual([...LOCALE_CODES].sort())
  })

  it.each(LOCALE_CODES.filter(code => code !== 'ru'))('%s has exactly the keys of ru', code => {
    expect(keys(load(code)).sort()).toEqual(keys(load('ru')).sort())
  })

  it.each(LOCALE_CODES)('%s names every locale in the switcher', code => {
    expect(Object.keys(load(code).locales).sort()).toEqual([...LOCALE_CODES].sort())
  })
})
