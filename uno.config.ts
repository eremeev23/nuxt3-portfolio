import { defineConfig, presetWind4, transformerDirectives } from 'unocss'

const brand = {
  orange: {
    DEFAULT: '#c2410c', // solid accent: buttons, marquee, active nav, CTA band
    bright: '#e8722c', // accent as text/marks on the dark theme
  },
  light: {
    DEFAULT: '#f4f2ec', // light page
    raise: '#e6e3da', // light chips & cards
    sunk: '#e2e0db', // light placeholder / hatch
  },
  dark: {
    DEFAULT: '#171a1f', // dark page, and the light theme's ink
    deep: '#101216', // deepest ink, reserved for full-bleed panels
    raise: '#191c21', // dark chips & cards
    sunk: '#14171b', // dark placeholder / hatch
    line: '#22262c', // dark inner rules
  },
  bone: '#f2f3f4', // dark primary text
}

/* [light, dark] for every themed token. Edit the pairs here - nowhere else. */
const semantic = {
  bg: [brand.light.DEFAULT, brand.dark.DEFAULT],
  surface: [brand.light.raise, brand.dark.raise],
  sunken: [brand.light.sunk, brand.dark.sunk],
  primary: [brand.dark.DEFAULT, brand.bone], // body text
  secondary: ['#3f434a', '#c3c8ce'], // supporting text
  muted: ['#6b6f76', '#9aa1aa'], // captions, disabled
  line: [brand.dark.DEFAULT, brand.dark.line], // rules and borders
  frame: [brand.dark.DEFAULT, '#000000'], // outer frame of raised blocks
  accent: [brand.orange.DEFAULT, brand.orange.bright],
} satisfies Record<string, [light: string, dark: string]>

type SemanticName = keyof typeof semantic

const semanticNames = Object.keys(semantic) as SemanticName[]

/** `bg` -> `var(--bg)`, so the utility resolves at runtime rather than build time. */
const semanticColors = Object.fromEntries(
  semanticNames.map(name => [name, `var(--${name})`]),
) as Record<SemanticName, string>

function declarations(index: 0 | 1) {
  return semanticNames.map(name => `  --${name}: ${semantic[name][index]};`).join('\n')
}

export default defineConfig({
  presets: [
    presetWind4({
      // `.dark` is toggled on <body> by switchTheme() in TheHeader.vue.
      dark: 'class',
    }),
  ],

  // Enables `@apply` inside every <style> block.
  transformers: [transformerDirectives()],

  // The themed custom properties the semantic colours above point at.
  preflights: [
    {
      layer: 'preflights',
      getCSS: () =>
        `:root {\n${declarations(0)}\n}\n\n.dark {\n${declarations(1)}\n}`,
    },
  ],

  theme: {
    colors: { ...brand, ...semanticColors },

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
     * deliberate; Inter is the closest Cyrillic grotesk. Do not trim the stack
     * down to Archivo alone, or Russian text drops to a system font.
     * ---------------------------------------------------------------------
     */
    font: {
      display: "'Archivo', 'Inter', 'Segoe UI', system-ui, sans-serif",
      ui: "'JetBrains Mono', ui-monospace, monospace",
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

    // Hard offset shadows, no blur - they read as a second outline.
    shadow: {
      '2p': '2px 2px 0 var(--primary)',
      '4p': '4px 4px 0 var(--primary)',
      '8p': '8px 8px 0 var(--primary)',
    },

    animation: {
      keyframes: {
        blink: `{0%,100%{background-color:${brand.orange.DEFAULT}}50%{background-color:transparent}}`,
      },
      durations: { blink: '1s' },
      counts: { blink: 'infinite' },
    },
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
