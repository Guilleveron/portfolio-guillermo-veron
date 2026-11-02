import type { Locale, SiteContent } from './types'
import { es } from './profile.es'
import { en } from './profile.en'

export const content: Record<Locale, SiteContent> = { es, en }
export * from './types'
