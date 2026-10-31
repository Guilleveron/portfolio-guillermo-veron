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
    { rel: 'icon', type: 'image/svg+xml', href: withBase('/favicon.svg') },
    { rel: 'alternate icon', href: withBase('/favicon.ico') },
    { rel: 'apple-touch-icon', href: withBase('/apple-touch-icon.png') },
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
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
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
