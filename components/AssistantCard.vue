<template>
  <component
    :is="card.to ? NuxtLink : 'a'"
    v-bind="card.to ? { to: card.to } : { href: card.href, target: card.external ? '_blank' : undefined, rel: card.external ? 'noopener noreferrer' : undefined }"
    class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 transition-colors hover:border-navy-300 hover:bg-navy-50/60 dark:border-navy-800 dark:bg-navy-950 dark:hover:border-navy-600 dark:hover:bg-navy-900/60"
    @click="onClick"
  >
    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 dark:bg-navy-900 dark:text-navy-200">
      <AppIcon :name="card.icon" size="sm" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block truncate text-sm font-medium text-ink dark:text-gray-100">{{ card.title }}</span>
      <span class="block truncate text-xs text-ink-soft dark:text-gray-400">{{ card.description }}</span>
    </span>
    <span v-if="card.action === 'cv'" class="flex shrink-0 items-center gap-1">
      <span class="btn-secondary !px-2 !py-1 text-xs">{{ t('cards.preview') }}</span>
      <a :href="card.href" download class="btn-ghost !p-1.5" :title="t('contact.cv')" @click.stop>
        <AppIcon name="download" size="sm" /><span class="sr-only">{{ t('contact.cv') }}</span>
      </a>
    </span>
    <AppIcon v-else :name="card.external ? 'external' : 'arrow-right'" size="sm" class="shrink-0 text-ink-soft" />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import type { CardItem } from '~/composables/useCards'
const props = defineProps<{ card: CardItem }>()
const { t } = useI18n()
const { show } = useCvPreview()
const onClick = (e: MouseEvent) => {
  if (props.card.action === 'cv') {
    e.preventDefault()
    show()
  }
}
</script>
