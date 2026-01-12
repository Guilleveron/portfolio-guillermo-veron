<template>
  <footer>
    <div class="flex flex-col items-center mt-16">
      <div class="flex mb-3 space-x-4">
        <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="siteMetadata.github"
          title="GitHub"
        >
          <span class="sr-only">github</span>
          <img class="w-8 h-8" src="/icon/github_new.svg" />
        </a>
        <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="siteMetadata.linkedin"
          title="LinkedIn"
        >
          <span class="sr-only">Linkedin</span>
          <img class="w-8 h-8" src="/icon/linkeding.svg" />
        </a>
        <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="`mailto:${siteMetadata.email}`"
          title="Email"
        >
          <span class="sr-only">mail</span>
          <img class="w-8 h-8" src="/icon/mail.svg"/>
        </a>
        <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="siteMetadata.twitter"
          title="Twitter"
        >
          <span class="sr-only">twitter</span>
         <img class="w-8 h-8" src="/icon/twitterBlack.svg" />
        </a>
        <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="siteMetadata.facebook"
          title="Facebook"
        >
          <span class="sr-only">facebook</span>
          <img class="w-8 h-8" src="/icon/facebook.svg"/>
        </a>
        <!-- <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="siteMetadata.youtube"
          ><span class="sr-only">youtube</span>
          <img class="w-8 h-8" src="/icon/youtube.svg"
        /></a> -->
        <a
          class="text-sm text-gray-500 transition hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
          :href="siteMetadata.instagram"
          title="Instagram"
        >
          <span class="sr-only">instagram</span>
          <img class="w-8 h-8" src="/icon/instagram.svg"/>
        </a>
      </div>
      <div class="flex mb-2 space-x-2 px-2 text-center text-sm text-gray-500 dark:text-gray-400">
        {{ t("footer.copyright") }} {{ new Date().getFullYear() }} &nbsp;•&nbsp;{{
          siteMetadata.author
        }}
        - {{ siteMetadata.slogan }}
      </div>
      <div class="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mdrathik/tailwind-nuxtjs-starter-blog"
        ></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n()
const appConfig = useAppConfig()
const siteMetadata = appConfig.siteMetadata
</script>
