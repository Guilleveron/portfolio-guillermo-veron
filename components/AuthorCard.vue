<template>
  <div class="md:fixed">
    <div class="md:block flex justify-center items-center">
      <img
        :src="siteMetadata.author_image"
        loading="lazy"
        alt="me"
        class="shadow-xl md:h-60 md:w-60 md:m-auto sm:h-40 sm:w-40 h-28 w-28 rounded-full hover:animate-[wiggle_1s_ease-in-out_infinite]"
      />
      <div class="mb-2 mx-2 sm:mx-7 mt-4 justify-center items-center">
        <h1
          class="md:text-3xl text-2xl text-gray-800 font-bold dark:text-blue-100"
        >
          {{ siteMetadata.author }}
        </h1>
        <div class="text-base sm:text-lg text-gray-600 dark:text-blue-100">
          {{ siteMetadata.position }}
        </div>
        <a
          :href="`mailto:${siteMetadata.email}`"
          class="text-base sm:text-lg text-gray-600 md:hidden mt-1 dark:text-blue-100"
        >
          {{ siteMetadata.email }}
        </a>
      </div>
    </div>

    <div class="mx-7 hidden md:block">
      <div class="my-2 text-gray-600 flex dark:text-blue-100">
        <img src="/icon/mail.svg" alt="mail" class="w-6 h-6 mr-2" />
        <a :href="`mailto:${siteMetadata.email}`"> {{ siteMetadata.email }}</a>
      </div>
      <div class="my-2 text-gray-600 flex dark:text-blue-100">
        <img src="/icon/glob.svg" alt="location" class="w-6 h-6 mr-2" />
        <p>{{ siteMetadata.location }}</p>
      </div>
      <div class="my-2 text-gray-600 flex dark:text-blue-200">
        <img src="/icon/github_new.svg" alt="github" class="w-6 h-6 mr-2" />
        <a :href="siteMetadata.github"> {{ siteMetadata.githubUser }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const appConfig = useAppConfig()
const siteMetadata = appConfig.siteMetadata
</script>
