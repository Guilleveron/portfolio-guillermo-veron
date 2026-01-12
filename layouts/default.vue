<template>
  <!-- Section 1 -->
  <section class="w-full pb-8 antialiased bg-white dark:bg-gray-900 transition-colors duration-200">
    <div class="mx-auto max-w-8xl">
      <TheHeader />
      <NuxtPage class="px-6" />
      <TheFooter />
    </div>
  </section>
</template>

<script setup>
// Initialize dark mode
const { initTheme } = useDarkMode()

onMounted(() => {
  initTheme()
})
</script>

<style></style>
