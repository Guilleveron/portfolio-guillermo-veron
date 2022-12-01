<template>
  <div class="opacity-100 mt-10">
    <h2
      class="mb-4 ml-6 text-3xl text-gray-700 dark:text-blue-200 font-bold capitalize"
    >
      Education
    </h2>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            src="~assets/icon/academy.svg"
          />
        </span>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Bachelor's Degree in Computer Systems Analysis
        </h3>
        <a
          href="http://www.uds.edu.py/analisis"
          rel="noreferrer"
          target="_blank"
          class="text-base text-gray-800 dark:text-blue-200 hover:underline"
        >
          Sustainable Development University</a
        >
        <time
          class="block mb-2 pb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >March 2020 - Present</time
        >
      </li>
      <li class="hover:shadow-lg rounded-lg px-2 mb-10 ml-6">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <img
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            src="~assets/icon/academy.svg"
          />
        </span>
        <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          Bachelor's degree in Accounting
        </h3>
        <a
          href="http://www.uds.edu.py/contabilidad"
          rel="noreferrer"
          target="_blank"
          class="text-base text-gray-800 dark:text-blue-200 hover:underline"
        >
          Sustainable Development University</a
        >
        <time
          class="block mb-2 pb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >2016 - 2020
        </time>
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
