<template>
  <div class="mt-8">
    <div class="mt-2">
      <h2
        class="mb-4 text-3xl text-gray-700 dark:text-blue-200 font-bold capitalize"
      >
        {{ t("sections.skills") }}
      </h2>

      <ul class="flex flex-wrap gap-4 items-center">
        <li v-for="skill in skills" :key="skill.name" class="flex items-center hover:scale-125 duration-200 ease-in">
          <a :href="skill.url" target="_blank" :alt="skill.name" :title="skill.name">
            <img :src="skill.icon" :alt="skill.name" class="h-10 w-10 object-contain" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const appConfig = useAppConfig()
const skills = appConfig.skills
</script>
