<template>
  <div class="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
    <div class="pt-6 pb-6 space-y-2 md:space-y-5">
      <h1
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        {{ t('projects.title') }}
      </h1>
      <p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
        {{ t('projects.subtitle') }}
      </p>
    </div>
    <main class="relative mb-auto">
      <div class="">
        <div class="container py-8">
          <div class="flex flex-wrap -m-4">
            <project-card
              v-for="item in projectsData"
              :key="item.title"
              :title="item.title"
              :description="item.description"
              :href="item.href"
              :github="item.github"
              :tech="item.tech"
            ></project-card>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n()

const projectsData = computed(() => {
  const projectsList = tm('projectsList')
  return Array.isArray(projectsList) ? projectsList.map(project => ({
    title: rt(project.title),
    description: rt(project.description),
    imgSrc: rt(project.imgSrc),
    href: rt(project.href),
    github: rt(project.github),
    tech: Array.isArray(project.tech) ? project.tech.map(t => ({ data: rt(t.data) })) : []
  })) : []
})

useHead({
  title: 'Projects | Guillermo Verón',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content: 'Some of Projects developed by Guillermo Verón',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
})
</script>
