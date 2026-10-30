<template>
  <section id="formacion" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
      <div>
        <SectionHeading :eyebrow="t('sections.educationEyebrow')" :title="t('sections.education')" />
        <ol class="divide-y divide-gray-200/80 dark:divide-navy-800">
          <li v-for="e in site.education" :key="e.degree" class="grid gap-1 py-5 first:pt-0 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
            <time v-if="e.period" class="text-sm tabular-nums text-ink-soft dark:text-gray-400">{{ e.period }}</time>
            <span v-else class="hidden sm:block" />
            <div>
              <h3 class="font-semibold text-ink dark:text-gray-50">{{ e.degree }}</h3>
              <p class="mt-0.5 text-[0.95rem] text-ink-muted dark:text-gray-300">{{ e.institution }}</p>
            </div>
          </li>
        </ol>
      </div>
      <div class="lg:pt-20">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.languages') }}</h3>
        <ul class="mt-4 divide-y divide-gray-200/80 dark:divide-navy-800">
          <li v-for="l in site.languages" :key="l.name" class="flex items-baseline justify-between py-3">
            <span class="font-medium text-ink dark:text-gray-50">{{ l.name }}</span>
            <span class="text-sm text-ink-muted dark:text-gray-300">{{ l.level }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
</script>
