<template>
  <section id="experiencia" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site">
      <SectionHeading :eyebrow="t('sections.experienceEyebrow')" :title="t('sections.experience')" />

      <div class="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <div class="lg:sticky lg:top-24 lg:self-start">
          <h3 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('sections.experienceTech') }}</h3>
          <p class="mt-2 text-sm text-ink-soft dark:text-gray-400">2020 – {{ t('sections.current').toLowerCase() }}</p>
        </div>
        <ol class="divide-y divide-gray-200/80 dark:divide-navy-800">
          <JobItem v-for="job in site.experience.tech" :key="job.company + job.start" :job="job" />
        </ol>
      </div>

      <div class="mt-16 grid gap-12 border-t border-gray-200/70 pt-16 lg:grid-cols-[14rem_1fr] lg:gap-16 dark:border-navy-800">
        <div class="lg:sticky lg:top-24 lg:self-start">
          <h3 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('sections.experienceAdmin') }}</h3>
          <p class="mt-2 text-sm text-ink-soft dark:text-gray-400">2016 – 2020</p>
        </div>
        <div>
          <p class="mb-8 max-w-prose text-[1.05rem] leading-relaxed text-ink-muted dark:text-gray-300">{{ site.experience.adminIntro }}</p>
          <ol class="divide-y divide-gray-200/80 dark:divide-navy-800">
            <JobItem v-for="job in site.experience.admin" :key="job.company + job.start" :job="job" />
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
</script>
