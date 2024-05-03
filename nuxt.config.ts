// @ts-ignore
import tailwindConfig from "./tailwind.config.ts";
// import { LOCALE_DEFAULT, LOCALES } from "./configs/i18n/messages";
// import { PAGES_MAP } from "./i18n.config"

export default defineNuxtConfig({
  // @ts-ignore
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Maksim Eremeev',
      meta: [
        { name: 'description', content: 'Maksim Eremeev`s site. Frontend developer. Front-end developer.' }
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
          rel: "stylesheet"
        }
      ]
    }
  },

  devtools: {
    enabled: false
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://eremeev-dev.vercel.app',
    }
  },

  sitemap: {
    siteUrl: 'https://eremeev-dev.vercel.app',
    sitemaps: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icons',
    '@nuxt/image-edge',
    'nuxt-swiper',
    'nuxt-simple-sitemap',
    // '@nuxtjs/i18n',
  ],
  // @ts-ignore
  // i18n: {
  //   strategy: 'no_prefix',
  //   skipSettingLocaleOnNavigate: true,
  //   defaultLocale: LOCALE_DEFAULT,
  //   detectBrowserLanguage: false,
  //   customRoutes: 'page',
  //   locales: LOCALES,
  // },

  tailwindcss: {
    cssPath: '~/assets/style/tailwind.css',
    configPath: "~/tailwind.config",
    exposeConfig: false,
    config: tailwindConfig,
    injectPosition: 0,
    viewer: true,
  },

  image: {
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 100,
          loading: 'lazy'
        }
      }
    }
  },

  swiper: {
    prefix: 'Swiper',
    modules: ['navigation', 'pagination', 'thumbs']
  }
})
