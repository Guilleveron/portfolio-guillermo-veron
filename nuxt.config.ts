// https://nuxt.com/docs/api/configuration/nuxt-config
// Con dominio propio: NUXT_PUBLIC_SITE_URL=https://midominio.com y NUXT_APP_BASE_URL=/
const SITE_URL = (process.env.NUXT_PUBLIC_SITE_URL || 'https://guilleveron.com').replace(/\/$/, '')

export default defineNuxtConfig({
  devtools: { enabled: false },

  vite: {
    optimizeDeps: { include: ['pdfjs-dist'] },
  },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1F3A5F' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      // URL del Worker/función que hace de proxy del asistente IA (ver worker/README.md).
      assistantUrl: process.env.NUXT_PUBLIC_ASSISTANT_URL || '',
    },
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  css: ['@/assets/css/main.css'],

  components: true,

  modules: ['@nuxtjs/i18n', '@nuxt/fonts'],

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
      { name: 'Source Serif 4', provider: 'google', weights: [500, 600], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
    ],
    defaults: { weights: [400, 500, 600], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
  },

  i18n: {
    locales: [
      { code: 'es', language: 'es-PY', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    lazy: true,
    defaultLocale: 'es',
    strategy: 'no_prefix',
    // Español fijo por defecto (sin detección del navegador, que re-renderiza la página al hidratar).
    // La elección del visitante se guarda en localStorage (ver LanguageSwitcher y app.vue).
    detectBrowserLanguage: false,
    baseUrl: SITE_URL,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: 3200,
  },

  compatibilityDate: '2025-10-01',
})
