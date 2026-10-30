<template>
  <section id="sobre-mi" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
      <div>
        <SectionHeading :eyebrow="t('sections.aboutEyebrow')" :title="t('sections.about')" />
        <div class="max-w-prose space-y-5 text-[1.05rem] leading-relaxed text-ink-muted dark:text-gray-300">
          <p v-for="(p, i) in site.about.paragraphs" :key="i">{{ p }}</p>
        </div>
      </div>
      <dl class="grid grid-cols-2 gap-4 self-start lg:grid-cols-1 lg:pt-20">
        <div v-for="f in site.about.facts" :key="f.label" class="card p-4">
          <dt class="text-xs font-medium uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ f.label }}</dt>
          <dd class="mt-1 font-serif text-xl font-semibold text-navy-700 dark:text-navy-200">{{ f.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
</script>
