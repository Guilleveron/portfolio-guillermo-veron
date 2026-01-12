<template>
  <nav class="md:max-w-full mx-auto sticky top-0 z-50">
    <div class="bg-white dark:bg-gray-900 relative border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div class="flex items-center justify-center px-4 md:px-10 py-4 md:py-5">
        <ul class="flex justify-center items-center list-reset m-0 gap-6 md:gap-8">
          <li v-for="item in navLinks" :key="item.path">
            <NuxtLink
              :to="item.path"
              :class="[
                'relative px-2 py-1.5 no-underline font-semibold text-base md:text-lg transition-colors duration-200 group',
                route.path === item.path ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              ]"
            >
              {{ item.name }}
              <span
                :class="[
                  'absolute bottom-0 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300',
                  route.path === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                ]"
              ></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="absolute top-3 right-3 md:top-4 md:right-6 flex items-center gap-3">
        <DarkModeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  </nav>
</template>

<script setup>
const { t, tm, rt } = useI18n()
const route = useRoute()

const navLinks = computed(() => {
  const menuData = tm('menu')
  return Array.isArray(menuData) ? menuData.map(item => ({
    name: rt(item.name),
    path: rt(item.path)
  })) : []
})
</script>
