# Portafolio — Guillermo Verón

Sitio personal bilingüe (español por defecto, inglés), publicado en dos lugares con el mismo código:

- **https://guilleveron.com** (dominio propio, servidor OVH con Docker: ver "Despliegue en OVH").
- **https://guilleveron.github.io/portfolio-guillermo-veron/** (GitHub Pages, por Actions al pushear `master`).

La canónica y las etiquetas Open Graph apuntan siempre al dominio propio.

Stack: Nuxt 4 (generación estática), Tailwind CSS, `@nuxtjs/i18n`, `@nuxt/fonts`
(Inter y Source Serif 4 autoalojadas). Sin backend: el asistente de IA usa un
Cloudflare Worker como proxy (ver `worker/README.md`).

## Estructura

| Ruta | Contenido |
|---|---|
| `data/profile.es.ts`, `data/profile.en.ts` | Perfil, competencias, experiencia, formación, FAQ (fuente de verdad del contenido) |
| `data/projects.es.ts`, `data/projects.en.ts` | Proyectos y casos de estudio |
| `i18n/locales/*.json` | Textos de interfaz (menú, botones, asistente) |
| `components/` | Secciones de la página y el widget del asistente |
| `pages/index.vue` | Página principal (una sola página con anclas) |
| `pages/proyectos/[slug].vue` | Caso de estudio de cada proyecto |
| `public/` | CV en PDF, favicon, imagen Open Graph, capturas (`img/projects`) |
| `worker/` | Proxy del asistente IA (Cloudflare Worker) con cascada de modelos, pruebas de inyección y benchmark |
| `components/CvPreviewModal.vue` | Vista previa del CV con pdf.js (botones "Ver CV" y tarjeta del asistente) |
| `scripts/build-knowledge.mjs` | Genera la base de conocimiento del asistente desde `data/` |

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3200
```

## Build y despliegue

El workflow `.github/workflows/nuxtjs.yml` construye y publica en GitHub Pages en cada push a
`master`:

```bash
NUXT_APP_BASE_URL=/portfolio-guillermo-veron/ npm run deploy   # salida en .output/public
```

Variables opcionales (GitHub → Settings → Secrets and variables → Actions → Variables):

- `NUXT_PUBLIC_ASSISTANT_URL`: URL del Worker del asistente. Sin ella, el widget responde en
  modo básico desde las preguntas frecuentes.
- `NUXT_PUBLIC_SITE_URL` (por defecto `https://guilleveron.com`) y `NUXT_APP_BASE_URL`: el
  workflow de GitHub Pages usa la base `/portfolio-guillermo-veron/`; `scripts/deploy-ovh.sh`
  genera con base `/` para el dominio propio.

## Despliegue en OVH (guilleveron.com)

El sitio se genera en la máquina local y se sube ya construido; en el servidor solo corre un
`nginx:alpine` detrás del Traefik de Coolify (red `coolify`), que emite el certificado de
Let's Encrypt. No toca los demás proyectos del servidor (cada uno es su propio `docker compose`).

```bash
cp .env.deploy.example .env.deploy   # una vez: URL del asistente, alias SSH
scripts/deploy-ovh.sh                # genera con base "/" y sincroniza por rsync
```

Archivos: `deploy/docker-compose.yaml` (contenedor `portfolio-web`, etiquetas de Traefik para
`guilleveron.com` y `www`, redirección HTTP→HTTPS y www→apex) y `deploy/nginx.conf`.
En el servidor queda todo en `/home/ubuntu/portfolio-guillermo-veron/`.

El asistente de IA corre en el mismo servidor como contenedor `portfolio-assistant`
(`api.guilleveron.com`): es el mismo código del Worker, empaquetado con esbuild y ejecutado con
el adaptador `worker/node/server.mjs`. Las claves salen de `worker/.dev.vars` y viajan al
servidor como `assistant.env` (permisos 600, fuera de git). Desplegarlo en Cloudflare sigue
siendo posible (`worker/README.md`); en ese caso definir `NUXT_PUBLIC_ASSISTANT_URL` en `.env.deploy`.

DNS en Cloudflare (una vez): registros `A` de `guilleveron.com` y de `api` a `57.129.104.8`, y
`CNAME` de `www` a `guilleveron.com`. Dejar los tres **sin proxy (nube gris)** al menos hasta
que Traefik obtenga los certificados; después se puede activar el proxy con SSL "Full (strict)".

## Actualizar contenido

1. Editar `data/profile.*.ts` o `data/projects.*.ts` (ambos idiomas).
2. Reemplazar los CV en `public/` si cambian: `CV_Gerente_IT_Guillermo_Verón.pdf` (español) y
   `CV_Head_of_Development_Guillermo_Verón_EN.pdf` (inglés). Las fuentes `.docx` viven en
   `~/Documents/Personales/`; el PDF se exporta desde Word.
3. Si cambió el contenido y el asistente está desplegado: `npm run knowledge` y volver a
   desplegar el Worker.
