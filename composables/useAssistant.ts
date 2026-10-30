import { content, type Locale } from '~/data'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  local?: boolean
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)

const STOP = new Set(['que', 'cual', 'cuales', 'como', 'donde', 'tiene', 'what', 'which', 'does', 'his', 'the', 'una', 'los', 'las', 'del', 'con', 'para', 'sobre', 'guillermo', 'veron', 'have', 'has', 'and', 'con'])

/** Respuesta de respaldo sin modelo: busca la pregunta frecuente más parecida. */
export function localAnswer(question: string, locale: Locale): string | null {
  const faq = content[locale].faq
  const q = normalize(question).filter((w) => !STOP.has(w))
  if (!q.length) return null
  let best: { score: number; a: string } | null = null
  for (const item of faq) {
    const words = new Set(normalize(item.q + ' ' + item.a).filter((w) => !STOP.has(w)))
    let score = 0
    for (const w of q) {
      if (words.has(w)) score += 1
      else if ([...words].some((x) => x.startsWith(w.slice(0, 5)) && w.length >= 5)) score += 0.5
    }
    if (!best || score > best.score) best = { score, a: item.a }
  }
  return best && best.score >= 1 ? best.a : null
}

export function useAssistant() {
  const { locale } = useI18n()
  const { public: { assistantUrl } } = useRuntimeConfig()

  const messages = useState<ChatMessage[]>('assistant-messages', () => [])
  const loading = ref(false)
  const error = ref<'generic' | 'rate' | null>(null)
  const online = computed(() => Boolean(assistantUrl))
  let controller: AbortController | null = null

  const reset = () => {
    controller?.abort()
    messages.value = []
    error.value = null
    loading.value = false
  }

  const stop = () => controller?.abort()

  const send = async (text: string) => {
    const clean = text.trim().slice(0, 500)
    if (!clean || loading.value) return
    error.value = null
    messages.value.push({ role: 'user', content: clean })

    if (!online.value) {
      const answer = localAnswer(clean, locale.value as Locale)
      messages.value.push({ role: 'assistant', content: answer ?? '', local: true })
      return
    }

    const reply = reactive<ChatMessage>({ role: 'assistant', content: '' })
    messages.value.push(reply)
    loading.value = true
    controller = new AbortController()

    try {
      const history = messages.value
        .slice(0, -1)
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch(assistantUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, locale: locale.value }),
        signal: controller.signal,
      })
      if (res.status === 429) throw Object.assign(new Error('rate'), { kind: 'rate' })
      if (!res.ok || !res.body) throw new Error('bad')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6).trim()
          if (!payload || payload === '[DONE]') continue
          try {
            const ev = JSON.parse(payload)
            if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') reply.content += ev.delta.text
            else if (ev.type === 'error') throw new Error('upstream')
          } catch (e) {
            if ((e as Error).message === 'upstream') throw e
          }
        }
      }
      if (!reply.content.trim()) throw new Error('empty')
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        if (!reply.content) messages.value.splice(messages.value.indexOf(reply), 1)
      } else {
        messages.value.splice(messages.value.indexOf(reply), 1)
        error.value = (e as { kind?: string }).kind === 'rate' ? 'rate' : 'generic'
      }
    } finally {
      loading.value = false
      controller = null
    }
  }

  return { messages, loading, error, online, send, stop, reset }
}

/** Markdown mínimo y seguro: negrita, enlaces, listas y párrafos. */
export function renderMarkdown(src: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>')
  const blocks = src.trim().split(/\n{2,}/)
  return blocks
    .map((b) => {
      const lines = b.split('\n')
      if (lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*•]\s+/, ''))}</li>`).join('')}</ul>`
      }
      return `<p>${lines.map(inline).join('<br>')}</p>`
    })
    .join('')
}
