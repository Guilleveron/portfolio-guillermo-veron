<template>
  <div>
    <HeroSection />
    <AboutSection />
    <CompetenciesSection />
    <ExperienceSection />
    <ProjectsSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
const { site, locale } = useSiteContent()
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: () => site.value.meta.title,
  description: () => site.value.meta.description,
  ogTitle: () => site.value.meta.ogTitle,
  ogDescription: () => site.value.meta.description,
  ogUrl: `${siteUrl}/`,
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.value.identity.name,
        alternateName: site.value.identity.shortName,
        jobTitle: site.value.identity.roles[0],
        description: site.value.meta.description,
        url: `${siteUrl}/`,
        email: `mailto:${site.value.identity.email}`,
        sameAs: [site.value.identity.linkedin, site.value.identity.github],
        worksFor: { '@type': 'Organization', name: 'Encom S.A.', url: 'https://encom.lat' },
        address: { '@type': 'PostalAddress', addressLocality: 'Luque', addressCountry: 'PY' },
        knowsLanguage: locale.value === 'en' ? ['Spanish', 'Guarani', 'English'] : ['Español', 'Guaraní', 'Inglés'],
        knowsAbout: ['Software architecture', 'Kubernetes', 'Laravel', 'Spring Boot', 'Next.js', 'Metabase', 'Electronic invoicing (SIFEN)', 'LLM integration'],
      }),
    },
  ],
}))
</script>
