<template>
  <section id="contacto" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site">
      <div class="card grid gap-10 bg-navy-700 p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] dark:bg-navy-800">
        <div>
          <p class="eyebrow mb-3 text-navy-200 dark:text-navy-200">{{ t('sections.contactEyebrow') }}</p>
          <h2 class="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{{ site.contact.title }}</h2>
          <p class="mt-4 max-w-prose text-lg leading-relaxed text-navy-50">{{ site.contact.text }}</p>
          <p class="mt-3 max-w-prose text-sm text-navy-200">{{ site.contact.openTo }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="`mailto:${site.identity.email}`" class="btn bg-white text-navy-700 hover:bg-navy-50">
              <AppIcon name="mail" size="sm" /> {{ site.identity.email }}
            </a>
            <button type="button" class="btn border border-navy-300/60 text-white hover:bg-navy-600" @click="copy">
              <AppIcon :name="copied ? 'check' : 'copy'" size="sm" /> {{ copied ? t('contact.copied') : t('contact.copy') }}
            </button>
          </div>
        </div>
        <ul class="space-y-3 self-center text-sm">
          <li>
            <a :href="site.identity.linkedin" target="_blank" rel="noopener noreferrer me" class="flex items-center gap-3 rounded-md border border-navy-500/60 px-4 py-3 hover:bg-navy-600">
              <AppIcon name="linkedin" /> <span class="font-medium">LinkedIn</span><span class="ml-auto truncate text-navy-200">linkedin.com/in/guillermo-v-b029bb10a</span>
            </a>
          </li>
          <li>
            <a :href="site.identity.github" target="_blank" rel="noopener noreferrer me" class="flex items-center gap-3 rounded-md border border-navy-500/60 px-4 py-3 hover:bg-navy-600">
              <AppIcon name="github" /> <span class="font-medium">GitHub</span><span class="ml-auto text-navy-200">github.com/{{ site.identity.githubUser }}</span>
            </a>
          </li>
          <li>
            <a :href="withBase('/' + site.identity.cvFile)" download class="flex items-center gap-3 rounded-md border border-navy-500/60 px-4 py-3 hover:bg-navy-600">
              <AppIcon name="download" /> <span class="font-medium">{{ t('contact.cv') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
const { withBase } = useBaseUrl()
const copied = ref(false)
const copy = async () => {
  try {
    await navigator.clipboard.writeText(site.value.identity.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {}
}
</script>
