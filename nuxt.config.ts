// @ts-ignore
import tailwindConfig from "./tailwind.config.ts";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Maksim Eremeev',
      meta: [
        { name: 'description', content: 'Maksim Eremeev`s site. Frontend developer.' }
      ],
      htmlAttrs: {
        lang: 'eng',
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

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icons',
    '@nuxt/image-edge',
    'nuxt-swiper'
  ],

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
