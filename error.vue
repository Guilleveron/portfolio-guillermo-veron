<template>
  <NuxtLayout>
    <section class="section">
      <div class="container-site max-w-prose">
        <p class="eyebrow mb-3">{{ error?.statusCode || 404 }}</p>
        <h1 class="heading">{{ t('notFound.title') }}</h1>
        <p class="lede mt-4">{{ t('notFound.text') }}</p>
        <button type="button" class="btn-primary mt-8" @click="handleError">
          <AppIcon name="arrow-left" size="sm" /> {{ t('notFound.back') }}
        </button>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error?: NuxtError }>()
const { t } = useI18n()
const handleError = () => clearError({ redirect: '/' })
</script>
