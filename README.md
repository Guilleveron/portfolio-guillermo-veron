# Portafolio — Guillermo Verón

Sitio personal bilingüe (español por defecto, inglés) publicado en GitHub Pages:
https://guilleveron.github.io/portfolio-guillermo-veron/

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
- `NUXT_PUBLIC_SITE_URL` y `NUXT_APP_BASE_URL`: al pasar a un dominio propio (por ejemplo
  `https://guillermoveron.com`), definir la primera con el dominio y la segunda con `/` en el
  workflow, y configurar el dominio en Settings → Pages (ver sección siguiente).

## Dominio propio

1. Settings → Pages → Custom domain: escribir el dominio y guardar (antes de tocar el DNS).
2. DNS: cuatro registros A del apex a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`, y `www` como CNAME a `guilleveron.github.io`. Si el DNS está en Cloudflare,
   dejar los registros sin proxy (nube gris).
3. Esperar la propagación y activar "Enforce HTTPS".
4. En `.github/workflows/nuxtjs.yml` cambiar `NUXT_APP_BASE_URL` a `/` y agregar
   `NUXT_PUBLIC_SITE_URL`. Con despliegue por Actions no hace falta el archivo `CNAME`.
5. Agregar el dominio nuevo a `ALLOWED_ORIGINS` en `worker/wrangler.toml` y redesplegar el Worker.

## Actualizar contenido

1. Editar `data/profile.*.ts` o `data/projects.*.ts` (ambos idiomas).
2. Reemplazar `public/CV_Gerente_IT_Guillermo_Verón.pdf` si cambia el CV.
3. Si cambió el contenido y el asistente está desplegado: `npm run knowledge` y volver a
   desplegar el Worker.
