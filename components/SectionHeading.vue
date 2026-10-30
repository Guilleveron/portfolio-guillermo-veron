<template>
  <div class="mb-10 max-w-prose sm:mb-12">
    <p v-if="eyebrow" class="eyebrow mb-3">{{ eyebrow }}</p>
    <h2 :id="id" class="heading scroll-mt-24">{{ title }}</h2>
    <p v-if="intro" class="lede mt-4">{{ intro }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; eyebrow?: string; intro?: string; id?: string }>()
</script>
