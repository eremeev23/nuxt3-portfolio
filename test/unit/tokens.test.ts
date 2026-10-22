import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/*
 * Parses app/assets/css/tokens.css rather than duplicating its values, so a
 * token change that breaks contrast fails here instead of shipping.
 */

type Theme = 'dark' | 'light'

const css = readFileSync(new URL('../../app/assets/css/tokens.css', import.meta.url), 'utf8')

function block(selector: string) {
  const escaped = selector.replace(/[.:]/g, '\\$&')
  const match = css.match(new RegExp(`^${escaped}\\s*\\{([^}]*)\\}`, 'm'))
  if (!match) {
    throw new Error(`No ${selector} block in tokens.css`)
  }
  return Object.fromEntries(
    [...match[1]!.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)]
      .map(([, name, value]) => [name!, value!.toLowerCase()]),
  )
}

const themes: Record<Theme, Record<string, string>> = {
  dark: block(':root'),
  light: block('.light'),
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map(i => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/* WCAG AA: 4.5 for body text, 3 for large text (24px+, or 18.66px+ bold). */
const BODY = 4.5
const LARGE = 3

/* [foreground, background, minimum ratio, where the pair is used] */
const pairs: [string, string, number, string][] = [
  ['fg', 'bg', BODY, 'body text'],
  ['text-2', 'bg', BODY, 'supporting text'],
  ['muted', 'bg', BODY, 'labels, captions, line buttons'],
  ['accent-text', 'bg', BODY, 'small accent text: active chip / option, menu number and offers line'],
  ['fg', 'surface', BODY, 'text on cards'],
  ['text-2', 'surface', BODY, 'soft chip'],
  ['on-accent', 'accent', BODY, 'accent button, pill, marquee, CTA band, hire, logo "D", open burger'],
  ['accent', 'bg', LARGE, 'large accent text and marks: page title and dot, logo "EV", hero heading'],
  ['muted', 'surface', BODY, 'Stripe caption'],
  ['muted', 'surface-2', BODY, 'Stripe caption'],
]

describe('design tokens', () => {
  it('defines every colour token in both themes', () => {
    expect(Object.keys(themes.light).sort()).toEqual(Object.keys(themes.dark).sort())
    expect(Object.keys(themes.dark).length).toBeGreaterThan(0)
  })

  for (const theme of ['dark', 'light'] as const) {
    describe(`${theme} theme contrast`, () => {
      for (const [fg, bg, min, usage] of pairs) {
        it(`${fg} on ${bg} >= ${min} (${usage})`, () => {
          const t = themes[theme]
          expect(t[fg], `--${fg}`).toBeDefined()
          expect(t[bg], `--${bg}`).toBeDefined()
          expect(contrast(t[fg]!, t[bg]!)).toBeGreaterThanOrEqual(min)
        })
      }
    })
  }
})
