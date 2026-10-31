<template>
  <div
    class="flex shrink-0 items-center justify-center rounded-full bg-navy-700 font-serif font-semibold tracking-tight text-white shadow-sm ring-4 ring-navy-100 dark:bg-navy-600 dark:ring-navy-900"
    :class="sizeClass"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : label"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    GV
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: 'sm' | 'lg'; label?: string; decorative?: boolean }>(), { size: 'lg', label: 'Guillermo Verón', decorative: false })
const sizeClass = computed(() => (props.size === 'sm' ? 'h-9 w-9 text-sm' : 'h-28 w-28 text-4xl sm:h-36 sm:w-36 sm:text-5xl'))
</script>
