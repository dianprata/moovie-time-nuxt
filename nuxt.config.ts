import process from 'node:process'
import { pwa } from './config/pwa'

const isDev = process.env.NODE_ENV === 'development'

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
    typedPages: true,
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
  },

  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
  },

  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: '/api/ipx',
        },
      },
    },
  },

  nitro: {
    routeRules: {
      '/api/**': { cors: true },
      // '/api/tmdb/**': { swr: true },
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
