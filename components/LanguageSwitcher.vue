<template>
  <div class="flex items-center rounded-md border border-gray-200 p-0.5 text-xs font-semibold dark:border-navy-800" role="group" :aria-label="t('lang.label')">
    <button
      v-for="code in codes"
      :key="code"
      type="button"
      :lang="code"
      :aria-pressed="locale === code"
      class="rounded px-2.5 py-1.5 uppercase tracking-wide transition-colors"
      :class="locale === code ? 'bg-navy-700 text-white dark:bg-accent' : 'text-ink-muted hover:text-navy-700 dark:text-gray-300 dark:hover:text-white'"
      @click="switchTo(code)"
    >
      {{ code }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const codes = ['es', 'en'] as const
const switchTo = (code: 'es' | 'en') => {
  if (code !== locale.value) setLocale(code)
  try {
    localStorage.setItem('portfolio_locale', code)
  } catch {}
}
</script>
