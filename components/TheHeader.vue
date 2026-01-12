<template>
  <nav class="md:max-w-full mx-auto sticky top-0 z-50">
    <div class="bg-white relative border-b border-gray-200">
      <div class="flex items-center justify-center px-4 md:px-10 py-4 md:py-5">
        <ul class="flex justify-center items-center list-reset m-0 gap-6 md:gap-8">
          <li v-for="item in navLinks" :key="item.path">
            <NuxtLink
              :to="item.path"
              :class="[
                'relative px-2 py-1.5 no-underline font-semibold text-base md:text-lg transition-colors duration-200 group',
                route.path === item.path ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              ]"
            >
              {{ item.name }}
              <span
                :class="[
                  'absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300',
                  route.path === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                ]"
              ></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <LanguageSwitcher class="absolute top-3 right-3 md:top-4 md:right-6" />
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
