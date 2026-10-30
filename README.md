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
| `worker/` | Proxy del asistente IA (Cloudflare Worker) |
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

## Actualizar contenido

1. Editar `data/profile.*.ts` o `data/projects.*.ts` (ambos idiomas).
2. Reemplazar `public/CV_Gerente_IT_Guillermo_Verón.pdf` si cambia el CV.
3. Si cambió el contenido y el asistente está desplegado: `npm run knowledge` y volver a
   desplegar el Worker.
