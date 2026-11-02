<template>
  <section id="contacto" class="section scroll-mt-16 border-t border-gray-200/70 dark:border-navy-800">
    <div class="container-site">
      <div class="card grid gap-10 bg-navy-700 p-6 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] dark:bg-navy-800">
        <div class="min-w-0">
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
        <ul class="min-w-0 space-y-3 self-center text-sm">
          <li>
            <a :href="site.identity.phoneHref" class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-navy-500/60 px-4 py-3 hover:bg-navy-600">
              <AppIcon name="phone" class="shrink-0" /> <span class="font-medium">{{ t('contact.phone') }}</span><span class="min-w-0 tabular-nums text-navy-200 sm:ml-auto">{{ site.identity.phone }}</span>
            </a>
          </li>
          <li>
            <a :href="site.identity.linkedin" target="_blank" rel="noopener noreferrer me" class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-navy-500/60 px-4 py-3 hover:bg-navy-600">
              <AppIcon name="linkedin" class="shrink-0" /> <span class="font-medium">LinkedIn</span><span class="min-w-0 break-all text-navy-200 sm:ml-auto sm:truncate sm:break-normal">linkedin.com/in/guillermo-v-b029bb10a</span>
            </a>
          </li>
          <li>
            <a :href="site.identity.github" target="_blank" rel="noopener noreferrer me" class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-navy-500/60 px-4 py-3 hover:bg-navy-600">
              <AppIcon name="github" class="shrink-0" /> <span class="font-medium">GitHub</span><span class="min-w-0 break-all text-navy-200 sm:ml-auto sm:break-normal">github.com/{{ site.identity.githubUser }}</span>
            </a>
          </li>
          <li>
            <div class="flex min-w-0 flex-wrap items-center gap-3 rounded-md border border-navy-500/60 px-4 py-3">
              <AppIcon name="file" class="shrink-0" /> <span class="font-medium">CV</span>
              <span class="flex w-full flex-wrap gap-2 sm:ml-auto sm:w-auto">
                <button type="button" class="btn border border-navy-300/60 !px-3 !py-1.5 text-xs text-white hover:bg-navy-600" @click="show"><AppIcon name="eye" size="xs" /> {{ t('contact.preview') }}</button>
                <a :href="withBase('/' + site.identity.cvFile)" download class="btn bg-white !px-3 !py-1.5 text-xs text-navy-700 hover:bg-navy-50"><AppIcon name="download" size="xs" /> {{ t('cv.download') }}</a>
              </span>
            </div>
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
const { show } = useCvPreview()
const copied = ref(false)
const copy = async () => {
  try {
    await navigator.clipboard.writeText(site.value.identity.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {}
}
</script>
