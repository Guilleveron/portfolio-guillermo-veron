import type { SiteContent } from './types'
import { projectsEs } from './projects.es'

export const es: SiteContent = {
  meta: {
    title: 'Guillermo Verón | Jefe de Desarrollo · Líder de Tecnología',
    description:
      'Jefe del Departamento de Desarrollo en Encom S.A. Lidero equipos, defino arquitectura e infraestructura y diseño BI e IA para una plataforma SaaS de gestión empresarial usada por PyMEs en Paraguay.',
    ogTitle: 'Guillermo Verón — Jefe de Desarrollo · Líder de Tecnología',
  },
  identity: {
    name: 'Guillermo Verón Fernández',
    shortName: 'Guillermo Verón',
    headline: 'Jefe de Desarrollo · Líder de Tecnología · Ingeniero de Software Senior',
    roles: ['Jefe de Desarrollo', 'Líder de Tecnología', 'Ingeniero de Software Senior'],
    location: 'Luque, Paraguay (área metropolitana de Asunción)',
    availability: 'Disponible presencial, híbrido o remoto',
    email: 'guilleveron.gvf.gv@gmail.com',
    linkedin: 'https://www.linkedin.com/in/guillermo-v-b029bb10a',
    github: 'https://github.com/Guilleveron',
    githubUser: 'Guilleveron',
    cvFile: 'CV_Gerente_IT_Guillermo_Verón.pdf',
    cvLabel: 'Descargar CV (PDF)',
  },
  hero: {
    greeting: 'Hola, soy Guillermo.',
    statement: 'Dirijo el Departamento de Desarrollo de Encom S.A.',
    support:
      'Lidero un equipo técnico y una plataforma SaaS de gestión empresarial en producción, usada por PyMEs de Paraguay. Diez años de trayectoria, cuatro de ellos en administración, contabilidad y ventas: traduzco necesidades de negocio en arquitectura, infraestructura, datos e inteligencia artificial.',
    ctaPrimary: 'Descargar CV',
    ctaSecondary: 'Hablemos',
  },
  about: {
    paragraphs: [
      'Soy líder tecnológico con 10 años de trayectoria profesional: cuatro en administración, contabilidad y ventas, y más de seis en desarrollo de software. Desde 2025 soy responsable del Departamento de Desarrollo de Encom S.A., donde dirijo la evolución de una plataforma SaaS de gestión empresarial en producción (administración, puntos de venta web y móvil, inventario, facturación electrónica SIFEN, medios de pago y e-commerce) utilizada por pequeñas y medianas empresas de Paraguay.',
      'Combino formación en Contabilidad y experiencia en áreas administrativas y comerciales con una base sólida en sistemas. Eso me permite traducir necesidades de negocio en soluciones tecnológicas que optimizan procesos y facilitan la toma de decisiones.',
      'Lidero equipos técnicos, defino arquitectura e infraestructura (Docker, Kubernetes, nube), impulso la adopción de inteligencia artificial en el desarrollo y en los productos, y diseño reportería e indicadores de gestión (BI) para las distintas áreas de la organización.',
    ],
    facts: [
      { label: 'Trayectoria', value: '10 años' },
      { label: 'En software', value: '6+ años' },
      { label: 'Rol actual', value: 'Jefe de Desarrollo, Encom S.A.' },
      { label: 'Base', value: 'Luque, Paraguay' },
    ],
  },
  competencies: [
    {
      title: 'Liderazgo y gestión',
      text: 'Dirección de equipos de desarrollo, planificación y priorización, Scrum, definición de KPIs de equipo y producto, relación con áreas de negocio y clientes. Experiencia previa como jefe de ventas.',
    },
    {
      title: 'Sistemas de gestión',
      text: 'Diseño e implementación de sistemas tipo ERP/SaaS: administración, ventas y POS, inventario, facturación electrónica (SIFEN), medios de pago, e-commerce. Integración de sistemas vía API y middleware; automatización de procesos.',
    },
    {
      title: 'Datos, BI e IA',
      text: 'Reportería y dashboards de gestión y auditoría con Metabase; diseño de indicadores. Integración de modelos de lenguaje (LLM) en productos y adopción de asistentes de IA (Claude Code, GitHub Copilot) en el ciclo de desarrollo.',
    },
    {
      title: 'Infraestructura y seguridad',
      text: 'Docker, Kubernetes (OVH), DigitalOcean y servidores OVH. Despliegue y operación de entornos productivos; políticas de respaldo, monitoreo, control de accesos y certificados.',
    },
    {
      title: 'Calidad y procesos',
      text: 'TDD/BDD, revisión de código, Git/GitHub/GitLab, integración continua, seguimiento de incidencias y mejora continua.',
    },
  ],
  stack: [
    { label: 'Backend', items: ['Java / Spring Boot', 'PHP / Laravel (Jetstream)', 'Node.js'] },
    { label: 'Frontend', items: ['TypeScript', 'Next.js / React', 'Vue / Nuxt', 'Angular', 'Tailwind', 'Bootstrap', 'Vuetify', 'Sass'] },
    { label: 'Móvil', items: ['Capacitor (iOS y Android)'] },
    { label: 'Datos', items: ['MySQL', 'PostgreSQL', 'Metabase'] },
    { label: 'Infra / DevOps', items: ['Docker', 'Kubernetes', 'OVH', 'DigitalOcean', 'Git', 'GitHub', 'GitLab', 'Bitbucket'] },
    { label: 'IA', items: ['Claude Code', 'GitHub Copilot', 'Integración de LLMs en productos'] },
  ],
  experience: {
    tech: [
      {
        role: 'Jefe del Departamento de Desarrollo',
        company: 'Encom S.A.',
        url: 'https://encom.lat',
        period: 'Feb. 2025 – actualidad',
        start: '2025-02',
        current: true,
        note: 'Desarrollador Senior en la misma compañía desde Jul. 2023 · encom.lat · facsis.com.py',
        bullets: [
          'Lidero el Departamento de Desarrollo: planificación, asignación de trabajo, liderazgo técnico, revisión de código y seguimiento de indicadores de rendimiento del equipo y del producto.',
          'Responsable del mantenimiento, mejora continua y nuevas funcionalidades del sistema principal de la compañía (SaaS multiempresa para PyMEs): panel administrativo, puntos de venta web y aplicación móvil, inventario, integración de medios de pago, facturación electrónica (SIFEN) y e-commerce.',
          'Definición de la arquitectura del sistema (multi-tenant, multi-moneda) y de la estrategia de calidad, rendimiento y escalabilidad; optimización de base de datos MySQL en producción.',
          'Administración de la infraestructura productiva en Docker y Kubernetes (OVH), DigitalOcean y servidores OVH; políticas de backup, monitoreo, gestión de accesos y seguridad.',
          'Diseño de reportería y dashboards de gestión y auditoría con Metabase; definición de KPIs operativos y técnicos.',
          'Incorporación de asistentes de IA al flujo de trabajo del equipo y desarrollo de funcionalidades basadas en LLMs dentro de los productos.',
          'Desarrollo y mantenimiento de FACSIS, aplicación de facturación electrónica orientada a uso masivo en Paraguay (Next.js, TypeScript, PostgreSQL, compilada con Capacitor para iOS y Android), participando además en su comercialización y relación con clientes.',
        ],
        tech: ['PHP', 'Laravel', 'Java', 'Spring Boot', 'Node.js', 'TypeScript', 'Next.js', 'React', 'MySQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'Capacitor', 'Metabase', 'Git/GitHub'],
      },
      {
        role: 'Ingeniero de Software',
        company: 'Code100 S.A.',
        url: 'https://code100.com.py',
        period: 'Ene. 2023 – Jun. 2023',
        start: '2023-01',
        end: '2023-06',
        bullets: [
          'Desarrollo y mantenimiento de sistemas de certificados digitales e integración con sistemas externos vía API, base de datos y middleware.',
        ],
        tech: ['Java', 'Spring Boot', 'Node.js', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Git/GitLab'],
      },
      {
        role: 'Ingeniero de Software',
        company: 'Biggie S.A.',
        url: 'https://biggie.com.py',
        period: 'Mar. 2022 – Dic. 2022',
        start: '2022-03',
        end: '2022-12',
        bullets: [
          'Desarrollo y mantenimiento del e-commerce, del sistema administrativo interno y del sistema de call center.',
        ],
        tech: ['Nuxt.js', 'Vue.js', 'Angular', 'TypeScript', 'PHP', 'Laravel', 'MySQL', 'Vuetify', 'Tailwind', 'Git/Bitbucket'],
      },
      {
        role: 'Desarrollador Web Freelance',
        company: 'Tecnofans Py',
        period: 'Mar. 2020 – Mar. 2022',
        start: '2020-03',
        end: '2022-03',
        bullets: [
          'Desarrollo de sitios y sistemas web a medida para pequeñas empresas, desde el relevamiento de necesidades hasta la puesta en producción.',
        ],
        tech: ['Node.js', 'Java', 'Vue.js', 'PHP', 'MySQL', 'PostgreSQL', 'Bootstrap', 'Git/GitHub'],
      },
    ],
    adminIntro:
      'Cuatro años en contabilidad, tesorería, pagos, facturación y gestión comercial, en empresas de distintos rubros y en un estudio contable. Esa experiencia me dio conocimiento directo de los procesos administrativos y tributarios que hoy traduzco en soluciones tecnológicas.',
    admin: [
      {
        role: 'Jefe de Ventas / Encargado Comercial',
        company: 'Estudio Contable El Búho Py',
        period: 'Oct. 2018 – Oct. 2020',
        start: '2018-10',
        end: '2020-10',
        bullets: [
          'Responsable del área comercial del estudio: atención de consultas tributarias, recepción y visita a potenciales clientes, negociación y financiación de planes de pago, cierre de ventas e incorporación de nuevos clientes a la cartera.',
        ],
      },
      {
        role: 'Auxiliar Administrativo de Egresos',
        company: 'Durandal S.A. (Grupo Timbo)',
        period: 'Abr. 2018 – Sept. 2018',
        start: '2018-04',
        end: '2018-09',
        bullets: [
          'Encargado de caja chica y pago a proveedores: carga de facturas, pago y control de rendición de viáticos, atención a proveedores en caja y conciliación de seis fondos fijos de distintas empresas del grupo.',
        ],
      },
      {
        role: 'Auxiliar Contable',
        company: 'Motormarket S.A.',
        period: 'Mar. 2017 – Mar. 2018',
        start: '2017-03',
        end: '2018-03',
        bullets: [
          'Carga de facturas de proveedores, emisión de facturas y notas de crédito, cobro a clientes y atención en caja central, pago a proveedores, transferencias interbancarias, conciliaciones bancarias, devengamiento de intereses de préstamos y revalúo de cuentas.',
        ],
      },
      {
        role: 'Auxiliar Contable de Egresos',
        company: 'Hola Paraguay S.A. (VOX)',
        period: 'Abr. 2016 – Feb. 2017',
        start: '2016-04',
        end: '2017-02',
        bullets: [
          'Carga de facturas en el sistema contable, asientos de préstamos, garantías y sueldos, devengamiento de intereses, conciliaciones bancarias y de fondo fijo, control de disponibilidad presupuestaria, autorizaciones internas de compra, retenciones y control de inventario de mercaderías.',
        ],
      },
    ],
  },
  projects: projectsEs,
  education: [
    {
      degree: 'Licenciatura en Contabilidad (título obtenido)',
      institution: 'Universidad de Desarrollo Sustentable (UDS)',
      period: '2016 – 2020',
    },
    {
      degree: 'Licenciatura en Análisis de Sistemas (inconclusa)',
      institution: 'Universidad de Desarrollo Sustentable (UDS)',
      period: '2020 – 2023',
    },
    {
      degree: 'Bachillerato Técnico en Contabilidad',
      institution: 'Centro de Educación Integral de Luque (C.E.I.L.)',
    },
    {
      degree: 'Formación continua autodidacta',
      institution: 'Arquitectura de software, infraestructura cloud e inteligencia artificial aplicada',
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Guaraní', level: 'Nativo' },
    { name: 'Inglés', level: 'B2 (intermedio-alto)' },
  ],
  contact: {
    title: 'Hablemos',
    text: 'Si buscás un líder técnico que entienda el negocio, escribime. Respondo por correo o LinkedIn.',
    openTo: 'Abierto a roles de Gerente de Tecnología, CTO o líder técnico. Presencial, híbrido o remoto.',
  },
  faq: [
    {
      q: '¿Cuál es el rol actual de Guillermo?',
      a: 'Es Jefe del Departamento de Desarrollo en Encom S.A. desde febrero de 2025. Entró a la compañía en julio de 2023 como Desarrollador Senior.',
    },
    {
      q: '¿Qué hace en Encom?',
      a: 'Lidera el equipo de desarrollo, define la arquitectura (multi-tenant, multi-moneda) e infraestructura (Docker, Kubernetes en OVH, DigitalOcean), diseña reportería y KPIs con Metabase, e incorpora IA al flujo de trabajo y a los productos. La plataforma es un SaaS de gestión para PyMEs: administración, POS web y móvil, inventario, facturación electrónica SIFEN, medios de pago y e-commerce.',
    },
    {
      q: '¿Qué es FACSIS?',
      a: 'Una aplicación de facturación electrónica SIFEN orientada a uso masivo en Paraguay, con web app y app móvil (iOS y Android). Está construida con Next.js, TypeScript y PostgreSQL, y compilada con Capacitor. Guillermo la desarrolla y mantiene, y participa en su comercialización.',
    },
    {
      q: '¿Cuánta experiencia tiene?',
      a: 'Diez años de trayectoria profesional: cuatro en administración, contabilidad y ventas (2016–2020) y más de seis en desarrollo de software (desde 2020).',
    },
    {
      q: '¿Qué stack tecnológico usa?',
      a: 'Backend: Java/Spring Boot, PHP/Laravel, Node.js. Frontend: TypeScript, Next.js/React, Vue/Nuxt, Angular, Tailwind. Móvil: Capacitor. Datos: MySQL, PostgreSQL, Metabase. Infra: Docker, Kubernetes, OVH, DigitalOcean. IA: Claude Code, GitHub Copilot e integración de LLMs en productos.',
    },
    {
      q: '¿Qué formación tiene?',
      a: 'Licenciatura en Contabilidad (UDS, 2016–2020, título obtenido), Licenciatura en Análisis de Sistemas (UDS, 2020–2023, inconclusa) y Bachillerato Técnico en Contabilidad (C.E.I.L.). Formación continua autodidacta en arquitectura, cloud e IA aplicada.',
    },
    {
      q: '¿Qué idiomas habla?',
      a: 'Español y guaraní nativos, e inglés nivel B2.',
    },
    {
      q: '¿Dónde vive y en qué modalidad trabaja?',
      a: 'Vive en Luque, Paraguay (área metropolitana de Asunción). Está disponible para trabajo presencial, híbrido o remoto.',
    },
    {
      q: '¿Cómo contactarlo?',
      a: 'Por correo a guilleveron.gvf.gv@gmail.com o por LinkedIn: linkedin.com/in/guillermo-v-b029bb10a. Su GitHub es github.com/Guilleveron.',
    },
    {
      q: '¿Qué tipo de roles busca?',
      a: 'Roles de Gerente de Tecnología, CTO o líder técnico, donde pueda combinar liderazgo de equipos, arquitectura e infraestructura, datos/BI e IA con visión de negocio.',
    },
    {
      q: '¿Tiene experiencia liderando equipos?',
      a: 'Sí. Desde 2025 lidera el Departamento de Desarrollo de Encom (planificación, asignación de trabajo, revisión de código y KPIs de equipo y producto). Antes, entre 2018 y 2020, fue jefe de ventas en un estudio contable.',
    },
  ],
}
