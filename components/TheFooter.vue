<template>
  <footer class="border-t border-gray-200/70 py-10 dark:border-navy-800">
    <div class="container-site flex flex-wrap items-center justify-between gap-x-10 gap-y-6 text-sm text-ink-soft dark:text-gray-400">
      <div>
        <p class="font-medium text-ink dark:text-gray-200">{{ site.identity.name }}</p>
        <p>© {{ year }} · {{ t('footer.rights') }}</p>
      </div>
      <div class="flex items-center gap-4">
        <a :href="`mailto:${site.identity.email}`" class="btn-ghost h-10 w-10 !p-0" :title="t('contact.email')">
          <AppIcon name="mail" />
          <span class="sr-only">{{ t('contact.email') }}</span>
        </a>
        <a :href="site.identity.linkedin" target="_blank" rel="noopener noreferrer me" class="btn-ghost h-10 w-10 !p-0" title="LinkedIn">
          <AppIcon name="linkedin" />
          <span class="sr-only">LinkedIn</span>
        </a>
        <a :href="site.identity.github" target="_blank" rel="noopener noreferrer me" class="btn-ghost h-10 w-10 !p-0" title="GitHub">
          <AppIcon name="github" />
          <span class="sr-only">GitHub</span>
        </a>
      </div>
      <p class="max-w-xs text-xs sm:pr-28">
        {{ t('footer.built') }}
        <a href="https://github.com/Guilleveron/portfolio-guillermo-veron" class="link" target="_blank" rel="noopener noreferrer">{{ t('footer.source') }}</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
const year = new Date().getFullYear()
</script>
