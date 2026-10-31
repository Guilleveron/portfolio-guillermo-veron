// Genera worker/src/knowledge.md a partir de los datos del sitio (data/*.ts).
// Uso: npm run knowledge
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const jiti = createJiti(import.meta.url)
const { content } = await jiti.import(resolve(root, 'data/index.ts'))

const section = (title, body) => `## ${title}\n\n${body.trim()}\n`
const list = (items) => items.map((i) => `- ${i}`).join('\n')

function build(locale) {
  const c = content[locale]
  const jobs = (arr) =>
    arr
      .map(
        (j) =>
          `### ${j.role} — ${j.company} (${j.period})${j.note ? `\n${j.note}` : ''}\n${list(j.bullets)}${j.tech ? `\nTecnologías: ${j.tech.join(', ')}` : ''}`,
      )
      .join('\n\n')
  const projects = c.projects
    .map((p) => {
      const parts = [
        `### ${p.name} (${p.period}) — ${p.role}`,
        p.summary,
        `Stack: ${p.stack.join(', ')}`,
        p.links.length ? `Enlaces: ${p.links.map((l) => `${l.label} ${l.href}`).join(' · ')}` : '',
        list(p.highlights),
      ]
      if (p.caseStudy) {
        parts.push(`Contexto: ${p.caseStudy.context}`, `Rol: ${p.caseStudy.role}`, `Resultado: ${p.caseStudy.outcome}`)
      }
      return parts.filter(Boolean).join('\n')
    })
    .join('\n\n')

  const meses = (j) => {
    const [y1, m1] = (j.tenureStart ?? j.start).split('-').map(Number)
    const fin = j.end ? j.end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1]
    return (fin[0] - y1) * 12 + (fin[1] - m1) + 1
  }
  const anios = (m) => Math.round((m / 12) * 10) / 10
  const en = locale === 'en'
  const y = en ? 'years' : 'años'
  const porEmpresa = [...c.experience.tech, ...c.experience.admin].map((j) => `- ${j.company} (${j.role}): ${anios(meses(j))} ${y} (${j.period})`)
  const mTech = c.experience.tech.reduce((a, j) => a + meses(j), 0)
  const mAdmin = c.experience.admin.reduce((a, j) => a + meses(j), 0)
  const numerico = [
    en ? 'Years of experience per company (computed from the dates; rounded to one decimal):' : 'Años de experiencia por empresa (calculados desde las fechas; redondeados a un decimal):',
    ...porEmpresa,
    en
      ? `Years per area: technology/software ${anios(mTech)} years; administration, accounting and sales ${anios(mAdmin)} years.`
      : `Años por área: tecnología/software ${anios(mTech)} años; administración, contabilidad y ventas ${anios(mAdmin)} años.`,
    `${en ? 'Technologies per stack group' : 'Tecnologías por grupo del stack'}: ${c.stack.map((g) => `${g.label} ${g.items.length}`).join(', ')}.`,
    en
      ? `Projects on the site: ${c.projects.filter((p) => p.kind === 'work').length} professional and ${c.projects.filter((p) => p.kind === 'personal').length} personal.`
      : `Proyectos en el sitio: ${c.projects.filter((p) => p.kind === 'work').length} profesionales y ${c.projects.filter((p) => p.kind === 'personal').length} personales.`,
    `${en ? 'Languages' : 'Idiomas'}: ${c.languages.length}.`,
  ].join('\n')

  return [
    `# ${c.identity.name} (${locale})`,
    section('Identidad', `${c.identity.headline}\nUbicación: ${c.identity.location}. ${c.identity.availability}.\nEmail: ${c.identity.email}\nTeléfono / WhatsApp: ${c.identity.phone}\nLinkedIn: ${c.identity.linkedin}\nGitHub: ${c.identity.github}\nCV en PDF: disponible para descargar y ver en el sitio (tarjeta "cv").`),
    section('Resumen', c.about.paragraphs.join('\n\n')),
    section('Competencias', c.competencies.map((x) => `- **${x.title}**: ${x.text}`).join('\n')),
    section('Stack', c.stack.map((g) => `- ${g.label}: ${g.items.join(', ')}`).join('\n')),
    section('Experiencia en tecnología', jobs(c.experience.tech)),
    section('Experiencia en administración, contabilidad y ventas', `${c.experience.adminIntro}\n\n${jobs(c.experience.admin)}`),
    section('Proyectos', projects),
    section('Formación', c.education.map((e) => `- ${e.degree} — ${e.institution}${e.period ? ` (${e.period})` : ''}`).join('\n')),
    section('Idiomas', c.languages.map((l) => `- ${l.name}: ${l.level}`).join('\n')),
    section('Contacto y objetivo', `${c.contact.text}\n${c.contact.openTo}`),
    section(en ? 'Numeric data (for charts)' : 'Datos numéricos (para gráficos)', numerico),
    section('Preguntas frecuentes', c.faq.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')),
  ].join('\n')
}

mkdirSync(resolve(root, 'worker/src'), { recursive: true })
for (const locale of ['es', 'en']) {
  const out = build(locale)
  writeFileSync(resolve(root, `worker/src/knowledge.${locale}.md`), out)
  console.log(`knowledge.${locale}.md: ${out.length} caracteres`)
}
