<template>
  <!-- Section 1 -->
  <section class="w-full pb-8 antialiased bg-white">
    <div class="mx-auto max-w-8xl">
      <TheHeader />
      <Nuxt class="px-6" />
      <TheFooter />
    </div>
  </section>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  component: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style></style>
