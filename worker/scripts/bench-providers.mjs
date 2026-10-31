// Mide tiempo al primer token y total por proveedor/modelo con el prompt real del portafolio.
// Uso: node scripts/bench-providers.mjs   (lee .dev.vars; nunca imprime claves)
import { readFileSync } from 'node:fs'
const vars = Object.fromEntries(readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8').split('\n').filter((l) => l && !l.startsWith('#')).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]))
const system = 'Sos el asistente del portafolio de Guillermo Verón. Respondé breve.\n' + readFileSync(new URL('../src/knowledge.es.md', import.meta.url), 'utf8')
const q = process.argv[2] || '¿Qué idiomas habla Guillermo?'
const qwenUrl = (vars.QWEN_URL || '').replace(/\/+$/, '')
const P = {
  gemini: { url: 'https://generativelanguage.googleapis.com/v1beta/openai', key: vars.GEMINI_API_KEY },
  qwen: { url: qwenUrl ? (qwenUrl.endsWith('/v1') ? qwenUrl : qwenUrl + '/compatible-mode/v1') : 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1', key: vars.DASHSCOPE_API_KEY },
  groq: { url: 'https://api.groq.com/openai/v1', key: vars.GROQ_API_KEY },
  openrouter: { url: 'https://openrouter.ai/api/v1', key: vars.OPENROUTER_API_KEY },
}
const combos = (process.argv[3] || 'gemini:gemini-3.7-flash,gemini:gemini-3.7-flash-lite,gemini:gemini-2.5-flash-lite,gemini:gemini-2.5-flash,qwen:qwen3.7-flash,qwen:qwen-flash,qwen:qwen-turbo,openrouter:inclusionai/ling-3.0-flash,openrouter:qwen/qwen3.7-flash,openrouter:google/gemini-2.5-flash-lite,groq:llama-3.3-70b-versatile,groq:openai/gpt-oss-20b').split(',')
for (const c of combos) {
  const [prov, ...rest] = c.split(':')
  const model = rest.join(':')
  const p = P[prov]
  if (!p?.key) { console.log(`${c}: sin clave`); continue }
  const t0 = Date.now()
  let ttfb = 0, text = '', status = 0, err = ''
  try {
    const res = await fetch(`${p.url}/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${p.key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model, stream: true, temperature: 0.2, max_tokens: 300, messages: [{ role: 'system', content: system }, { role: 'user', content: q }], ...(prov === 'gemini' && /3\./.test(model) ? { reasoning_effort: 'low' } : {}) }), signal: AbortSignal.timeout(60000) })
    status = res.status
    if (!res.ok) err = (await res.text()).slice(0, 160)
    else {
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = ''
      for (;;) { const { done, value } = await reader.read(); if (done) break; buf += dec.decode(value, { stream: true }); const lines = buf.split('\n'); buf = lines.pop(); for (const l of lines) { if (!l.startsWith('data:')) continue; const pl = l.slice(5).trim(); if (!pl || pl === '[DONE]') continue; try { const ev = JSON.parse(pl); const d = ev.choices?.[0]?.delta?.content; if (d) { if (!ttfb) ttfb = Date.now() - t0; text += d } } catch {} } }
    }
  } catch (e) { err = e.name + ' ' + e.message }
  console.log(`${c.padEnd(44)} status=${status} ttfb=${ttfb ? (ttfb / 1000).toFixed(1) + 's' : '-'} total=${((Date.now() - t0) / 1000).toFixed(1)}s ${err ? 'ERR ' + err.replace(/\s+/g, ' ') : text.replace(/\s+/g, ' ').slice(0, 70)}`)
}
