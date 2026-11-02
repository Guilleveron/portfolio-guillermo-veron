<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { site, locale } = useSiteContent()
const { public: { siteUrl } } = useRuntimeConfig()
const { withBase } = useBaseUrl()

// Evita el destello de tema incorrecto: aplica la clase .dark antes del primer render.
const themeScript = `(function(){try{var m=localStorage.getItem('theme-mode')||'system';var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'en' ? 'en' : 'es' },
  script: [{ innerHTML: themeScript, tagPosition: 'head' }],
  link: [
    // ?v=2: fuerza a los navegadores a descartar el ícono anterior cacheado.
    { rel: 'icon', type: 'image/svg+xml', href: withBase('/favicon.svg?v=2') },
    { rel: 'icon', type: 'image/x-icon', sizes: '16x16 32x32 48x48', href: withBase('/favicon.ico?v=2') },
    { rel: 'apple-touch-icon', sizes: '180x180', href: withBase('/apple-touch-icon.png?v=2') },
    { rel: 'manifest', href: withBase('/site.webmanifest') },
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'alternate', hreflang: 'es', href: `${siteUrl}/` },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/?lang=en` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` },
  ],
}))

useSeoMeta({
  ogType: 'profile',
  ogSiteName: () => site.value.identity.shortName,
  ogLocale: () => (locale.value === 'en' ? 'en_US' : 'es_PY'),
  ogImage: `${siteUrl}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: () => `${site.value.identity.shortName} · ${site.value.identity.headline}`,
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og-image.jpg`,
})

// Idioma: /?lang=en tiene prioridad; si no, la última elección guardada del visitante.
const route = useRoute()
const { setLocale } = useI18n()
onMounted(() => {
  let lang = route.query.lang
  if (lang !== 'en' && lang !== 'es') {
    try {
      lang = localStorage.getItem('portfolio_locale') ?? undefined
    } catch {}
  }
  if ((lang === 'en' || lang === 'es') && lang !== locale.value) setLocale(lang)
})
</script>
