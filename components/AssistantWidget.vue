<template>
  <div>
    <button
      type="button"
      class="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-navy-700 pl-4 pr-5 text-sm font-medium text-white shadow-lg shadow-navy-900/20 transition hover:bg-navy-600 focus-visible:ring-2 dark:bg-accent dark:hover:bg-navy-500"
      :class="open ? 'pointer-events-none scale-0 opacity-0 sm:pointer-events-auto sm:scale-100 sm:opacity-100' : ''"
      :aria-label="open ? t('assistant.close') : t('assistant.open')"
      :aria-expanded="open"
      aria-controls="assistant-panel"
      @click="toggle"
    >
      <AppIcon :name="open ? 'x' : 'sparkle'" />
      <span class="hidden sm:inline">{{ open ? t('assistant.close') : t('assistant.title') }}</span>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="translate-y-4 opacity-0"
    >
      <section
        v-if="open"
        id="assistant-panel"
        ref="panel"
        role="dialog"
        aria-modal="false"
        :aria-label="t('assistant.title')"
        class="fixed inset-x-0 bottom-0 z-50 flex h-[min(85dvh,640px)] flex-col overflow-hidden rounded-t-2xl border border-gray-200 bg-paper-raised shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-2xl dark:border-navy-800 dark:bg-paper-dark-raised"
        @keydown.esc="open = false"
      >
        <header class="flex items-center gap-3 border-b border-gray-200/80 px-4 py-3 dark:border-navy-800">
          <Monogram size="sm" decorative />
          <div class="min-w-0 flex-1">
            <h2 class="text-sm font-semibold text-ink dark:text-gray-50">{{ t('assistant.title') }}</h2>
            <p class="truncate text-xs text-ink-soft dark:text-gray-400">{{ t('assistant.subtitle') }}</p>
          </div>
          <button v-if="messages.length" type="button" class="btn-ghost h-9 w-9 !p-0" :title="t('assistant.newChat')" @click="reset">
            <AppIcon name="refresh" size="sm" /><span class="sr-only">{{ t('assistant.newChat') }}</span>
          </button>
          <button type="button" class="btn-ghost h-9 w-9 !p-0" :aria-label="t('assistant.close')" @click="open = false">
            <AppIcon name="x" size="sm" />
          </button>
        </header>

        <div ref="scroller" class="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
          <div class="max-w-[88%] rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2.5 text-ink dark:bg-navy-900/70 dark:text-gray-100">
            {{ t('assistant.greeting') }}
          </div>
          <p v-if="!online" class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            {{ t('assistant.offline') }}
          </p>

          <template v-for="(m, i) in messages" :key="i">
            <div v-if="m.role === 'user'" class="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-navy-700 px-4 py-2.5 text-white dark:bg-accent">
              {{ m.content }}
            </div>
            <div v-else class="max-w-[88%] rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2.5 text-ink dark:bg-navy-900/70 dark:text-gray-100">
              <div v-if="m.content" class="assistant-markdown" v-html="renderMarkdown(m.content)" />
              <p v-else-if="m.local" class="assistant-markdown" v-html="renderMarkdown(t('assistant.noAnswer', { email: site.identity.email }))" />
              <span v-else class="inline-flex items-center gap-1 py-1" :aria-label="t('assistant.thinking')">
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft [animation-delay:0ms]" />
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft [animation-delay:150ms]" />
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft [animation-delay:300ms]" />
              </span>
            </div>
          </template>

          <p v-if="error" role="alert" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            {{ error === 'rate' ? t('assistant.rateLimited') : t('assistant.error') }}
          </p>
        </div>

        <div v-if="!messages.length" class="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          <button
            v-for="s in suggestions"
            :key="s"
            type="button"
            class="shrink-0 rounded-full border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-700 transition hover:bg-navy-50 dark:border-navy-700 dark:text-navy-100 dark:hover:bg-navy-900/60"
            @click="ask(s)"
          >
            {{ s }}
          </button>
        </div>

        <form class="border-t border-gray-200/80 p-3 dark:border-navy-800" @submit.prevent="submit">
          <div class="flex items-end gap-2">
            <label class="sr-only" for="assistant-input">{{ t('assistant.placeholder') }}</label>
            <textarea
              id="assistant-input"
              ref="input"
              v-model="draft"
              rows="1"
              maxlength="500"
              :placeholder="t('assistant.placeholder')"
              class="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-navy-700 dark:bg-navy-950 dark:text-gray-100"
              @keydown.enter.exact.prevent="submit"
              @input="autosize"
            />
            <button v-if="loading" type="button" class="btn-secondary h-11 w-11 !p-0" :aria-label="t('assistant.stop')" @click="stop">
              <AppIcon name="stop" />
            </button>
            <button v-else type="submit" class="btn-primary h-11 w-11 !p-0" :aria-label="t('assistant.send')" :disabled="!draft.trim()">
              <AppIcon name="send" />
            </button>
          </div>
          <p class="mt-2 text-[0.7rem] leading-snug text-ink-soft dark:text-gray-400">
            {{ t('assistant.disclaimer') }} <span v-if="online">· {{ t('assistant.poweredBy') }}</span>
          </p>
        </form>
      </section>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { site } = useSiteContent()
const { messages, loading, error, online, send, stop, reset } = useAssistant()

const open = ref(false)
const draft = ref('')
const input = ref<HTMLTextAreaElement | null>(null)
const scroller = ref<HTMLElement | null>(null)

const suggestions = computed(() => {
  const list = tm('assistant.suggestions') as unknown[]
  return Array.isArray(list) ? list.map((s) => rt(s as string)) : []
})

const toggle = async () => {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    input.value?.focus()
  }
}

const scrollToEnd = async () => {
  await nextTick()
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
}

const ask = async (text: string) => {
  draft.value = ''
  await send(text)
  scrollToEnd()
}

const submit = () => {
  if (!draft.value.trim() || loading.value) return
  const text = draft.value
  draft.value = ''
  if (input.value) input.value.style.height = ''
  ask(text)
}

const autosize = () => {
  const el = input.value
  if (!el) return
  el.style.height = ''
  el.style.height = `${Math.min(el.scrollHeight, 128)}px`
}

watch(() => messages.value.map((m) => m.content).join('\n'), scrollToEnd)
</script>
