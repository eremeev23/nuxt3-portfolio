import { describe, expect, it } from 'vitest'
import { getRouteSuggestion } from './getRouteSuggestion'

const paths = ['/', '/projects', '/blog', '/contacts']
const locales = ['ru', 'en', 'de']

describe('getRouteSuggestion', () => {
  it.each([
    ['/blogs', '/blog'],
    ['/en/blogs', '/blog'],
    ['/de/project', '/projects'],
    ['/projetcs/foo', '/projects'],
    ['/contact?ref=mail', '/contacts'],
    ['/PROJECTS-old', '/projects'],
  ])('%s → %s', (wrong, expected) => {
    expect(getRouteSuggestion(wrong, paths, locales)).toBe(expected)
  })

  it.each([undefined, '', '/', '/en', '/en/', '/nothing-like-it'])('suggests nothing for %s', wrong => {
    expect(getRouteSuggestion(wrong, paths, locales)).toBeUndefined()
  })
})
