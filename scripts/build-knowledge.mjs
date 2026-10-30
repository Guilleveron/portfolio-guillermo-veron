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

  return [
    `# ${c.identity.name} (${locale})`,
    section('Identidad', `${c.identity.headline}\nUbicación: ${c.identity.location}. ${c.identity.availability}.\nEmail: ${c.identity.email}\nLinkedIn: ${c.identity.linkedin}\nGitHub: ${c.identity.github}\nCV: ${c.identity.cvFile}`),
    section('Resumen', c.about.paragraphs.join('\n\n')),
    section('Competencias', c.competencies.map((x) => `- **${x.title}**: ${x.text}`).join('\n')),
    section('Stack', c.stack.map((g) => `- ${g.label}: ${g.items.join(', ')}`).join('\n')),
    section('Experiencia en tecnología', jobs(c.experience.tech)),
    section('Experiencia en administración, contabilidad y ventas', `${c.experience.adminIntro}\n\n${jobs(c.experience.admin)}`),
    section('Proyectos', projects),
    section('Formación', c.education.map((e) => `- ${e.degree} — ${e.institution}${e.period ? ` (${e.period})` : ''}`).join('\n')),
    section('Idiomas', c.languages.map((l) => `- ${l.name}: ${l.level}`).join('\n')),
    section('Contacto y objetivo', `${c.contact.text}\n${c.contact.openTo}`),
    section('Preguntas frecuentes', c.faq.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')),
  ].join('\n')
}

const out = `${build('es')}\n\n---\n\n${build('en')}`
mkdirSync(resolve(root, 'worker/src'), { recursive: true })
writeFileSync(resolve(root, 'worker/src/knowledge.md'), out)
console.log(`knowledge.md: ${out.length} caracteres`)
