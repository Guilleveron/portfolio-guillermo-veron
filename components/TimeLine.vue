<template>
  <div class="opacity-100 mt-10">
    <h2
      class="mb-4 ml-6 text-3xl text-gray-700 dark:text-blue-200 font-bold capitalize"
    >
      Experience
    </h2>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            src="~assets/icon/code.svg"
          />
        </span>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Software Engineer

          <span
            class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
            >Currently</span
          >
        </h3>
        <a
          href="https://encom.app/"
          rel="noreferrer"
          target="_blank"
          class="text-base text-gray-800 dark:text-blue-200 hover:underline"
        >
          Encom
        </a>
        <time
          class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Jul 2023 - Present</time
        >
        <p
          class="mb-4 pb-2 text-base font-normal text-gray-500 dark:text-gray-400"
        >
          Development and maintenance of a system for medium-sized companies, as
          well as an electronic wallet in a fintech company. <br />
          Technologies used: Php, Laravel, Java, SpringBoot, Javascript, Node js, Jetstream, Mysql,
          Css, Sass, Tailwind, Bootstrap, Html5, Git, Github.
        </p>
      </li>
      <li class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            src="~assets/icon/code.svg"
          />
        </span>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Software Engineer
        </h3>
        <a
          href="https://code100.com.py/"
          rel="noreferrer"
          target="_blank"
          class="text-base text-gray-800 dark:text-blue-200 hover:underline"
        >
          Code100
        </a>
        <time
          class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >January 2023 - June 2023</time
        >
        <p
          class="mb-4 pb-2 text-base font-normal text-gray-500 dark:text-gray-400"
        >
          Development and maintenance of digital billing systems and integration
          with external systems via Api, DB and Middleware. <br />
          Technologies used: Java, SpringBoot, Javascript, Node js, Php,
          Laravel, PostgreSQL, Mysql, Bootstrap, Css, Html5, Git, Gitlab,
          Trello, Slack.
        </p>
      </li>
      <li class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            src="~assets/icon/code.svg"
          />
        </span>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Software Engineer
        </h3>
        <a
          href="http://www.biggie.com.py/"
          rel="noreferrer"
          target="_blank"
          class="text-base text-gray-800 dark:text-blue-200 hover:underline"
        >
          Biggie Express
        </a>
        <time
          class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >March 2022 - December 2022</time
        >
        <p
          class="mb-4 pb-2 text-base font-normal text-gray-500 dark:text-gray-400"
        >
          Development and maintenance of e-commerce, admin and call center of
          the company. <br />
          Technologies used: Nuxt Js, Vue js, Angular, Javascript, Php, Laravel,
          Jetstream, Mysql, Vuetify, Css, Sass, Tailwind, Bootstrap, Html5, Git,
          Github and Bitbucket.
        </p>
      </li>
      <li class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            src="~assets/icon/code.svg"
          />
        </span>
        <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          Freelancer Web Developer
        </h3>
        <time
          class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Released on March 14th, 2020</time
        >
        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">
          Software development for small and large companies.
          <br />
          Technologies used: Node js, Java, Vue js, Javascript, Mysql,
          PostgreSQL, Php, Html5, Css, Sass, Bootstrap.
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import siteMetaInfo from "@/data/sitemetainfo";
export default {
  data() {
    return {
      siteMetadata: siteMetaInfo,
    };
  },
  components: {},
};
</script>

<style></style>
