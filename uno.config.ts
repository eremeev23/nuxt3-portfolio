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
  fill: 'var(--fill)',
  onFill: 'var(--on-fill)',
  navLine: 'var(--nav-line)',
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
      'hero': {
        fontSize: '7rem',
        lineHeight: '0.86',
        letterSpacing: '-0.05em',
      },
      'title': {
        fontSize: '5.5rem',
        lineHeight: '0.9',
        letterSpacing: '-0.04em', // carried over from hero, not measured
      },
      'section': { fontSize: '1.625rem', lineHeight: '1.1' },
      'lead': { fontSize: '1.1875rem', lineHeight: '1.5' },
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
   * Brutalist primitives: 2px borders, no radius, no shadows, one accent.
   */
  shortcuts: {
    'brut': 'border-2 border-line',
    'h-page': 'font-display font-900 uppercase leading-[.85] tracking-[-.045em]',
    'label': 'font-mono font-800 text-[11px] tracking-[.08em] text-muted',
    'btn-acc': 'inline-flex items-center min-h-11 px-5 py-3.5 bg-accent text-onAccent font-mono font-800 text-xs',
    'stripe': 'brut bg-[repeating-linear-gradient(135deg,var(--surface)_0_8px,var(--surface-2)_8px_16px)]',
  },

  /*
   * -------------------------------------------------------------------------
   * UTILITIES
   * One-offs with no theme namespace to hang off.
   * -------------------------------------------------------------------------
   */
  rules: [
    [
      'grid-cols-custom',
      { 'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))' },
    ],
    [
      'grid-cols-custom-5',
      { 'grid-template-columns': 'repeat(auto-fill, minmax(300px, 1fr))' },
    ],
    ['list-square', { 'list-style-type': 'square' }],
  ],
})
