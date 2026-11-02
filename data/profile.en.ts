import type { SiteContent } from './types'
import { projectsEn } from './projects.en'

export const en: SiteContent = {
  meta: {
    title: 'Guillermo Verón | Head of Development · Technology Leader',
    description:
      'Head of Development at Encom S.A. I lead engineering teams, define architecture and infrastructure, and build BI and AI for a SaaS business-management platform used by SMEs in Paraguay.',
    ogTitle: 'Guillermo Verón — Head of Development · Technology Leader',
  },
  identity: {
    name: 'Guillermo Verón Fernández',
    shortName: 'Guillermo Verón',
    headline: 'Head of Development · Technology Leader · Senior Software Engineer',
    roles: ['Head of Development', 'Technology Leader', 'Senior Software Engineer'],
    location: 'Luque, Paraguay (Greater Asunción)',
    availability: 'Available on-site, hybrid or remote',
    email: 'guilleveron.gvf.gv@gmail.com',
    linkedin: 'https://www.linkedin.com/in/guillermo-v-b029bb10a',
    github: 'https://github.com/Guilleveron',
    githubUser: 'Guilleveron',
    phone: '+595 962 292 551',
    phoneHref: 'tel:+595962292551',
    photo: '/img/guillermo-veron-352.webp',
    cvFile: 'CV_Head_of_Development_Guillermo_Verón_EN.pdf',
    cvLabel: 'Download CV (PDF)',
  },
  hero: {
    greeting: "Hi, I'm Guillermo.",
    statement: 'I run the Development Department at Encom S.A.',
    support:
      'I lead an engineering team and a production SaaS business-management platform used by SMEs across Paraguay. Ten years of professional experience, four of them in administration, accounting and sales: I turn business needs into architecture, infrastructure, data and AI.',
    ctaPrimary: 'Download CV',
    ctaSecondary: 'Get in touch',
  },
  about: {
    paragraphs: [
      "I'm a technology leader with 10 years of professional experience: four in administration, accounting and sales, and more than six in software development. Since 2025 I have been responsible for the Development Department at Encom S.A., where I lead the evolution of a production SaaS business-management platform (administration, web and mobile points of sale, inventory, SIFEN electronic invoicing, payment methods and e-commerce) used by small and medium-sized businesses in Paraguay.",
      'I combine a degree in Accounting and hands-on experience in administrative and commercial roles with a solid systems background. That lets me translate business needs into technology that streamlines processes and supports decision-making.',
      'I lead technical teams, define architecture and infrastructure (Docker, Kubernetes, cloud), drive the adoption of artificial intelligence in development and in our products, and design management reporting and KPIs (BI) for the different areas of the organisation.',
    ],
    facts: [
      { label: 'Experience', value: '10 years' },
      { label: 'In software', value: '6+ years' },
      { label: 'Current role', value: 'Head of Development, Encom S.A.' },
      { label: 'Based in', value: 'Luque, Paraguay' },
    ],
  },
  competencies: [
    {
      title: 'Leadership & management',
      text: 'Leading development teams, planning and prioritisation, Scrum, team and product KPIs, working with business areas and customers. Previous experience as head of sales.',
    },
    {
      title: 'Business management systems',
      text: 'Design and delivery of ERP/SaaS-type systems: administration, sales and POS, inventory, electronic invoicing (SIFEN), payment methods, e-commerce. System integration through APIs and middleware; process automation.',
    },
    {
      title: 'Data, BI & AI',
      text: 'Management and audit reporting and dashboards with Metabase; KPI design. Integration of large language models (LLMs) into products, such as the FACSIS AI assistant (text and voice, RAG, model cascade), and adoption of AI assistants (Claude Code, GitHub Copilot) in the development cycle.',
    },
    {
      title: 'Infrastructure & security',
      text: 'Docker, Kubernetes (OVH), DigitalOcean and OVH servers. Deployment and operation of production environments; backup, monitoring, access-control and certificate policies.',
    },
    {
      title: 'Quality & process',
      text: 'TDD/BDD, code review, Git/GitHub/GitLab, continuous integration, issue tracking and continuous improvement.',
    },
  ],
  stack: [
    { label: 'Backend', items: ['Java / Spring Boot', 'PHP / Laravel (Jetstream)', 'Node.js'] },
    { label: 'Frontend', items: ['TypeScript', 'Next.js / React', 'Vue / Nuxt', 'Angular', 'Tailwind', 'Bootstrap', 'Vuetify', 'Sass'] },
    { label: 'Mobile', items: ['Capacitor (iOS and Android)'] },
    { label: 'Data', items: ['MySQL', 'PostgreSQL', 'Metabase'] },
    { label: 'Infra / DevOps', items: ['Docker', 'Kubernetes', 'OVH', 'DigitalOcean', 'Git', 'GitHub', 'GitLab', 'Bitbucket'] },
    { label: 'AI', items: ['Claude Code', 'GitHub Copilot', 'LLM integration in products'] },
  ],
  experience: {
    tech: [
      {
        role: 'Head of the Development Department',
        company: 'Encom S.A.',
        url: 'https://encom.lat',
        period: 'Feb 2025 – present',
        start: '2025-02',
    tenureStart: '2023-07',
        current: true,
        note: 'Senior Developer at the same company since Jul 2023 · encom.lat · facsis.com.py',
        bullets: [
          'I lead the Development Department: planning, work assignment, technical leadership, code review and tracking of team and product performance indicators.',
          "Responsible for maintenance, continuous improvement and new features of the company's core system (multi-company SaaS for SMEs): admin panel, web point of sale and mobile app, inventory, payment integrations, electronic invoicing (SIFEN) and e-commerce.",
          'Definition of the system architecture (multi-tenant, multi-currency) and of the quality, performance and scalability strategy; MySQL optimisation in production.',
          'Administration of the production infrastructure on Docker and Kubernetes (OVH), DigitalOcean and OVH servers; backup, monitoring, access-management and security policies.',
          'Design of management and audit reporting and dashboards with Metabase; definition of operational and technical KPIs.',
          'Introduction of AI assistants into the team workflow and development of LLM-based features inside the products.',
          'Development and maintenance of FACSIS, an electronic-invoicing application aimed at mass adoption in Paraguay (Next.js, TypeScript, PostgreSQL, compiled with Capacitor for iOS and Android), also taking part in its commercialisation and customer relations.',
        ],
        tech: ['PHP', 'Laravel', 'Java', 'Spring Boot', 'Node.js', 'TypeScript', 'Next.js', 'React', 'MySQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'Capacitor', 'Metabase', 'Git/GitHub'],
      },
      {
        role: 'Software Engineer',
        company: 'Code100 S.A.',
        url: 'https://code100.com.py',
        period: 'Jan 2023 – Jun 2023',
        start: '2023-01',
        end: '2023-06',
        bullets: [
          'Development and maintenance of digital-certificate systems and integration with external systems through APIs, databases and middleware.',
        ],
        tech: ['Java', 'Spring Boot', 'Node.js', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Git/GitLab'],
      },
      {
        role: 'Software Engineer',
        company: 'Biggie S.A.',
        url: 'https://biggie.com.py',
        period: 'Mar 2022 – Dec 2022',
        start: '2022-03',
        end: '2022-12',
        bullets: [
          'Development and maintenance of the e-commerce site, the internal administrative system and the call-centre system.',
        ],
        tech: ['Nuxt.js', 'Vue.js', 'Angular', 'TypeScript', 'PHP', 'Laravel', 'MySQL', 'Vuetify', 'Tailwind', 'Git/Bitbucket'],
      },
      {
        role: 'Freelance Web Developer',
        company: 'Tecnofans Py',
        period: 'Mar 2020 – Mar 2022',
        start: '2020-03',
        end: '2022-03',
        bullets: [
          'Custom websites and web systems for small businesses, from requirements gathering to production release.',
        ],
        tech: ['Node.js', 'Java', 'Vue.js', 'PHP', 'MySQL', 'PostgreSQL', 'Bootstrap', 'Git/GitHub'],
      },
    ],
    adminIntro:
      'Four years in accounting, treasury, payments, invoicing and commercial management, at companies in different industries and at an accounting firm. That experience gave me first-hand knowledge of the administrative and tax processes I now turn into software.',
    admin: [
      {
        role: 'Head of Sales / Commercial Lead',
        company: 'Estudio Contable El Búho Py',
        period: 'Oct 2018 – Oct 2020',
        start: '2018-10',
        end: '2020-10',
        bullets: [
          "Responsible for the firm's commercial area: handling tax enquiries, receiving and visiting prospective clients, negotiating and financing payment plans, closing sales and onboarding new clients.",
        ],
      },
      {
        role: 'Accounts Payable Administrative Assistant',
        company: 'Durandal S.A. (Grupo Timbo)',
        period: 'Apr 2018 – Sep 2018',
        start: '2018-04',
        end: '2018-09',
        bullets: [
          'In charge of petty cash and supplier payments: invoice entry, payment and control of travel-expense reports, supplier service at the cashier desk and reconciliation of six fixed funds across group companies.',
        ],
      },
      {
        role: 'Accounting Assistant',
        company: 'Motormarket S.A.',
        period: 'Mar 2017 – Mar 2018',
        start: '2017-03',
        end: '2018-03',
        bullets: [
          'Supplier invoice entry, issuing invoices and credit notes, customer collections and central cashier service, supplier payments, interbank transfers, bank reconciliations, loan-interest accrual and account revaluation.',
        ],
      },
      {
        role: 'Accounts Payable Accounting Assistant',
        company: 'Hola Paraguay S.A. (VOX)',
        period: 'Apr 2016 – Feb 2017',
        start: '2016-04',
        end: '2017-02',
        bullets: [
          'Invoice entry in the accounting system, journal entries for loans, guarantees and payroll, interest accrual, bank and fixed-fund reconciliations, budget-availability control, internal purchase authorisations, withholdings and merchandise inventory control.',
        ],
      },
    ],
  },
  projects: projectsEn,
  education: [
    {
      degree: "Bachelor's degree in Accounting (completed)",
      institution: 'Universidad de Desarrollo Sustentable (UDS)',
      period: '2016 – 2020',
    },
    {
      degree: "Bachelor's degree in Systems Analysis (not completed)",
      institution: 'Universidad de Desarrollo Sustentable (UDS)',
      period: '2020 – 2023',
    },
    {
      degree: 'Technical High-School Diploma in Accounting',
      institution: 'Centro de Educación Integral de Luque (C.E.I.L.)',
    },
    {
      degree: 'Ongoing self-directed learning',
      institution: 'Software architecture, cloud infrastructure and applied artificial intelligence',
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'Guarani', level: 'Native' },
    { name: 'English', level: 'B2 (upper-intermediate)' },
  ],
  contact: {
    title: "Let's talk",
    text: "If you're looking for a technical leader who understands the business, write to me. I reply by email or LinkedIn.",
    openTo: 'Open to Technology Manager, CTO or technical-lead roles. On-site, hybrid or remote.',
  },
  faq: [
    {
      q: "What is Guillermo's current role?",
      a: 'He has been Head of the Development Department at Encom S.A. since February 2025. He joined the company in July 2023 as a Senior Developer.',
    },
    {
      q: 'What does he do at Encom?',
      a: 'He leads the development team, defines the architecture (multi-tenant, multi-currency) and infrastructure (Docker, Kubernetes on OVH, DigitalOcean), designs reporting and KPIs with Metabase, and brings AI into the workflow and the products. The platform is a management SaaS for SMEs: administration, web and mobile POS, inventory, SIFEN electronic invoicing, payments and e-commerce.',
    },
    {
      q: 'What is FACSIS?',
      a: 'A SIFEN electronic-invoicing application aimed at mass adoption in Paraguay, with a web app and a mobile app (iOS and Android). It is built with Next.js, TypeScript and PostgreSQL and compiled with Capacitor. Guillermo develops and maintains it and takes part in its commercialisation.',
    },
    {
      q: 'What experience does he have with artificial intelligence?',
      a: 'He designed and built the FACSIS AI assistant: a text and voice chat that drafts invoices, queries sales with charts and Excel reports, answers from the documentation and regulations through RAG (pgvector) and hands off to support. It runs on a model cascade (Claude, Gemini, Qwen, OpenRouter, Groq) with automatic fallback, per-plan quotas and cost control. He also drives the use of Claude Code and GitHub Copilot in the team, and this portfolio\'s assistant uses the same cascade idea.',
    },
    {
      q: 'How much experience does he have?',
      a: 'Ten years of professional experience: four in administration, accounting and sales (2016–2020) and more than six in software development (since 2020).',
    },
    {
      q: 'What is his tech stack?',
      a: 'Backend: Java/Spring Boot, PHP/Laravel, Node.js. Frontend: TypeScript, Next.js/React, Vue/Nuxt, Angular, Tailwind. Mobile: Capacitor. Data: MySQL, PostgreSQL, Metabase. Infra: Docker, Kubernetes, OVH, DigitalOcean. AI: Claude Code, GitHub Copilot and LLM integration in products.',
    },
    {
      q: 'What is his education?',
      a: "Bachelor's degree in Accounting (UDS, 2016–2020, completed), Bachelor's in Systems Analysis (UDS, 2020–2023, not completed) and a technical high-school diploma in Accounting (C.E.I.L.). Ongoing self-directed learning in architecture, cloud and applied AI.",
    },
    {
      q: 'Which languages does he speak?',
      a: 'Native Spanish and Guarani, and English at B2 level.',
    },
    {
      q: 'Where is he based and how does he work?',
      a: 'He lives in Luque, Paraguay (Greater Asunción). He is available for on-site, hybrid or remote work.',
    },
    {
      q: 'How can I contact him?',
      a: 'By email at guilleveron.gvf.gv@gmail.com, by phone or WhatsApp at +595 962 292 551, or on LinkedIn: linkedin.com/in/guillermo-v-b029bb10a. His GitHub is github.com/Guilleveron. His CV (PDF) can be downloaded from the site.',
    },
    {
      q: 'What kind of roles is he looking for?',
      a: 'Technology Manager, CTO or technical-lead roles, where he can combine team leadership, architecture and infrastructure, data/BI and AI with a business perspective.',
    },
    {
      q: 'Does he have experience leading teams?',
      a: 'Yes. Since 2025 he has led the Development Department at Encom (planning, work assignment, code review and team/product KPIs). Earlier, between 2018 and 2020, he was head of sales at an accounting firm.',
    },
  ],
}
