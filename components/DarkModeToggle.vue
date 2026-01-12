<template>
  <div class="flex items-center gap-1">
    <button
      v-for="mode in modes"
      :key="mode.value"
      @click="switchTheme(mode.value)"
      :class="[
        'p-2 rounded-lg transition-all duration-200',
        colorMode === mode.value
          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
      ]"
      :title="mode.title"
      :aria-label="mode.title"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="mode.icon"></svg>
    </button>
  </div>
</template>

<script setup>
const { colorMode, updateTheme, initTheme } = useDarkMode()

const modes = [
  {
    value: 'light',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>',
    title: 'Light mode'
  },
  {
    value: 'dark',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>',
    title: 'Dark mode'
  },
  {
    value: 'system',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
    title: 'System preference'
  }
]

const switchTheme = (mode) => {
  updateTheme(mode)
}

// Initialize theme on mount
onMounted(() => {
  initTheme()
})
</script>
