<template>
  <button
    type="button"
    class="btn-ghost h-10 w-10 !p-0"
    :title="label"
    :aria-label="t('theme.toggle') + ': ' + label"
    @click="cycle"
  >
    <AppIcon :name="icon" />
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { colorMode, cycle } = useDarkMode()
const icon = computed(() => ({ light: 'sun', dark: 'moon', system: 'monitor' }[colorMode.value]))
const label = computed(() => t(`theme.${colorMode.value}`))
</script>
