export default defineNuxtConfig({

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@vercel/analytics/nuxt',
    '@vercel/speed-insights/nuxt',
    '@nuxt/test-utils/module',
  ],

  devtools: { enabled: true },

  css: ['~/assets/style/main.css'],

  // Single source of truth for the canonical origin; @nuxtjs/sitemap reads it from here.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
  },

  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
    },
  },
  compatibilityDate: '2026-08-26',

  typescript: {
    strict: true,
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
   * font stack in uno.config.ts for the Russian fallback.
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
   * Russian is the default and lives at the bare paths; English is served
   * under /en. baseUrl makes useLocaleHead() emit absolute hreflang/canonical
   * links, and @nuxtjs/sitemap reads the same locales to emit alternates.
   */
  i18n: {
    baseUrl:
      process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
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
