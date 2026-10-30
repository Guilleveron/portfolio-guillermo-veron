# Asistente IA del portafolio (Cloudflare Worker)

El sitio es estático (GitHub Pages), así que la clave de Anthropic no puede vivir en el frontend.
Este Worker hace de proxy: recibe el historial del chat, agrega el *system prompt* con la base de
conocimiento (`src/knowledge.md`, generada desde `data/*.ts`) y reenvía la respuesta de la API de
Anthropic en streaming (SSE) al navegador.

Protecciones incluidas: lista de orígenes permitidos (CORS), límite por IP y hora, tope global
diario en KV, recorte del historial y de la longitud de los mensajes, `max_tokens` acotado y
*prompt caching* del system.

## Puesta en marcha (una vez)

```bash
# 1. Generar la base de conocimiento desde los datos del sitio
npm run knowledge            # en la raíz del repo → worker/src/knowledge.md

# 2. Instalar wrangler y autenticarse en Cloudflare (cuenta gratuita alcanza)
cd worker && npm install && npx wrangler login

# 3. Crear el KV para los límites y pegar el id en wrangler.toml
npx wrangler kv namespace create RL

# 4. Cargar la clave de Anthropic como secreto (usar una clave dedicada con tope de gasto mensual)
npx wrangler secret put ANTHROPIC_API_KEY

# 5. Publicar
npx wrangler deploy
```

El deploy imprime la URL (`https://portfolio-assistant.<cuenta>.workers.dev`).
Configurarla en el sitio como `NUXT_PUBLIC_ASSISTANT_URL`:

- Local: `NUXT_PUBLIC_ASSISTANT_URL=https://... npm run dev`
- GitHub Pages: en el repo, *Settings → Secrets and variables → Actions → Variables*, crear
  `NUXT_PUBLIC_ASSISTANT_URL` con esa URL. El workflow ya la lee.

Sin esa variable el widget funciona en **modo básico**: responde con las preguntas frecuentes
definidas en `data/profile.*.ts` y avisa que no está conectado al modelo.

## Mantenimiento

- Cada vez que cambie el contenido del sitio: `npm run knowledge && cd worker && npx wrangler deploy`.
- Ajustar `MODEL`, `MAX_PER_HOUR` y `MAX_PER_DAY_GLOBAL` en `wrangler.toml`.
- Probar localmente: `cd worker && npx wrangler dev` (pide la clave como `.dev.vars`:
  `ANTHROPIC_API_KEY=...`), y en otra terminal `NUXT_PUBLIC_ASSISTANT_URL=http://localhost:8787 npm run dev`.
