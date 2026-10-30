<template>
  <section id="competencias" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site">
      <SectionHeading :eyebrow="t('sections.competenciesEyebrow')" :title="t('sections.competencies')" />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="(c, i) in site.competencies" :key="c.title" class="card flex flex-col p-6">
          <span class="mb-4 font-serif text-sm font-semibold text-accent dark:text-accent-light">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="text-lg font-semibold text-ink dark:text-gray-50">{{ c.title }}</h3>
          <p class="mt-2 text-[0.95rem] leading-relaxed text-ink-muted dark:text-gray-300">{{ c.text }}</p>
        </article>
        <div class="card flex flex-col justify-between bg-navy-700 p-6 text-white dark:bg-navy-800">
          <h3 class="text-lg font-semibold">{{ t('sections.stack') }}</h3>
          <dl class="mt-4 space-y-3 text-sm">
            <div v-for="g in site.stack" :key="g.label">
              <dt class="text-xs font-semibold uppercase tracking-wider text-navy-200">{{ g.label }}</dt>
              <dd class="mt-0.5 leading-relaxed text-navy-50">{{ g.items.join(' · ') }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
</script>
