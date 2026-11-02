import { content, type Locale } from '~/data'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  local?: boolean
  provider?: string
  model?: string
}

export type ChartType = 'barras' | 'barras_horizontales' | 'torta' | 'dona' | 'lineas'
export interface ChartSpec {
  tipo: ChartType
  titulo?: string
  formato?: 'entero' | 'anios' | 'porcentaje'
  series: { clave: string; etiqueta: string }[]
  datos: Record<string, string | number>[]
}

export type Block = { kind: 'text'; html: string } | { kind: 'chart'; spec: ChartSpec } | { kind: 'cards'; keys: string[] }

const STOP = new Set(['que', 'cual', 'cuales', 'como', 'donde', 'tiene', 'what', 'which', 'does', 'his', 'the', 'una', 'los', 'las', 'del', 'con', 'para', 'sobre', 'guillermo', 'veron', 'have', 'has', 'and'])

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))

/** Respuesta de respaldo sin modelo: busca la pregunta frecuente más parecida y adjunta tarjetas útiles. */
export function localAnswer(question: string, locale: Locale): string | null {
  const faq = content[locale].faq
  const q = normalize(question)
  if (!q.length) return null
  let best: { score: number; a: string; q: string } | null = null
  for (const item of faq) {
    const words = new Set(normalize(item.q + ' ' + item.a))
    let score = 0
    for (const w of q) {
      if (words.has(w)) score += 1
      else if (w.length >= 5 && [...words].some((x) => x.startsWith(w.slice(0, 5)))) score += 0.5
    }
    if (!best || score > best.score) best = { score, a: item.a, q: item.q }
  }
  if (!best || best.score < 1) return null
  const cards: string[] = []
  if (/contact|contacto|email|correo|whatsapp|tel[eé]fono|phone/i.test(best.q + question)) cards.push('email', 'whatsapp', 'linkedin')
  if (/\bcv\b|curr[ií]cul|resume|hoja de vida/i.test(question)) cards.unshift('cv')
  if (/facsis/i.test(best.q)) cards.push('proyecto:facsis')
  if (/inteligencia artificial|artificial intelligence/i.test(best.q)) cards.push('proyecto:facsis-asistente')
  return cards.length ? `${best.a}\n\n\`\`\`cards\n${JSON.stringify([...new Set(cards)].slice(0, 3))}\n\`\`\`` : best.a
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
      const history = messages.value.slice(0, -1).slice(-8).map((m) => ({ role: m.role, content: m.content }))
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
          try {
            const ev = JSON.parse(line.slice(6))
            if (ev.type === 'text') reply.content += ev.text
            else if (ev.type === 'start') {
              reply.provider = ev.provider
              reply.model = ev.model
            } else if (ev.type === 'error') throw new Error('upstream')
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

/** Markdown mínimo y seguro: negrita, código, enlaces, listas y párrafos. */
export function renderMarkdown(src: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>')
  return src
    .trim()
    .split(/\n{2,}/)
    .map((b) => {
      const lines = b.split('\n').filter((l) => l.trim())
      if (lines.length && lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*•]\s+/, ''))}</li>`).join('')}</ul>`
      }
      return `<p>${lines.map((l) => inline(l.replace(/^#{1,6}\s+/, ''))).join('<br>')}</p>`
    })
    .join('')
}

const CHART_TYPES: ChartType[] = ['barras', 'barras_horizontales', 'torta', 'dona', 'lineas']

export function parseChart(raw: string): ChartSpec | null {
  try {
    const o = JSON.parse(raw)
    if (!o || !CHART_TYPES.includes(o.tipo) || !Array.isArray(o.series) || !Array.isArray(o.datos)) return null
    const series = o.series.filter((s: any) => s && typeof s.clave === 'string').slice(0, 3).map((s: any) => ({ clave: String(s.clave).slice(0, 30), etiqueta: String(s.etiqueta ?? s.clave).slice(0, 30) }))
    const datos = o.datos
      .filter((d: any) => d && typeof d.etiqueta === 'string' && series.some((s: any) => typeof d[s.clave] === 'number' && isFinite(d[s.clave])))
      .slice(0, 8)
      .map((d: any) => {
        const row: Record<string, string | number> = { etiqueta: String(d.etiqueta).slice(0, 40) }
        for (const s of series) row[s.clave] = Number(d[s.clave] ?? 0)
        return row
      })
    if (!series.length || !datos.length) return null
    return { tipo: o.tipo, titulo: typeof o.titulo === 'string' ? o.titulo.slice(0, 80) : undefined, formato: ['entero', 'anios', 'porcentaje'].includes(o.formato) ? o.formato : 'entero', series, datos }
  } catch {
    return null
  }
}

/** Separa la respuesta en texto, gráficos y tarjetas. Un bloque sin cerrar (respuesta en curso) se oculta. */
export function splitBlocks(content: string): Block[] {
  const blocks: Block[] = []
  const re = /```(chart|cards)\s*([\s\S]*?)```/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(content))) {
    const text = content.slice(last, m.index).trim()
    if (text) blocks.push({ kind: 'text', html: renderMarkdown(text) })
    if (m[1] === 'chart') {
      const spec = parseChart(m[2].trim())
      if (spec) blocks.push({ kind: 'chart', spec })
    } else {
      try {
        const keys = JSON.parse(m[2].trim())
        if (Array.isArray(keys)) blocks.push({ kind: 'cards', keys: keys.filter((k) => typeof k === 'string').slice(0, 3) })
      } catch {}
    }
    last = m.index + m[0].length
  }
  const rest = content.slice(last).replace(/```(chart|cards)?[\s\S]*$/, '').trim()
  if (rest) blocks.push({ kind: 'text', html: renderMarkdown(rest) })
  return blocks
}
