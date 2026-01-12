<template>
  <div class="opacity-100 mt-10">
    <h2
      class="mb-4 ml-6 text-3xl text-gray-700 dark:text-blue-200 font-bold capitalize"
    >
      {{ t("sections.experience") }}
    </h2>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li v-for="job in jobs" :key="job.company" class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            :src="withBase('/icon/code.svg')"
          />
        </span>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
        >
          {{ job.title }}
          <span
            v-if="job.current"
            class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
          >
            {{ t("sections.currently") }}
          </span>
        </h3>
        <a
          :href="job.url"
          rel="noreferrer"
          target="_blank"
          class="text-base text-gray-800 dark:text-blue-200 hover:underline"
        >
          {{ job.company }}
        </a>
        <time
          class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
        >
          {{ job.period }}
        </time>
        <p
          class="mb-4 pb-2 text-base font-normal text-gray-500 dark:text-gray-400 whitespace-pre-line"
        >
          {{ job.description }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n()
const { withBase } = useBaseUrl()

const jobs = computed(() => {
  const jobsData = tm('jobs')
  return Array.isArray(jobsData) ? jobsData.map(job => ({
    title: rt(job.title),
    company: rt(job.company),
    url: rt(job.url),
    period: rt(job.period),
    current: job.current,
    description: rt(job.description)
  })) : []
})
</script>
