// Adaptador Node para correr el Worker del asistente fuera de Cloudflare (contenedor en el
// servidor OVH). Convierte cada petición HTTP de Node en una Request estándar, llama a
// `worker.fetch(request, env)` y devuelve la Response (incluido el streaming SSE).
import { createServer } from 'node:http'
import { Readable } from 'node:stream'
import worker from '../dist/worker.mjs'

const PORT = Number(process.env.PORT || 8787)
const env = { ...process.env }

function toRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`)
  const headers = new Headers()
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x))
    else if (v !== undefined) headers.set(k, v)
  }
  // Traefik pone la IP real del visitante en X-Forwarded-For; el Worker lee CF-Connecting-IP.
  if (!headers.get('cf-connecting-ip')) {
    const xff = headers.get('x-forwarded-for')
    headers.set('cf-connecting-ip', (xff ? xff.split(',')[0].trim() : req.socket.remoteAddress) ?? '')
  }
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
  return new Request(url, { method: req.method, headers, body: hasBody ? Readable.toWeb(req) : undefined, duplex: 'half' })
}

createServer(async (req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain' }).end('ok')
    return
  }
  try {
    const out = await worker.fetch(toRequest(req), env)
    const headers = {}
    out.headers.forEach((v, k) => (headers[k] = v))
    res.writeHead(out.status, headers)
    if (!out.body) return res.end()
    Readable.fromWeb(out.body).pipe(res)
    res.on('close', () => out.body?.cancel?.().catch(() => {}))
  } catch (err) {
    console.error('assistant error', err)
    if (!res.headersSent) res.writeHead(500, { 'content-type': 'text/plain' })
    res.end('error')
  }
}).listen(PORT, '0.0.0.0', () => console.log(`asistente escuchando en :${PORT}`))
