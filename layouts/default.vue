<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#contenido"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-700 focus:px-4 focus:py-2 focus:text-white"
    >
      {{ t('nav.skip') }}
    </a>
    <TheHeader />
    <main id="contenido" class="flex-1">
      <slot />
    </main>
    <TheFooter />
    <ClientOnly>
      <LazyAssistantWidget />
      <LazyCvPreviewModal />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { initTheme } = useDarkMode()
onMounted(initTheme)
</script>
