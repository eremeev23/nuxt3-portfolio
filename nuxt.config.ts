export default defineNuxtConfig({

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@vercel/analytics/nuxt',
    '@vercel/speed-insights/nuxt',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt/module',
  ],

  /*
   * Feature code lives in app/libs/<Lib>/{components,composables,utils,functions,types}.
   * Components register by file name only (pathPrefix: false), so
   * libs/App/components/BrutButton/BrutButton.vue is <BrutButton>; names must stay unique
   * across libs. The default ~/components dir keeps Nuxt's path prefixing.
   */
  components: {
    dirs: [
      {
        path: '~/libs',
        pattern: '*/components/**/*.vue',
        pathPrefix: false,
      },
      '~/components',
    ],
  },

  /*
   * On top of Nuxt's defaults (app/composables, app/utils top level,
   * shared/utils, shared/types): nested dirs and every lib's
   * composables / utils / functions / types. Exported types are picked up too.
   */
  imports: {
    dirs: [
      'composables/**',
      'utils/**',
      'types/**',
      'libs/*/composables/**',
      'libs/*/utils/**',
      'libs/*/functions/**',
      'libs/*/types/**',
    ],
  },

  devtools: { enabled: true },

  /*
   * Route transition between pages; the CSS (incl. the reduced-motion fallback)
   * is in app/assets/css/transitions.css. out-in so the two pages never stack.
   */
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css', '~/assets/css/transitions.css', '~/assets/css/cursors.css'],

  // Single source of truth for the canonical origin; @nuxtjs/sitemap reads it from here.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
  },

  /*
   * Dark by default. classSuffix '' gives `.dark` / `.light` on <html>:
   * tokens.css keys the light theme off `.light`, presetWind4's `dark:` variant
   * off `.dark`.
   */
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'color-mode',
  },

  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
    },
  },
  compatibilityDate: '2026-08-26',

  /*
   * The component tests next to the code in app/ are covered by the generated
   * app config; the node-side tests are not, so the IDE would type them with
   * no Node types at all.
   */
  typescript: {
    strict: true,
    nodeTsConfig: {
      include: ['../test/unit/**/*', '../test/e2e/**/*', '../playwright.config.ts'],
      compilerOptions: {
        types: ['node'],
      },
    },
  },

  /*
   * @antfu/eslint-config owns the stylistic rules and formatting; the Nuxt
   * module only contributes its Nuxt-aware layers (see eslint.config.mjs).
   */
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  /*
   * Self-hosted at build time from Google Fonts. Declared explicitly (global)
   * rather than left to auto-detection, because the font-family declarations
   * live in UnoCSS-generated CSS. Archivo has no Cyrillic subset - see the
   * --f-display stack in app/assets/css/tokens.css for the Russian fallback.
   */
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
      styles: ['normal'],
    },
    families: [
      {
        name: 'Archivo',
        provider: 'google',
        weights: ['400 900'],
        global: true,
      },
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: ['400 800'],
        global: true,
      },
    ],
  },

  /*
   * Russian is the default and lives at the bare paths; English, Czech,
   * Serbian (Latin script), Spanish, German, Portuguese, Italian and French are
   * served under /en, /cs, /sr, /es, /de, /pt, /it, /fr.
   * baseUrl makes useLocaleHead() emit absolute hreflang/canonical links, and
   * @nuxtjs/sitemap reads the same locales to emit alternates.
   */
  i18n: {
    baseUrl:
      process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'cs', language: 'cs-CZ', name: 'Čeština', file: 'cs.json' },
      { code: 'sr', language: 'sr-Latn', name: 'Srpski', file: 'sr.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'pt', language: 'pt-PT', name: 'Português', file: 'pt.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'ru',
    },
  },

  image: {
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 100,
        },
      },
    },
  },

  sitemap: {
    sitemaps: true,
  },

  /*
   * The whole theme lives in uno.config.ts, which the module picks up on its
   * own. `wind3: false` is load-bearing: the module builds a preset list from
   * its own flags and *concatenates* it with the config file's, so leaving the
   * default on would register presetWind3 alongside presetWind4.
   */
  unocss: {
    wind3: false,
  },
})
