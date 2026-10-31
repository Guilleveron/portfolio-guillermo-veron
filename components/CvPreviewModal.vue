<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-150" enter-from-class="opacity-0" leave-active-class="transition duration-100" leave-to-class="opacity-0">
      <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-4" @click.self="hide" @keydown.esc="hide">
        <div ref="dialog" role="dialog" aria-modal="true" :aria-label="t('cv.title')" tabindex="-1" class="flex h-[min(95dvh,1100px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-paper-raised shadow-2xl dark:bg-paper-dark-raised">
          <header class="flex items-center gap-3 border-b border-gray-200/80 px-4 py-3 dark:border-navy-800">
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700 dark:bg-navy-900 dark:text-navy-200"><AppIcon name="file" size="sm" /></span>
            <div class="min-w-0 flex-1">
              <h2 class="truncate text-sm font-semibold text-ink dark:text-gray-50">{{ t('cv.title') }}</h2>
              <p class="truncate text-xs text-ink-soft dark:text-gray-400">{{ site.identity.cvFile }}</p>
            </div>
            <div v-if="pages" class="hidden items-center gap-1 text-xs text-ink-muted sm:flex dark:text-gray-300">
              <button type="button" class="btn-ghost h-8 w-8 !p-0" :disabled="page <= 1" :aria-label="t('cv.prev')" @click="go(page - 1)"><AppIcon name="arrow-left" size="sm" /></button>
              <span class="tabular-nums">{{ page }} / {{ pages }}</span>
              <button type="button" class="btn-ghost h-8 w-8 !p-0" :disabled="page >= pages" :aria-label="t('cv.next')" @click="go(page + 1)"><AppIcon name="arrow-right" size="sm" /></button>
              <button type="button" class="btn-ghost ml-2 h-8 px-2 text-xs" @click="zoom = Math.max(0.5, zoom - 0.25)">−</button>
              <span class="w-10 text-center tabular-nums">{{ Math.round(zoom * 100) }}%</span>
              <button type="button" class="btn-ghost h-8 px-2 text-xs" @click="zoom = Math.min(3, zoom + 0.25)">+</button>
            </div>
            <button type="button" class="btn-ghost h-9 w-9 !p-0" :aria-label="t('nav.close')" @click="hide"><AppIcon name="x" size="sm" /></button>
          </header>

          <div ref="scroller" class="flex flex-1 items-start justify-center overflow-auto bg-gray-100 p-2 dark:bg-navy-950">
            <p v-if="status === 'loading'" class="mt-10 text-sm text-ink-soft dark:text-gray-400">{{ t('cv.loading') }}</p>
            <p v-else-if="status === 'error'" class="mt-10 text-sm text-red-700 dark:text-red-300">{{ t('cv.error') }}</p>
            <canvas ref="canvas" class="max-w-full shadow-lg" :class="status === 'ready' ? '' : 'hidden'" />
          </div>

          <footer class="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200/80 bg-paper px-4 py-3 dark:border-navy-800 dark:bg-paper-dark">
            <div class="flex items-center gap-1 text-xs text-ink-muted sm:hidden dark:text-gray-300">
              <button type="button" class="btn-ghost h-8 w-8 !p-0" :disabled="page <= 1" :aria-label="t('cv.prev')" @click="go(page - 1)"><AppIcon name="arrow-left" size="sm" /></button>
              <span class="tabular-nums">{{ page }} / {{ pages || '–' }}</span>
              <button type="button" class="btn-ghost h-8 w-8 !p-0" :disabled="page >= pages" :aria-label="t('cv.next')" @click="go(page + 1)"><AppIcon name="arrow-right" size="sm" /></button>
            </div>
            <div class="ml-auto flex gap-2">
              <a :href="url" target="_blank" rel="noopener" class="btn-secondary"><AppIcon name="external" size="sm" /> {{ t('cv.openTab') }}</a>
              <a :href="url" download class="btn-primary"><AppIcon name="download" size="sm" /> {{ t('cv.download') }}</a>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { site } = useSiteContent()
const { withBase } = useBaseUrl()
const { open, hide } = useCvPreview()

const url = computed(() => withBase('/' + site.value.identity.cvFile))
const canvas = ref<HTMLCanvasElement | null>(null)
const scroller = ref<HTMLElement | null>(null)
const dialog = ref<HTMLElement | null>(null)
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const page = ref(1)
const pages = ref(0)
const zoom = ref(1)

let pdf: any = null
let renderTask: any = null

async function load() {
  status.value = 'loading'
  try {
    const pdfjs: any = await import('pdfjs-dist')
    // El worker se sirve desde public/ (copiado con `npm run pdfjs:worker`) para que no entre en la precarga inicial.
    pdfjs.GlobalWorkerOptions.workerSrc = withBase('/pdf.worker.min.mjs')
    pdf = await pdfjs.getDocument({ url: url.value }).promise
    pages.value = pdf.numPages
    page.value = 1
    await render()
    status.value = 'ready'
  } catch (e) {
    console.error(e)
    status.value = 'error'
  }
}

async function render() {
  if (!pdf || !canvas.value || !scroller.value) return
  renderTask?.cancel?.()
  const p = await pdf.getPage(page.value)
  const base = p.getViewport({ scale: 1 })
  const width = Math.max(scroller.value.clientWidth - 16, 280)
  const fit = width / base.width
  const dpr = window.devicePixelRatio || 1
  const viewport = p.getViewport({ scale: fit * zoom.value * dpr })
  const c = canvas.value
  c.width = viewport.width
  c.height = viewport.height
  c.style.width = `${viewport.width / dpr}px`
  c.style.height = `${viewport.height / dpr}px`
  renderTask = p.render({ canvasContext: c.getContext('2d')!, viewport })
  try {
    await renderTask.promise
  } catch {}
}

const go = (n: number) => {
  if (n < 1 || n > pages.value) return
  page.value = n
}

watch([page, zoom], () => status.value === 'ready' && render())
watch(open, async (v) => {
  if (v) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    dialog.value?.focus()
    if (scroller.value && ro) ro.observe(scroller.value)
    if (status.value !== 'ready') load()
    else render()
  } else {
    document.body.style.overflow = ''
  }
})

let ro: ResizeObserver | null = null
onMounted(async () => {
  ro = new ResizeObserver(() => status.value === 'ready' && render())
  if (open.value) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    dialog.value?.focus()
    if (scroller.value) ro.observe(scroller.value)
    load()
  }
})
onBeforeUnmount(() => ro?.disconnect())
</script>
