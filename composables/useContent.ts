import { content, type Locale, type SiteContent } from '~/data'

export const useSiteContent = () => {
  const { locale } = useI18n()
  const site = computed<SiteContent>(() => content[(locale.value as Locale) in content ? (locale.value as Locale) : 'es'])
  return { site, locale }
}
