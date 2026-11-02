export interface CardItem {
  key: string
  title: string
  description: string
  href?: string
  to?: string
  icon: string
  external?: boolean
  action?: 'cv'
}

/** Catálogo de tarjetas que el asistente puede pedir por clave. Las URLs nunca las escribe el modelo. */
export const useCards = () => {
  const { t } = useI18n()
  const { site } = useSiteContent()
  const { withBase } = useBaseUrl()

  const resolve = (key: string): CardItem | null => {
    const id = site.value.identity
    switch (key) {
      case 'cv':
        return { key, title: t('cards.cv'), description: t('cards.cvDesc'), href: withBase('/' + id.cvFile), icon: 'file', action: 'cv' }
      case 'linkedin':
        return { key, title: 'LinkedIn', description: 'linkedin.com/in/guillermo-v-b029bb10a', href: id.linkedin, icon: 'linkedin', external: true }
      case 'github':
        return { key, title: 'GitHub', description: `github.com/${id.githubUser}`, href: id.github, icon: 'github', external: true }
      case 'email':
        return { key, title: t('contact.email'), description: id.email, href: `mailto:${id.email}`, icon: 'mail' }
      case 'whatsapp':
        return { key, title: 'WhatsApp', description: id.phone, href: `https://wa.me/${id.phoneHref.replace(/\D/g, '')}`, icon: 'phone', external: true }
      default: {
        if (!key.startsWith('proyecto:')) return null
        const slug = key.slice('proyecto:'.length)
        const p = site.value.projects.find((x) => x.slug === slug)
        if (!p) return null
        return p.caseStudy
          ? { key, title: p.name, description: p.tagline, to: `/proyectos/${p.slug}`, icon: 'folder' }
          : { key, title: p.name, description: p.tagline, href: p.links[0]?.href, icon: 'folder', external: true }
      }
    }
  }

  const resolveAll = (keys: string[]) => {
    const seen = new Set<string>()
    return keys.map(resolve).filter((c): c is CardItem => Boolean(c) && !seen.has(c!.key) && Boolean(seen.add(c!.key)))
  }

  return { resolve, resolveAll }
}
