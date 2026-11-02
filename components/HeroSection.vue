<template>
  <section id="inicio" class="section scroll-mt-16 pt-14 sm:pt-20 lg:pt-24">
    <div class="container-site grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div class="max-w-3xl">
        <p class="eyebrow mb-5">{{ site.identity.headline }}</p>
        <h1 class="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] dark:text-gray-50">
          {{ site.hero.greeting }}
          <span class="block text-navy-700 dark:text-navy-200">{{ site.hero.statement }}</span>
        </h1>
        <p class="lede mt-6 max-w-prose">{{ site.hero.support }}</p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a :href="withBase('/' + site.identity.cvFile)" class="btn-primary" download>
            <AppIcon name="download" size="sm" />
            {{ site.identity.cvLabel }}
          </a>
          <button type="button" class="btn-secondary" @click="show">
            <AppIcon name="eye" size="sm" />
            {{ t('contact.preview') }}
          </button>
          <a href="#contacto" class="btn-ghost">
            {{ site.hero.ctaSecondary }}
            <AppIcon name="arrow-right" size="sm" />
          </a>
        </div>

        <dl class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted dark:text-gray-300">
          <div class="flex items-center gap-2">
            <AppIcon name="pin" size="sm" />
            <dt class="sr-only">{{ t('nav.contact') }}</dt>
            <dd>{{ site.identity.location }}</dd>
          </div>
          <div class="flex items-center gap-2">
            <AppIcon name="briefcase" size="sm" />
            <dd>{{ site.identity.availability }}</dd>
          </div>
        </dl>
      </div>

      <div class="flex items-center gap-5 lg:flex-col lg:items-end lg:pt-2">
        <img
          :src="withBase(site.identity.photo)"
          :srcset="`${withBase('/img/guillermo-veron-176.webp')} 176w, ${withBase(site.identity.photo)} 352w`"
          sizes="(min-width: 1024px) 176px, (min-width: 640px) 144px, 112px"
          :alt="site.identity.name"
          width="352"
          height="352"
          decoding="async"
          class="h-28 w-28 shrink-0 rounded-full object-cover shadow-sm ring-4 ring-navy-100 sm:h-36 sm:w-36 lg:h-44 lg:w-44 dark:ring-navy-900"
        />
        <ul class="flex gap-2 lg:flex-col">
          <li>
            <a :href="site.identity.linkedin" target="_blank" rel="noopener noreferrer me" class="btn-ghost h-10 w-10 !p-0" title="LinkedIn">
              <AppIcon name="linkedin" /><span class="sr-only">LinkedIn</span>
            </a>
          </li>
          <li>
            <a :href="site.identity.github" target="_blank" rel="noopener noreferrer me" class="btn-ghost h-10 w-10 !p-0" title="GitHub">
              <AppIcon name="github" /><span class="sr-only">GitHub</span>
            </a>
          </li>
          <li>
            <a :href="`mailto:${site.identity.email}`" class="btn-ghost h-10 w-10 !p-0" :title="t('contact.email')">
              <AppIcon name="mail" /><span class="sr-only">{{ t('contact.email') }}</span>
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
const { show } = useCvPreview()
</script>
