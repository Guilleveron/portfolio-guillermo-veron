<template>
  <li class="relative grid gap-2 py-7 first:pt-0 last:pb-0 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
    <div class="text-sm text-ink-soft dark:text-gray-400">
      <time class="tabular-nums">{{ job.period }}</time>
      <span v-if="job.current" class="chip ml-2 border-navy-200 bg-navy-50 text-navy-700 sm:ml-0 sm:mt-2 sm:block sm:w-fit dark:border-navy-700 dark:bg-navy-900 dark:text-navy-200">
        {{ t('sections.current') }}
      </span>
    </div>
    <div class="min-w-0">
      <h4 class="text-lg font-semibold text-ink dark:text-gray-50">{{ job.role }}</h4>
      <p class="mt-0.5 text-[0.95rem] text-ink-muted dark:text-gray-300">
        <a v-if="job.url" :href="job.url" target="_blank" rel="noopener noreferrer" class="link font-medium">{{ job.company }}</a>
        <span v-else class="font-medium">{{ job.company }}</span>
        <span v-if="job.note" class="block text-sm text-ink-soft dark:text-gray-400">{{ job.note }}</span>
      </p>
      <ul class="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-muted dark:text-gray-300">
        <li v-for="(b, i) in job.bullets" :key="i" class="flex gap-3">
          <span class="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent dark:bg-accent-light" aria-hidden="true" />
          <span>{{ b }}</span>
        </li>
      </ul>
      <p v-if="job.tech?.length" class="mt-4 text-sm text-ink-soft dark:text-gray-400">
        <span class="font-medium text-ink-muted dark:text-gray-300">{{ t('sections.technologies') }}:</span>
        {{ job.tech.join(', ') }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Job } from '~/data'
defineProps<{ job: Job }>()
const { t } = useI18n()
</script>
