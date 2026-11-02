<template>
  <div class="space-y-2">
    <template v-for="(b, i) in blocks" :key="i">
      <div v-if="b.kind === 'text'" class="assistant-markdown" v-html="b.html" />
      <AssistantChart v-else-if="b.kind === 'chart'" :spec="b.spec" />
      <div v-else class="space-y-1.5">
        <AssistantCard v-for="c in resolveAll(b.keys)" :key="c.key" :card="c" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { splitBlocks } from '~/composables/useAssistant'
const props = defineProps<{ content: string }>()
const { resolveAll } = useCards()
const blocks = computed(() => splitBlocks(props.content))
</script>
