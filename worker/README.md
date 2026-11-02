# Asistente IA del portafolio (Cloudflare Worker)

El sitio es estático (GitHub Pages), así que las claves de los proveedores no pueden vivir en el
frontend. Este Worker hace de proxy: recibe el historial del chat, arma el *system prompt* con la base
de conocimiento del idioma pedido (`src/knowledge.es.md` / `knowledge.en.md`, generadas desde
`data/*.ts`) y reenvía la respuesta en streaming con un formato SSE propio, independiente del
proveedor (`{type:'start'|'text'|'done'|'error'}`).

## Cascada de modelos

Igual que el asistente de FACSIS: una lista ordenada `proveedor:modelo` (`LLM_CHAIN` en
`wrangler.toml`). Se saltan los proveedores sin clave. Si uno falla (error HTTP, cuota, timeout o
sin primer token en 12 s) se pasa al siguiente. Cada modelo tiene estado de salud en memoria: dos
fallos seguidos lo banean 60 s (duplicando hasta 1 h), un 429 lo pone en cuarentena el tiempo que
pida el proveedor y un 401/403/404 lo aparta 10 minutos. Si todos están baneados se prueba el que
venció hace más tiempo.

Proveedores soportados y clave de entorno:

| Proveedor | Clave | Base URL |
|---|---|---|
| `qwen` (Alibaba DashScope) | `DASHSCOPE_API_KEY` (+ `QWEN_URL` opcional) | `dashscope-intl.aliyuncs.com/compatible-mode/v1` |
| `openrouter` | `OPENROUTER_API_KEY` | `openrouter.ai/api/v1` |
| `groq` | `GROQ_API_KEY` | `api.groq.com/openai/v1` |
| `gemini` | `GEMINI_API_KEY` | `generativelanguage.googleapis.com/v1beta/openai` |
| `xai` (Grok) | `XAI_API_KEY` | `api.x.ai/v1` |
| `anthropic` | `ANTHROPIC_API_KEY` | API nativa de Messages |

Orden actual (medido el 31/10/2026 con el prompt real, `node scripts/bench-providers.mjs`):
`qwen-flash` ~1,5 s al primer token · `openrouter/google/gemini-2.5-flash-lite` ~0,8 s ·
`openrouter/inclusionai/ling-3.0-flash` ~2,7 s · `groq/openai/gpt-oss-20b` ~0,8 s pero el plan
gratuito permite 8.000 tokens/min (una consulta por minuto) · `gemini-3.7-flash` directo lento o
con 503 por demanda. Ajustá `LLM_CHAIN` cuando cambien los modelos disponibles.

## Protecciones

- Origen permitido (CORS) por `ALLOWED_ORIGINS`; límite por IP/hora y tope diario si se configura
  el KV `RL`; historial recortado a 8 turnos y mensajes a 500 caracteres; `max_tokens` acotado.
- El último mensaje del visitante se envuelve en `<mensaje_visitante>` y se le pega un recordatorio
  final del sistema (misma técnica que FACSIS): por recencia pesa más que cualquier inyección.
- Guardia de fugas: se retienen los primeros 240 caracteres de la respuesta; si aparece un patrón de
  obediencia a inyección o de filtrado del prompt (claves del catálogo, "sin restricciones", etc.) se
  reemplaza la respuesta por una negativa neutra.
- Tarjetas y gráficos: el modelo solo emite claves de un catálogo (```cards) o un JSON acotado
  (```chart); las URLs las resuelve el sitio, nunca el modelo.
- `npm run test:injection` corre 13 casos (rol, prompt leak, datos sensibles, URLs inventadas,
  off-topic, etc.) contra el Worker local. Al 31/10/2026 pasan todos con `qwen-flash` primario.

## Puesta en marcha

```bash
npm run knowledge                 # en la raíz: genera worker/src/knowledge.*.md
cd worker && npm install
# claves en .dev.vars (ignorado por git), una por línea: NOMBRE=valor
npm run dev                       # http://localhost:8787
npm run test:injection            # con el dev corriendo
```

En el sitio, en local: `.env` con `NUXT_PUBLIC_ASSISTANT_URL=http://localhost:8787`.

## Despliegue en Cloudflare (cuenta gratuita)

```bash
cd worker
npx wrangler login
npm run secrets                   # sube todas las variables de .dev.vars como secretos
# opcional: npx wrangler kv namespace create RL  → descomentar el bloque en wrangler.toml
npm run deploy                    # imprime https://portfolio-assistant.<cuenta>.workers.dev
```

Luego, en GitHub → Settings → Secrets and variables → Actions → Variables, crear
`NUXT_PUBLIC_ASSISTANT_URL` con esa URL. Sin ella el widget responde en **modo básico** desde las
preguntas frecuentes de `data/profile.*.ts`.

Cada vez que cambie el contenido del sitio: `npm run knowledge && cd worker && npm run deploy`.
