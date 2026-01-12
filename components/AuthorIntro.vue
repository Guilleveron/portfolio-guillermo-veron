<template>
  <div class="mb-6">
    <h2
      class="mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200 group"
    >
      {{ t("welcome.title") }}
    </h2>
    <p class="mt-8 mb-4 dark:text-blue-200 text-justify">
      {{ t("welcome.description") }}
      <button
        type="button"
        @click="redirect"
        class="px-2 py-2 group bg-transparent text-indigo-600 dark:text-indigo-400 font-medium text-xs leading-tight rounded hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-200 dark:active:bg-gray-600 transition duration-150 ease-in-out inline-flex align-center"
      >
        {{ t("welcome.link") }}
        <ArrowTopRight
          class="w-3 h-3 ml-1 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition"
        />
      </button>
    </p>
  </div>
</template>

<script setup>
import ArrowTopRight from "/public/icon/arrow-top-right.svg";
const { t } = useI18n();

const redirect = () => {
  const link = document.createElement("a");
  link.href = t("welcome.cv");
  link.target = "_blank";
  link.click();
};
</script>
