<template>
  <article v-if="project" class="section pt-10 sm:pt-14">
    <div class="container-site">
      <NuxtLink to="/#proyectos" class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-navy-700 dark:text-gray-300 dark:hover:text-white">
        <AppIcon name="arrow-left" size="sm" /> {{ t('sections.allProjects') }}
      </NuxtLink>

      <header class="mt-8 max-w-3xl">
        <p class="eyebrow mb-3">{{ project.period }} · {{ project.role }}</p>
        <h1 class="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl dark:text-gray-50">{{ project.name }}</h1>
        <p class="lede mt-5">{{ project.tagline }}</p>
        <div v-if="project.links.length" class="mt-6 flex flex-wrap gap-3">
          <a v-for="l in project.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            <AppIcon :name="l.kind === 'github' ? 'github' : 'external'" size="sm" /> {{ l.label }}
          </a>
        </div>
      </header>

      <div class="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div class="min-w-0 space-y-12">
          <p v-if="project.kind === 'work'" class="rounded-lg border border-navy-100 bg-navy-50 px-5 py-4 text-sm leading-relaxed text-navy-800 dark:border-navy-800 dark:bg-navy-900/50 dark:text-navy-100">
            {{ t('caseStudy.disclaimer') }}
          </p>

          <div v-if="project.images?.length" class="grid gap-4" :class="project.images.length > 1 && portrait ? 'grid-cols-2 sm:grid-cols-3' : ''">
            <figure v-for="img in project.images" :key="img.src" class="card overflow-hidden bg-navy-50 dark:bg-navy-950">
              <img :src="withBase(img.src)" :alt="img.alt" :width="img.width" :height="img.height" loading="lazy" decoding="async" class="h-auto w-full" />
            </figure>
          </div>

          <section v-if="project.caseStudy">
            <h2 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('caseStudy.context') }}</h2>
            <p class="mt-3 max-w-prose text-[1.05rem] leading-relaxed text-ink-muted dark:text-gray-300">{{ project.caseStudy.context }}</p>
            <h2 class="mt-10 font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('caseStudy.role') }}</h2>
            <p class="mt-3 max-w-prose text-[1.05rem] leading-relaxed text-ink-muted dark:text-gray-300">{{ project.caseStudy.role }}</p>
            <div class="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h2 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('caseStudy.challenges') }}</h2>
                <ul class="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-muted dark:text-gray-300">
                  <li v-for="(c, i) in project.caseStudy.challenges" :key="i" class="flex gap-3"><span class="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{{ c }}</span></li>
                </ul>
              </div>
              <div>
                <h2 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('caseStudy.decisions') }}</h2>
                <ul class="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-muted dark:text-gray-300">
                  <li v-for="(d, i) in project.caseStudy.decisions" :key="i" class="flex gap-3"><span class="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{{ d }}</span></li>
                </ul>
              </div>
            </div>
            <h2 class="mt-10 font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('caseStudy.outcome') }}</h2>
            <p class="mt-3 max-w-prose text-[1.05rem] leading-relaxed text-ink-muted dark:text-gray-300">{{ project.caseStudy.outcome }}</p>
          </section>

          <section v-if="project.architecture">
            <h2 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('caseStudy.architecture') }}</h2>
            <p class="mt-1 text-sm text-ink-soft dark:text-gray-400">{{ project.architecture.title }}</p>
            <ol class="mt-4 grid gap-2 sm:grid-cols-2">
              <li v-for="(n, i) in project.architecture.nodes" :key="i" class="card flex items-start gap-3 px-4 py-3 text-sm text-ink-muted dark:text-gray-300">
                <span class="font-serif text-sm font-semibold text-accent dark:text-accent-light">{{ String(i + 1).padStart(2, '0') }}</span>{{ n }}
              </li>
            </ol>
          </section>

          <section>
            <h2 class="font-serif text-2xl font-semibold text-ink dark:text-gray-50">{{ t('sections.highlights') }}</h2>
            <ul class="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-muted dark:text-gray-300">
              <li v-for="(h, i) in project.highlights" :key="i" class="flex gap-3"><span class="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{{ h }}</span></li>
            </ul>
          </section>

          <p v-if="project.kind === 'work'" class="text-sm text-ink-soft dark:text-gray-400">{{ t('caseStudy.moreOnRequest') }}</p>
        </div>

        <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div class="card p-5">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.role') }}</h2>
            <p class="mt-1 text-sm font-medium text-ink dark:text-gray-100">{{ project.role }}</p>
            <h2 class="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.period') }}</h2>
            <p class="mt-1 text-sm font-medium text-ink dark:text-gray-100">{{ project.period }}</p>
            <h2 class="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.stackLabel') }}</h2>
            <ul class="mt-2 flex flex-wrap gap-1.5"><li v-for="s in project.stack" :key="s" class="chip">{{ s }}</li></ul>
          </div>
          <nav class="card p-5" :aria-label="t('sections.allProjects')">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-soft dark:text-gray-400">{{ t('sections.allProjects') }}</h2>
            <ul class="mt-2 space-y-1.5 text-sm">
              <li v-for="p in others" :key="p.slug">
                <NuxtLink :to="`/proyectos/${p.slug}`" class="link">{{ p.name }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { site } = useSiteContent()
const { withBase } = useBaseUrl()
const { public: { siteUrl } } = useRuntimeConfig()

const slug = computed(() => String(route.params.slug))
const project = computed(() => site.value.projects.find((p) => p.slug === slug.value))
const others = computed(() => site.value.projects.filter((p) => p.caseStudy && p.slug !== slug.value))
const portrait = computed(() => (project.value?.images ?? []).every((i) => i.height > i.width))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: () => `${project.value?.name} | ${site.value.identity.shortName}`,
  description: () => project.value?.summary ?? '',
  ogTitle: () => project.value?.name ?? '',
  ogDescription: () => project.value?.summary ?? '',
  ogUrl: () => `${siteUrl}/proyectos/${slug.value}`,
})
</script>
