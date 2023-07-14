import { pwa } from './config/pwa'

const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://moovie-time-nuxt.vercel.app'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image-edge',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-swiper',
  ],

  experimental: {
    inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },

  css: [
    '@/assets/css/main.css',
    '@unocss/reset/tailwind.css',
  ],

  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
    '/api/**': { cors: true },
    '/api/tmdb/**': { swr: 3600 },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },

  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${apiBaseUrl}/ipx`,
        },
      },
    },
  },

  nitro: {
    routeRules: {
      '/**': { isr: false },
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
