<template>
  <header class="sticky top-0 z-40 border-b border-gray-200/70 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70 dark:border-navy-800/80 dark:bg-paper-dark/80">
    <div class="container-site flex h-16 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-3 rounded-md">
        <Monogram size="sm" decorative />
        <span class="sr-only sm:not-sr-only font-serif text-lg font-semibold tracking-tight text-ink dark:text-gray-50">{{ site.identity.shortName }}</span>
      </NuxtLink>

      <nav class="hidden lg:block" :aria-label="t('nav.menu')">
        <ul class="flex items-center gap-1">
          <li v-for="item in navItems" :key="item.hash">
            <a
              :href="item.href"
              class="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-navy-50 hover:text-navy-700 dark:text-gray-300 dark:hover:bg-navy-900/60 dark:hover:text-white"
              :aria-current="active === item.hash ? 'location' : undefined"
              :class="active === item.hash ? 'text-navy-700 dark:text-white' : ''"
              @click="go(item.hash, $event)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <a :href="withBase('/' + site.identity.cvFile)" class="btn-primary hidden h-10 md:inline-flex" download>
          <AppIcon name="download" size="sm" />
          <span>{{ site.hero.ctaPrimary }}</span>
        </a>
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          type="button"
          class="btn-ghost h-10 w-10 !p-0 lg:hidden"
          :aria-label="open ? t('nav.close') : t('nav.menu')"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'x' : 'menu'" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <nav v-if="open" id="mobile-nav" class="border-t border-gray-200/70 bg-paper lg:hidden dark:border-navy-800 dark:bg-paper-dark" :aria-label="t('nav.menu')">
        <ul class="container-site flex flex-col py-2">
          <li v-for="item in navItems" :key="item.hash">
            <a
              :href="item.href"
              class="block rounded-md px-3 py-3 text-base font-medium text-ink-muted hover:bg-navy-50 hover:text-navy-700 dark:text-gray-300 dark:hover:bg-navy-900/60 dark:hover:text-white"
              @click="go(item.hash, $event)"
            >
              {{ item.label }}
            </a>
          </li>
          <li class="px-3 py-3">
            <a :href="withBase('/' + site.identity.cvFile)" class="btn-primary w-full" download>
              <AppIcon name="download" size="sm" />
              <span>{{ site.identity.cvLabel }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
const { withBase } = useBaseUrl()
const route = useRoute()
const router = useRouter()

const open = ref(false)
const active = ref('')

const navItems = computed(() => [
  { hash: 'inicio', label: t('nav.home') },
  { hash: 'sobre-mi', label: t('nav.about') },
  { hash: 'competencias', label: t('nav.competencies') },
  { hash: 'experiencia', label: t('nav.experience') },
  { hash: 'proyectos', label: t('nav.projects') },
  { hash: 'formacion', label: t('nav.education') },
  { hash: 'contacto', label: t('nav.contact') },
].map((i) => ({ ...i, href: route.path === '/' ? `#${i.hash}` : `/#${i.hash}` })))

const go = async (hash: string, e: MouseEvent) => {
  open.value = false
  if (route.path !== '/') {
    e.preventDefault()
    await router.push('/')
    await nextTick()
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  }
}

watch(() => route.fullPath, () => (open.value = false))

let observer: IntersectionObserver | null = null
onMounted(() => {
  if (route.path !== '/') return
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((en) => en.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) active.value = visible[0].target.id
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] },
  )
  navItems.value.forEach((i) => {
    const el = document.getElementById(i.hash)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())
</script>
