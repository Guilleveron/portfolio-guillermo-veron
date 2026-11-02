<template>
  <section id="proyectos" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site">
      <SectionHeading :eyebrow="t('sections.projectsEyebrow')" :title="t('sections.projects')" :intro="t('sections.projectsIntro')" />

      <h3 class="mb-5 text-sm font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.workProjects') }}</h3>
      <div class="grid gap-5 md:grid-cols-2">
        <ProjectCard v-for="p in work" :key="p.slug" :project="p" />
      </div>

      <h3 class="mb-5 mt-14 text-sm font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.personalProjects') }}</h3>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="p in personal" :key="p.slug" :project="p" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
const work = computed(() => site.value.projects.filter((p) => p.kind === 'work'))
const personal = computed(() => site.value.projects.filter((p) => p.kind === 'personal'))
</script>
