<template>
  <article class="card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md dark:hover:shadow-navy-950/60">
    <div class="flex flex-1 flex-col p-6">
      <p class="text-xs font-medium uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ project.period }} · {{ project.role }}</p>
      <h3 class="mt-2 text-xl font-semibold leading-snug text-ink dark:text-gray-50">
        <NuxtLink v-if="project.caseStudy" :to="`/proyectos/${project.slug}`" class="hover:text-navy-700 dark:hover:text-navy-200">{{ project.name }}</NuxtLink>
        <span v-else>{{ project.name }}</span>
      </h3>
      <p class="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-muted dark:text-gray-300">{{ project.summary }}</p>
      <ul class="mt-4 flex flex-wrap gap-1.5" :aria-label="t('sections.stackLabel')">
        <li v-for="s in project.stack.slice(0, 7)" :key="s" class="chip">{{ s }}</li>
      </ul>
      <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
        <NuxtLink v-if="project.caseStudy" :to="`/proyectos/${project.slug}`" class="inline-flex items-center gap-1 text-navy-700 hover:underline dark:text-navy-200">
          {{ t('sections.viewCase') }} <AppIcon name="arrow-right" size="sm" />
        </NuxtLink>
        <a v-for="l in project.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-ink-muted hover:text-navy-700 dark:text-gray-300 dark:hover:text-white">
          <AppIcon :name="l.kind === 'github' ? 'github' : 'external'" size="sm" /> {{ l.label }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/data'
defineProps<{ project: Project }>()
const { t } = useI18n()
</script>
