export type Locale = 'es' | 'en'

export interface Link {
  label: string
  href: string
  kind?: 'site' | 'github' | 'store' | 'docs'
}

export interface Job {
  role: string
  company: string
  url?: string
  period: string
  start: string
  /** Inicio real en la empresa cuando el rol actual empezó después (p. ej. ascenso). */
  tenureStart?: string
  end?: string
  current?: boolean
  note?: string
  bullets: string[]
  tech?: string[]
}

export interface Competency {
  title: string
  text: string
}

export interface StackGroup {
  label: string
  items: string[]
}

export interface CaseStudy {
  context: string
  role: string
  challenges: string[]
  decisions: string[]
  outcome: string
  disclaimer?: string
}

export interface Project {
  slug: string
  name: string
  kind: 'work' | 'personal'
  featured?: boolean
  tagline: string
  role: string
  period: string
  summary: string
  stack: string[]
  links: Link[]
  highlights: string[]
  caseStudy?: CaseStudy
  architecture?: { title: string; nodes: string[] }
  images?: { src: string; alt: string; width: number; height: number }[]
  todo?: string
}

export interface Education {
  degree: string
  institution: string
  period?: string
  note?: string
}

export interface Faq {
  q: string
  a: string
}

export interface SiteContent {
  meta: {
    title: string
    description: string
    ogTitle: string
  }
  identity: {
    name: string
    shortName: string
    headline: string
    roles: string[]
    location: string
    availability: string
    email: string
    linkedin: string
    github: string
    githubUser: string
    phone: string
    phoneHref: string
    photo: string
    cvFile: string
    cvLabel: string
  }
  hero: {
    greeting: string
    statement: string
    support: string
    ctaPrimary: string
    ctaSecondary: string
  }
  about: {
    paragraphs: string[]
    facts: { label: string; value: string }[]
  }
  competencies: Competency[]
  stack: StackGroup[]
  experience: {
    techIntro?: string
    tech: Job[]
    adminIntro: string
    admin: Job[]
  }
  projects: Project[]
  education: Education[]
  languages: { name: string; level: string }[]
  contact: {
    title: string
    text: string
    openTo: string
  }
  faq: Faq[]
}
