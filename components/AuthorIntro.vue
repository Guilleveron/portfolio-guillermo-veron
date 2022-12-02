<template>
  <div class="mb-6">
    <h2
      class="mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200 group"
    >
      👋 Hi, welcome!
    </h2>
    <p class="mt-8 mb-4 dark:bg-gray-800 dark:text-blue-200 text-justify">
      I'm Guillermo, a person who loves technology and is constantly looking to
      create software that improves the lives of as many people as possible. I
      specialize in creating software for clients ranging from individuals and
      small businesses to large enterprise corporations. I have developed
      specific products that solve the business needs of my clients. I have
      worked in software development, front-end/back-end web, ux/ui and database
      management. I have a passionate spirit that along with my natural problem
      solving skills help me to achieve my dreams and desires. I am never
      satisfied with just dreaming, but have an innate need to make them come
      true by acting accordingly step by step. I have a very good ability to
      learn and acquire new skills. You can read more details about my
      biography, experiences, skills and studies
      <button
        type="button"
        @click="redirect"
        class="px-2 py-2 group bg-transparent text-indigo-600 font-medium text-xs leading-tight rounded hover:text-indigo-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out inline-flex align-center"
      >
        HERE
        <Arrow class="w-3 ml-1 text-indigo-600 group-hover:text-indigo-700" />
      </button>
    </p>
  </div>
</template>
<script>
import Arrow from "../assets/icon/arrow-top-right.svg?inline";
export default {
  data: () => ({}),
  components: { Arrow },
  computed: {},

  methods: {
    redirect() {
      const link = document.createElement("a");
      link.href = "Cv Guillermo Verón.pdf";
      //link.download = "Cv Guillermo Verón.pdf";
      link.target = "_blank";
      link.click();
    },
  },
};
</script>
