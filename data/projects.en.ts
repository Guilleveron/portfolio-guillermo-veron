import type { Project } from './types'

export const projectsEn: Project[] = [
  {
    slug: 'encom',
    name: 'SaaS business-management platform — Encom',
    kind: 'work',
    featured: true,
    tagline: 'Multi-company ERP/POS in production for SMEs in Paraguay',
    role: 'Head of Development · architecture · infrastructure',
    period: '2023 – present',
    summary:
      'Multi-company SaaS in production: admin panel, web and mobile points of sale, inventory, SIFEN electronic invoicing, payment methods and e-commerce. I lead the team that maintains and evolves it, and I am responsible for its architecture and infrastructure.',
    stack: ['PHP', 'Laravel', 'Java / Spring Boot', 'MySQL', 'Docker', 'Kubernetes', 'Metabase', 'Capacitor'],
    links: [
      { label: 'encom.lat', href: 'https://encom.lat', kind: 'site' },
      { label: 'encom.com.py', href: 'https://encom.com.py', kind: 'site' },
    ],
    highlights: [
      'Multi-tenant, multi-currency architecture with a MySQL database replicated across clouds (DigitalOcean and OVH).',
      'Operation on Docker and Kubernetes (OVH), with documented backup, monitoring and access-control policies, including a disaster-recovery plan.',
      'Migration of the legacy PHP stack to PHP 8.5 with static analysis and linting in the workflow.',
      'Management and audit reporting and dashboards in Metabase (subscriptions, billing, usage by plan).',
      'More than thirty scheduled processes: recurring billing, electronic-document alerts, certificate expiry, stock, loyalty.',
      'Self-hosted websockets (Pusher-compatible), push notifications and a Capacitor mobile app.',
    ],
    caseStudy: {
      context:
        'Encom is a SaaS management platform for merchants: administration, sales, stock, electronic invoicing, payments and online stores. I joined in July 2023 as a senior developer and have led the Development Department since February 2025.',
      role:
        'I am the main author of the two core systems (admin panel and point of sale) and I define the architecture, the production infrastructure, the quality strategy and the reporting. I also coordinate the surrounding ecosystem: public API for integrators, payments, electronic invoicing, e-commerce, mobile app, POS for Bancard terminals and AI assistant.',
      challenges: [
        'Keeping a legacy PHP system with thousands of active merchants running in production, without interruptions, while adding new features.',
        'Guaranteeing business continuity: a single database, backups, replicas and recovery procedures.',
        'Giving the sales, support and management areas reliable indicators.',
        'Training and organising a small team with clear priorities and delivery quality.',
      ],
      decisions: [
        'Modernise rather than rewrite: gradual migration to PHP 8.5, reproducible Docker environments, static analysis with a baseline and mandatory code review.',
        'Split out services with their own responsibility (document signing, audit, payments, AI) and integrate them through APIs, instead of growing the monolith.',
        'MySQL replica with GTID in a second cloud and a disaster-recovery runbook tested step by step.',
        'Metabase as the BI layer over versioned SQL queries, with indicators for subscriptions, churn, daily billing and usage by plan.',
        'Adoption of AI assistants in the development cycle, with pre-push quality guides and shared conventions in the repository.',
      ],
      outcome:
        'The platform remains in production with continuous releases, the team works with defined branching and review flows, and management has up-to-date dashboards. In parallel, a new generation of the product (modular core in Laravel 12 and a Next.js frontend) was built, which I led at the architecture and roadmap level.',
    },
    architecture: {
      title: 'Ecosystem map',
      nodes: [
        'Admin panel (multi-company back-office) and REST API',
        'Web/PWA point of sale and Android POS for Bancard terminals',
        'Multi-store e-commerce (v1 PHP · v2 Next.js)',
        'Electronic invoicing: SIFEN panel (Laravel) + XML signer (Java)',
        'Payments: vPOS, QR and automatic debit (Bancard)',
        'AI support assistant (RAG) and MCP',
        'MySQL with GTID replica · Redis · Metabase · Kubernetes · Jenkins',
      ],
    },
    images: [{ src: '/img/projects/encom-banner.webp', alt: 'Encom platform brand image', width: 1400, height: 934 }],
  },
  {
    slug: 'facsis',
    name: 'FACSIS — Electronic invoicing with an AI assistant',
    kind: 'work',
    featured: true,
    tagline: 'Web app and mobile app for SIFEN electronic invoicing aimed at mass adoption',
    role: 'Development, architecture, maintenance and commercialisation',
    period: '2025 – present',
    summary:
      'SIFEN electronic-invoicing application aimed at mass adoption in Paraguay. Next.js and TypeScript web app on PostgreSQL, compiled with Capacitor for iOS and Android. It includes an AI assistant that drafts documents and answers sales questions.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Capacitor', 'Redis / BullMQ', 'Kubernetes', 'Anthropic SDK'],
    links: [
      { label: 'facsis.com.py', href: 'https://facsis.com.py', kind: 'site' },
      { label: 'Documentation', href: 'https://docs.facsis.com.py', kind: 'docs' },
    ],
    highlights: [
      'Invoices, credit notes, delivery notes, self-invoices and receipts, fully integrated with the SIFEN pipeline.',
      'Multi-company with roles and invitations, plans and subscriptions, a public REST API with per-company keys and OpenAPI docs.',
      'Text and voice AI assistant that drafts documents, queries sales with charts and reports, and answers from the regulations via RAG.',
      'Designed for high volume: asynchronous issuing with queues, a distributed rate limit and numbering protected by transactional locks.',
      'Card and QR payments, native apps published with Capacitor and deployment on Kubernetes with scheduled jobs.',
    ],
    caseStudy: {
      context:
        'Electronic invoicing is being made mandatory in stages in Paraguay, and many small taxpayers had no simple tool. FACSIS was created as an Encom product for that segment, with a web app and mobile apps.',
      role:
        'I am the main author of the product (the vast majority of commits) and responsible for its architecture, deployment and evolution. I also take part in its commercialisation and customer relations, which gives me direct contact with real usage.',
      challenges: [
        'Meeting the SIFEN technical standard (signing, batches, queries, events) while keeping a simple user experience.',
        'Preparing for high issuing peaks without compromising numbering or document consistency.',
        'Adding AI in a useful and safe way: the model cannot issue documents or invent data.',
        'Controlling AI cost per plan and per customer.',
      ],
      decisions: [
        'Next.js with the App Router and Prisma on PostgreSQL, with a large database modelled by domain (documents, stock, purchases, cash register, subscriptions).',
        'The assistant only uses read tools and creates drafts; issuing is confirmed by the user and is idempotent. Prices and VAT are computed by the server, never by the model.',
        'A chain of model providers with fallback and health monitoring, token quotas per plan and a global monthly spend cap.',
        'RAG with pgvector over the product documentation and the DNIT technical notes.',
        'Staged load tests with a SIFEN mock, queues with exponential retries and per-timbrado locks for numbering.',
      ],
      outcome:
        'FACSIS is in production with apps in the iOS and Android stores, a public API for integrators and an AI assistant available inside the application, with per-message traceability and cost control.',
    },
    images: [
      { src: '/img/projects/facsis-store-1.webp', alt: 'FACSIS presentation screen in the app store', width: 720, height: 1560 },
      { src: '/img/projects/facsis-store-2.webp', alt: 'FACSIS promotional capture with the mobile app', width: 720, height: 1560 },
      { src: '/img/projects/facsis-asistente-dark.webp', alt: 'FACSIS AI assistant showing a sales chart in dark mode (test data)', width: 720, height: 1560 },
    ],
  },
  {
    slug: 'sifen',
    name: 'SIFEN electronic-invoicing pipeline',
    kind: 'work',
    featured: true,
    tagline: 'Validation, digital signing and submission of electronic documents to the tax authority',
    role: 'Main author of the signer and of the e-invoicing panel',
    period: '2023 – present',
    summary:
      'Multi-company service that receives documents, validates them, signs them digitally (XML-DSig with CDC and QR code) and sends them in batches to SIFEN, with status queries, cancellation and void events, and certificate management.',
    stack: ['Laravel', 'Java / Spring Boot', 'XML-DSig', 'MySQL', 'S3', 'Docker', 'Kubernetes', 'Jenkins'],
    links: [],
    highlights: [
      'Java/Spring Boot signer that turns JSON into signed XML for invoices, credit notes and events.',
      'Laravel panel and API for multiple companies: batches, CDC queries, monitor, dashboard and public document lookup.',
      'Scheduled processes for sending and querying batches and signing pending documents.',
      'Internal scalability and security audits of the integration, with an improvement plan (queues, timeouts, certificate caching).',
    ],
    caseStudy: {
      context:
        'Both the Encom platform and FACSIS need to issue electronic documents that are valid before the DNIT. Instead of duplicating that logic, a shared service was built.',
      role: 'I developed most of the Java signer and I am the main author of the Laravel panel. I defined the contracts between the issuing systems and the service.',
      challenges: [
        'Interpreting the SIFEN technical manual and its update notes correctly.',
        'Handling the digital certificates of many companies securely.',
        'Keeping traceability of every document from issuing to approval or rejection.',
      ],
      decisions: [
        'Separate signing (Java, for the maturity of its XML-DSig libraries) from orchestration (Laravel), connected through an API.',
        'Store XML and responses in object storage and expose lookups by RUC and CDC.',
        'Document the pipeline and audit it before scaling volume.',
      ],
      outcome: 'The service processes the documents of both products in production. The audits led to an evolution plan towards asynchronous processing with queues.',
    },
  },
  {
    slug: 'ecommerce-v2',
    name: 'Encom E-commerce v2 — multi-tenant stores',
    kind: 'work',
    featured: true,
    tagline: "A single Next.js application serving all of the platform's online stores",
    role: 'Design and development',
    period: '2026',
    summary:
      "Rewrite of Encom's e-commerce as a Next.js application with no database of its own (a BFF over the panel API). Each merchant gets a store on a subdomain or custom domain, with a live theme editor, per-store SEO and card and QR payments.",
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Bancard', 'MapLibre', 'Vitest', 'Playwright'],
    links: [],
    highlights: [
      'Multi-store by subdomain or custom domain, resolved at the edge of the application.',
      'Theme editor with live preview, sections, templates and versions.',
      'SSR/ISR with Open Graph, JSON-LD, sitemap and robots per store; PWA and push notifications.',
      'Bancard payments (card and QR) reconciled by webhook, with token validation, idempotency and scheduled re-verification.',
      'Open maps (MapLibre, OpenFreeMap), kiosk mode for venues, a delivery-driver app and order tracking.',
    ],
    caseStudy: {
      context:
        'The original e-commerce was a PHP application with jQuery, hard to evolve and limited in performance and SEO. Merchants asked for more control over the design of their stores.',
      role: 'I designed the architecture and wrote the new application, and also hardened the payment integration in the previous version.',
      challenges: [
        'Serving hundreds of stores with a single application without degrading performance.',
        'Not duplicating data: the panel remains the source of truth for products, stock and orders.',
        'Giving non-technical merchants a safe design editor.',
      ],
      decisions: [
        'Backend-for-frontend: the application has no database of its own and consumes the panel API, caching per store.',
        'A Shopify-style theme editor: configurable sections, templates and publishable versions.',
        'Payments with idempotent reconciliation and a single-run QR callback.',
        'Unit and end-to-end tests from the start.',
      ],
      outcome: "A new foundation for the platform's online stores, deployed independently from the panel and customisable per merchant.",
    },
    images: [
      { src: '/img/projects/ecommerce-editor.webp', alt: 'E-commerce theme editor with live preview (demo store)', width: 1400, height: 875 },
      { src: '/img/projects/ecommerce-resumen.webp', alt: 'Overview dashboard of a demo store', width: 1400, height: 875 },
    ],
  },
  {
    slug: 'biggie',
    name: 'E-commerce and internal systems — Biggie',
    kind: 'work',
    tagline: 'Online store, administrative system and call-centre application of a retail chain',
    role: 'Software engineer',
    period: 'Mar 2022 – Dec 2022',
    summary: "Development and maintenance of Biggie's e-commerce, the internal administrative system and the call-centre order-taking application.",
    stack: ['Nuxt.js', 'Vue.js', 'Angular', 'TypeScript', 'Laravel', 'MySQL', 'Vuetify', 'Tailwind'],
    links: [{ label: 'biggie.com.py', href: 'https://biggie.com.py', kind: 'site' }],
    highlights: [
      'E-commerce frontend in Nuxt/Vue and maintenance of the Laravel backend.',
      'Angular call-centre application for taking phone orders.',
      'Digital signage for branches (banner rotation) in Laravel Jetstream.',
    ],
  },
  {
    slug: 'code100',
    name: 'Electronic invoicing and certificate systems — Code100',
    kind: 'work',
    tagline: 'Electronic-invoicing integrations for large companies',
    role: 'Software engineer',
    period: 'Jan 2023 – Jun 2023',
    summary:
      'Development and maintenance of digital-certificate systems and integration with external systems through APIs, databases and middleware, within a SIFEN electronic-invoicing platform for large taxpayers.',
    stack: ['Java', 'Spring Boot', 'Node.js', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'JasperReports'],
    links: [{ label: 'code100.com.py', href: 'https://code100.com.py', kind: 'site' }],
    highlights: [
      'Java web services for generating and sending electronic documents.',
      'Per-client printed-representation (KuDE) templates with JasperReports.',
      'Management of client digital certificates for XML signing.',
    ],
  },
  {
    slug: 'saldu',
    name: 'Saldu — personal finance for iOS',
    kind: 'personal',
    featured: true,
    tagline: 'Native SwiftUI app with widgets, Siri and automatic payment logging',
    role: 'Design, development and branding',
    period: '2026',
    summary:
      'Personal-finance app for iPhone and iPad: transactions, analysis with charts, planning and goals. Home and lock-screen widgets, a Control Center control, Siri shortcuts, automatic logging of Apple Pay payments and iCloud sync.',
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'WidgetKit', 'App Intents', 'CloudKit', 'StoreKit', 'Kotlin (Android)'],
    links: [
      { label: 'Support site', href: 'https://guilleveron.github.io/saldu-app/', kind: 'site' },
      { label: 'GitHub', href: 'https://github.com/Guilleveron/saldu-app', kind: 'github' },
    ],
    highlights: [
      'SwiftUI and SwiftData with iCloud sync and Sign in with Apple and Google.',
      'Widgets, Live Activities and a Control Center control with WidgetKit and App Intents.',
      'Automatic logging of Apple Pay payments through Shortcuts automations.',
      'Analytics with Swift Charts, a StoreKit paywall and an Android port in Kotlin.',
    ],
    images: [
      { src: '/img/projects/saldu-1.webp', alt: 'Saldu transactions screen', width: 720, height: 1565 },
      { src: '/img/projects/saldu-2.webp', alt: 'Saldu spending-analysis screen', width: 720, height: 1565 },
      { src: '/img/projects/saldu-3.webp', alt: 'Saldu insights screen', width: 720, height: 1565 },
    ],
    todo: 'Confirm the App Store link once published.',
  },
  {
    slug: 'catequesis',
    name: 'Catechesis Department — parish platform',
    kind: 'personal',
    tagline: 'Enrolment, document validation and certificates for a community',
    role: 'Design and development',
    period: '2026',
    summary:
      "Platform to manage a parish's catechesis: enrolment without an account, roles with granular permissions, a document-validation chain, certificate issuing and deployment on a self-managed server with Docker.",
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Docker'],
    links: [],
    highlights: ['Scoped access control (granular RBAC).', 'Staged document-validation flow.', 'Certificate generation.'],
  },
  {
    slug: 'factura-preimpresa',
    name: 'Pre-printed invoice tool + MCP server',
    kind: 'personal',
    tagline: 'Local tool to print onto pre-printed invoice books, operable from Claude Code',
    role: 'Design and development',
    period: '2026',
    summary:
      'Local web application to fill in and print invoices onto pre-printed books, with RUC check-digit validation and registry lookup. It exposes an MCP server to create and query sales from an AI assistant.',
    stack: ['Node.js', 'Express 5', 'SQLite', 'MCP', 'Podman'],
    links: [],
    highlights: ['MCP (Model Context Protocol) server to drive the app from Claude Code.', 'Calibrated printing onto physical forms.'],
  },
]
