<template>
  <div class="p-4 md:w-1/2 md" style="max-width: 544px">
    <div
      class="h-full overflow-hidden border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700"
    >
      <div class="p-6">
        <div class="flex flex-row justify-between items-center">
          <div class="my-2">
          <img class="w-6 h-6" :src="withBase('/icon/folder.svg?inline')"/>
          </div>
          <div class="flex flex-row justify-between">
            <div class="mx-1" v-if="href !== '#'">
              <a
                class="text-sm text-gray-500 transition hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                :href="href"
              ><span class="sr-only"></span
                ><img class="w-6 h-6" :src="withBase('/icon/external.svg?inline')"
              /></a>
            </div>
            <div class="mx-1" v-if="github !== '#'">
              <a
                class="text-sm text-gray-500 transition hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                :href="github"
                ><span class="sr-only">github</span
                ><img class="w-6 h-6" :src="withBase('/icon/github_new.svg?inline')"
              /></a>
            </div>
          </div>
        </div>
        <h2 class="text-2xl font-bold leading-8 tracking-tight mb-3">
          {{ title }}
        </h2>
        <p
          class="prose leading-normal text-gray-500 max-w-none dark:text-gray-400 mb-3"
        >
          {{ description }}
        </p>

        <div class="flex flex-row justify-between">
          <div class="text-gray-400 text-sm font-extralight">
            <span v-for="(item, index) in tech">
              {{ item.data }} {{ index + 1 < tech.length ? "•" : "" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { withBase } = useBaseUrl()

defineProps({
  title: String,
  description: String,
  href: {
    type: String,
    default: '#'
  },
  github: {
    type: String,
    default: '#'
  },
  tech: Array
});
</script>

<style></style>
