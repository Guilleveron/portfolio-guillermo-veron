import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    plugins: [svgLoader()],
  },

  // Global page headers
  app: {
    head: {
      title: 'Portfolio Guillermo Verón',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    },
  },

  // Global CSS
  css: ['@/assets/css/main.css'],

  // Auto import components
  components: true,

  // Modules
  modules: ['@nuxt/content', '@nuxtjs/svg-sprite', '@nuxt/image', '@nuxtjs/i18n'],

  // Content module configuration
  content: {
    highlight: {
      theme: 'dracula',
    },
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.json'
      },
    ],
    lazy: true,
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Development server configuration
  devServer: {
    host: '0.0.0.0',
    port: 3200,
  },

  compatibilityDate: '2024-01-08',
})
