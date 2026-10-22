import { defineConfig, presetWind4, transformerDirectives } from 'unocss'

/*
 * Every colour resolves to a custom property from app/assets/css/tokens.css,
 * which holds the dark (:root) and light (.light) values. No hex values here.
 */
const colors = {
  bg: 'var(--bg)',
  fg: 'var(--fg)',
  line: 'var(--line)',
  muted: 'var(--muted)',
  text2: 'var(--text-2)',
  surface: 'var(--surface)',
  surface2: 'var(--surface-2)',
  ph: 'var(--ph)',
  wave: 'var(--wave)',
  accent: 'var(--accent)',
  onAccent: 'var(--on-accent)',
  // Small text that should read as accent; the accent in dark, fg on light's cream.
  accentText: 'var(--accent-text)',
}

export default defineConfig({
  presets: [
    presetWind4({
      // @nuxtjs/color-mode puts `.dark` / `.light` on <html>.
      dark: 'class',
    }),
  ],

  // Enables `@apply` inside every <style> block.
  transformers: [transformerDirectives()],

  theme: {
    colors,

    /*
     * ---------------------------------------------------------------------
     * TYPOGRAPHY
     *
     * Archivo carries everything editorial - names, headings, body - at 900
     * (large names and figures), 800 (small caps labels), 500 (lead
     * paragraphs), 400. JetBrains Mono carries the technical layer - nav,
     * stack tags, dates, captions, footer - at 800 (nav, badges), 500, 400.
     *
     * CAVEAT: Archivo ships Latin only, with no Cyrillic subset. Russian copy
     * falls through to the next family in the stack, so keep that fallback
     * deliberate; Inter is the closest Cyrillic grotesk. The stack itself is
     * --f-display in tokens.css; do not trim it down to Archivo alone, or
     * Russian text drops to a system font.
     * ---------------------------------------------------------------------
     */
    font: {
      display: 'var(--f-display)',
      mono: 'var(--f-mono)',
    },

    /*
     * Each token carries size, line height and tracking together, so `text-hero`
     * alone is 112px / 0.86 / -0.05em.
     *
     * Scale comes from the mockup, a 3x export of a ~1333px layout. Sizes and
     * the hero tracking are from the design spec; line heights and the caption
     * tracking were measured off the artboard.
     */
    text: {
      /*
       * The display sizes and the lead scale with the viewport (clamp, as in
       * the design): the max is the desktop size, so nothing changes from
       * ~1190px up; the min is the phone size.
       */
      'hero': {
        fontSize: 'clamp(3.5rem, 9.4vw, 7rem)', // 56 → 112px
        lineHeight: '0.86',
        letterSpacing: '-0.05em',
      },
      'title': {
        fontSize: 'clamp(2.5rem, 7.4vw, 5.5rem)', // 40 → 88px
        lineHeight: '0.9',
        letterSpacing: '-0.04em', // carried over from hero, not measured
      },
      'section': { fontSize: 'clamp(1.375rem, 1.2vw + 1.0625rem, 1.625rem)', lineHeight: '1.1' }, // 22 → 26px
      'lead': { fontSize: 'clamp(1rem, 1.6vw, 1.1875rem)', lineHeight: '1.4' }, // 16 → 19px
      'body': { fontSize: '0.9375rem', lineHeight: '1.6' },
      'body-sm': { fontSize: '0.875rem', lineHeight: '1.6' },
      'caption': {
        fontSize: '0.75rem',
        lineHeight: '1.4',
        letterSpacing: '0.04em',
      },
      'caption-sm': {
        fontSize: '0.6875rem',
        lineHeight: '1.4',
        letterSpacing: '0.04em',
      },
    },

    /*
     * ---------------------------------------------------------------------
     * LAYOUT
     * ---------------------------------------------------------------------
     */

    // Only lg and 2xl differ from the defaults.
    breakpoint: {
      'lg': '57.5rem', // 920px
      '2xl': '87.5rem', // 1400px
    },

    animation: {
      keyframes: {
        blink: '{0%,100%{background-color:var(--accent)}50%{background-color:transparent}}',
      },
      durations: { blink: '1s' },
      counts: { blink: 'infinite' },
    },
  },

  /*
   * Brutalist primitives: --b (3px) borders, no radius, no shadows, one accent.
   */
  shortcuts: {
    'brut': 'bw b-solid border-line',
    'h-page': 'font-display font-900 uppercase leading-[.85] tracking-[-.045em]',
    'label': 'font-mono font-800 text-[11px] tracking-[.08em] text-muted',
    'btn-acc': 'inline-flex items-center min-h-11 px-5 py-3.5 max-[520px]:px-4 max-[520px]:py-[13px] '
      + 'bg-accent text-onAccent font-mono font-800 text-xs',
    'stripe': 'brut bg-[repeating-linear-gradient(135deg,var(--surface)_0_8px,var(--surface-2)_8px_16px)]',
    // Page gutter from the design (.gut): 28px, 16px at ≤700px, never inside the notch.
    'gut': 'pl-[max(28px,env(safe-area-inset-left))] pr-[max(28px,env(safe-area-inset-right))] '
      + 'max-[700px]:pl-[max(16px,env(safe-area-inset-left))] max-[700px]:pr-[max(16px,env(safe-area-inset-right))]',
    // Header cells: full-height, split by a --b rule on the left; type comes from the header.
    'nav-cell': 'relative flex items-center px-5 py-4 b-0 bw-l b-solid b-line bg-transparent text-muted uppercase '
      + 'whitespace-nowrap no-underline cursor-pointer transition-colors hover:bg-surface hover:text-fg',
    'nav-hire': 'flex items-center px-[22px] py-4 b-0 bw-l b-solid b-line bg-accent text-white '
      + 'whitespace-nowrap no-underline hover:brightness-108',
  },

  /*
   * -------------------------------------------------------------------------
   * UTILITIES
   * One-offs with no theme namespace to hang off.
   * -------------------------------------------------------------------------
   */
  rules: [
    /*
     * Border width from the --b token (tokens.css): `bw` all sides, `bw-t` /
     * `-r` / `-b` / `-l` one side, `bw-x` / `bw-y` a pair. Every structural
     * border goes through it, so --b is the single place to change the weight.
     */
    [
      /^bw(?:-([trblxy]))?$/,
      ([, side]) => {
        const sides: Record<string, string[]> = {
          t: ['top'],
          r: ['right'],
          b: ['bottom'],
          l: ['left'],
          x: ['left', 'right'],
          y: ['top', 'bottom'],
        }

        if (!side) {
          return { 'border-width': 'var(--b)' }
        }

        return Object.fromEntries(sides[side]!.map(name => [`border-${name}-width`, 'var(--b)']))
      },
    ],
    [
      'grid-cols-custom',
      { 'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))' },
    ],
    [
      'grid-cols-custom-5',
      { 'grid-template-columns': 'repeat(auto-fill, minmax(300px, 1fr))' },
    ],
    ['list-square', { 'list-style-type': 'square' }],
    ['cursor-pointer', { cursor: 'var(--cursor-pointer)' }],
    ['cursor-open', { cursor: 'var(--cursor-open)' }],
    ['cursor-text', { cursor: 'var(--cursor-text)' }],
  ],
})
