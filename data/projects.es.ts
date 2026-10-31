import type { Project } from './types'

export const projectsEs: Project[] = [
  {
    slug: 'encom',
    name: 'Plataforma SaaS de gestión empresarial — Encom',
    kind: 'work',
    featured: true,
    tagline: 'ERP/POS multiempresa en producción para PyMEs de Paraguay',
    role: 'Jefe de Desarrollo · arquitectura · infraestructura',
    period: '2023 – actualidad',
    summary:
      'SaaS multiempresa en producción: panel administrativo, puntos de venta web y móvil, inventario, facturación electrónica SIFEN, medios de pago y e-commerce. Lidero el equipo que lo mantiene y evoluciona, y soy responsable de su arquitectura e infraestructura.',
    stack: ['PHP', 'Laravel', 'Java / Spring Boot', 'MySQL', 'Docker', 'Kubernetes', 'Metabase', 'Capacitor'],
    links: [
      { label: 'encom.lat', href: 'https://encom.lat', kind: 'site' },
      { label: 'encom.com.py', href: 'https://encom.com.py', kind: 'site' },
      { label: 'Documentación', href: 'https://docs.encom.com.py/', kind: 'docs' },
    ],
    highlights: [
      'Arquitectura multi-tenant y multi-moneda con una base MySQL con réplica entre nubes (DigitalOcean y OVH).',
      'Operación en Docker y Kubernetes (OVH), con políticas de respaldo, monitoreo y control de accesos documentadas, incluido un plan de recuperación ante desastres.',
      'Migración del stack PHP heredado a PHP 8.5 con análisis estático y linting en el flujo de trabajo.',
      'Reportería y dashboards de gestión y auditoría en Metabase (suscripciones, facturación, uso por plan).',
      'Más de treinta procesos programados: facturación recurrente, alertas de documentos electrónicos, vencimiento de certificados, stock, fidelización.',
      'Websockets autoalojados (compatible con Pusher), notificaciones push y app móvil con Capacitor.',
    ],
    caseStudy: {
      context:
        'Encom es una plataforma SaaS de gestión para comercios: administración, ventas, stock, facturación electrónica, pagos y tiendas online. Entré en julio de 2023 como desarrollador senior y desde febrero de 2025 dirijo el Departamento de Desarrollo.',
      role:
        'Soy el autor principal de los dos sistemas centrales (panel administrativo y punto de venta) y defino la arquitectura, la infraestructura productiva, la estrategia de calidad y la reportería. Coordino además el ecosistema que los rodea: API pública para integradores, pagos, facturación electrónica, e-commerce, app móvil, POS para terminales Bancard y asistente de IA.',
      challenges: [
        'Mantener en producción, sin interrupciones, un sistema heredado en PHP con miles de comercios activos, mientras se incorporan funcionalidades nuevas.',
        'Garantizar la continuidad del negocio: base de datos única, respaldos, réplicas y procedimientos de recuperación.',
        'Dar visibilidad a las áreas comerciales, de soporte y de dirección con indicadores confiables.',
        'Formar y organizar un equipo pequeño con prioridades claras y calidad de entrega.',
      ],
      decisions: [
        'Modernizar antes que reescribir: migración gradual a PHP 8.5, entornos Docker reproducibles, análisis estático con baseline y revisión de código obligatoria.',
        'Separar servicios con responsabilidad propia (firmado de documentos, auditoría, pagos, IA) e integrarlos por API, en lugar de seguir creciendo el monolito.',
        'Réplica MySQL con GTID en una segunda nube y runbook de recuperación ante desastres probado paso a paso.',
        'Metabase como capa de BI sobre consultas SQL versionadas, con indicadores de suscripciones, churn, facturación diaria y uso por plan.',
        'Adopción de asistentes de IA en el ciclo de desarrollo, con guías de calidad previas al push y convenciones compartidas en el repositorio.',
      ],
      outcome:
        'La plataforma sigue en producción con lanzamientos continuos, el equipo trabaja con flujos de ramas y revisiones definidos, y la dirección cuenta con tableros de gestión actualizados. En paralelo se construyó una nueva generación del producto (núcleo modular en Laravel 12 y frontend en Next.js) que lideré a nivel de arquitectura y roadmap.',
    },
    architecture: {
      title: 'Mapa del ecosistema',
      nodes: [
        'Panel administrativo (back-office multiempresa) y API REST',
        'Punto de venta web/PWA y POS Android para terminales Bancard',
        'E-commerce multi-tienda (v1 PHP · v2 Next.js)',
        'Facturación electrónica: panel SIFEN (Laravel) + firmador XML (Java)',
        'Pagos: vPOS, QR y débito automático (Bancard)',
        'Asistente de soporte con IA (RAG) y MCP',
        'MySQL con réplica GTID · Redis · Metabase · Kubernetes · Jenkins',
      ],
    },
    images: [
      { src: '/img/projects/encom-banner.webp', alt: 'Imagen institucional de la plataforma Encom', width: 1400, height: 934 },
    ],
  },
  {
    slug: 'facsis',
    name: 'FACSIS — Facturación electrónica con asistente de IA',
    kind: 'work',
    featured: true,
    tagline: 'Web app y app móvil de facturación electrónica SIFEN para uso masivo',
    role: 'Desarrollo, arquitectura, mantenimiento y comercialización',
    period: '2025 – actualidad',
    summary:
      'Aplicación de facturación electrónica SIFEN orientada a uso masivo en Paraguay. Web app en Next.js y TypeScript con PostgreSQL, compilada con Capacitor para iOS y Android. Incluye un asistente de IA que redacta documentos y responde consultas de ventas.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Capacitor', 'Redis / BullMQ', 'Kubernetes', 'Anthropic SDK'],
    links: [
      { label: 'facsis.com.py', href: 'https://facsis.com.py', kind: 'site' },
      { label: 'Documentación', href: 'https://docs.facsis.com.py', kind: 'docs' },
    ],
    highlights: [
      'Facturas, notas de crédito, remisiones, autofacturas y recibos, con integración completa al pipeline SIFEN.',
      'Multiempresa con roles e invitaciones, planes y suscripciones, API REST pública con claves por empresa y documentación OpenAPI.',
      'Asistente de IA por texto y voz (ver caso aparte) que redacta borradores, consulta ventas con gráficos y reportes, y responde desde la normativa con RAG.',
      'Diseño para alto volumen: emisión asíncrona con colas, límite de tasa distribuido y numeración protegida con bloqueos transaccionales.',
      'Pagos con tarjeta y QR, apps nativas publicadas con Capacitor y despliegue en Kubernetes con tareas programadas.',
    ],
    caseStudy: {
      context:
        'La facturación electrónica es obligatoria de forma progresiva en Paraguay y muchos contribuyentes pequeños no tenían una herramienta simple. FACSIS nace como producto propio de Encom para cubrir ese segmento, con una web app y apps móviles.',
      role:
        'Soy el autor principal del producto (la gran mayoría de los commits) y responsable de su arquitectura, despliegue y evolución. También participo en su comercialización y en la relación con clientes, lo que me da contacto directo con el uso real.',
      challenges: [
        'Cumplir el estándar técnico de SIFEN (firmado, lotes, consultas, eventos) manteniendo una experiencia simple para el usuario.',
        'Prepararse para picos de emisión altos sin comprometer la numeración ni la consistencia de los documentos.',
        'Incorporar IA de forma útil y segura: el modelo no puede emitir documentos ni inventar datos.',
        'Controlar el costo de la IA por plan y por cliente.',
      ],
      decisions: [
        'Next.js con App Router y Prisma sobre PostgreSQL, con una base de datos extensa pero modelada por dominios (documentos, stock, compras, caja, suscripciones).',
        'El asistente solo usa herramientas de lectura y crea borradores; la emisión la confirma el usuario y es idempotente. Los cálculos de precios e IVA los hace el servidor, nunca el modelo.',
        'Cadena de proveedores de modelos con fallback y monitoreo de salud, cuotas de tokens por plan y tope de gasto mensual global.',
        'RAG con pgvector sobre la documentación del producto y las notas técnicas de la DNIT.',
        'Pruebas de carga por etapas con un mock de SIFEN, colas con reintentos exponenciales y bloqueos por timbrado para la numeración.',
      ],
      outcome:
        'FACSIS está en producción con apps en las tiendas de iOS y Android, API pública para integradores y asistente de IA disponible dentro de la aplicación, con trazabilidad por mensaje y control de costos.',
    },
    images: [
      { src: '/img/projects/facsis-store-1.webp', alt: 'Pantalla de presentación de FACSIS en la tienda de aplicaciones', width: 720, height: 1560 },
      { src: '/img/projects/facsis-store-2.webp', alt: 'Captura promocional de FACSIS con la app móvil', width: 720, height: 1560 },
      { src: '/img/projects/facsis-asistente-dark.webp', alt: 'Asistente de IA de FACSIS mostrando un gráfico de ventas en modo oscuro (datos de prueba)', width: 720, height: 1560 },
    ],
  },
  {
    slug: 'facsis-asistente',
    name: 'Asistente de IA de FACSIS',
    kind: 'work',
    featured: true,
    tagline: 'Un asistente por texto y voz que redacta facturas, consulta ventas y responde desde la normativa',
    role: 'Diseño, arquitectura y desarrollo',
    period: 'Ago. 2026 – actualidad',
    summary:
      'Asistente conversacional integrado en FACSIS (web y apps móviles). Redacta borradores de facturas desde texto o una nota de voz, consulta ventas con gráficos y reportes en Excel, explica la documentación y la normativa de la DNIT con RAG, y deriva a soporte humano. Funciona sobre una cascada de modelos con fallback automático y control de costos por plan.',
    stack: ['Next.js', 'TypeScript', 'Anthropic SDK', 'OpenAI-compatible APIs', 'PostgreSQL + pgvector', 'Redis', 'Whisper (STT)', 'Recharts'],
    links: [{ label: 'facsis.com.py', href: 'https://facsis.com.py', kind: 'site' }],
    highlights: [
      'Emisión asistida con seguridad: el modelo solo usa herramientas de lectura y crea borradores; el usuario confirma la emisión, que es idempotente. Precios e IVA los calcula el servidor.',
      'Entrada por voz: la nota se transcribe con Whisper y el audio se descarta.',
      'Consultas de ventas con gráficos (barras, torta, series) y reportes en Excel generados a pedido; estado de cuenta de clientes.',
      'RAG sobre la documentación del producto y las notas técnicas de SIFEN con embeddings en pgvector; respuestas con enlaces e imágenes de la guía.',
      'Cascada de proveedores (Claude, Gemini, Qwen, OpenRouter, Groq) con salud por modelo, cuarentena y fallback automático; prompt caching para abaratar el contexto.',
      'Cuotas de tokens por plan y ciclo, tope de gasto mensual global, trazabilidad por mensaje y panel de administración con costos, feedback, proveedores y cadena de modelos.',
      'Tours guiados dentro de la app y avatar animado con sincronización labial; batería de pruebas que comparó modelos antes de elegir la cadena.',
    ],
    caseStudy: {
      context:
        'Muchos usuarios de FACSIS no son técnicos y facturan desde el teléfono. Queríamos que pudieran emitir, consultar y aprender a usar el sistema conversando, sin que la IA pudiera equivocarse en algo fiscal.',
      role: 'Diseñé la arquitectura, escribí el servicio (orquestación, herramientas, RAG, cascada de modelos, cuotas) y la interfaz del chat, y definí las reglas de seguridad del asistente.',
      challenges: [
        'Evitar alucinaciones en un dominio fiscal: el asistente no puede inventar clientes, precios ni emitir por su cuenta.',
        'Mantener el servicio disponible y barato con proveedores gratuitos o de bajo costo que fallan o limitan el uso.',
        'Dar respuestas útiles sobre la normativa sin que el modelo se la invente.',
        'Controlar el gasto por cliente sin arruinar la experiencia.',
      ],
      decisions: [
        'Herramientas con permisos mínimos: búsqueda de clientes y productos, borradores, consultas de ventas y series, reportes, documentación, enlaces y tours. La emisión final es una acción explícita del usuario.',
        'Cadena de modelos configurable desde el panel, con estado de salud por modelo en Redis (ban progresivo, cuarentena por cuota, llamada única de prueba) para que un proveedor caído no deje mudo al asistente.',
        'RAG por fragmentos con reranking y citas; las imágenes y enlaces salen de un catálogo, nunca de URLs escritas por el modelo.',
        'System prompt partido en bloque estable (cacheado) y bloque variable, con recordatorio final por recencia; nunca entra un dato del usuario al bloque cacheado.',
        'Cuotas por plan, tope mensual global y registro de costo real por mensaje; el usuario ve su consumo del día y del ciclo.',
      ],
      outcome:
        'El asistente está en producción en FACSIS web, iOS y Android. Este mismo portafolio reutiliza la idea: el asistente que ves abajo a la derecha corre sobre una cascada de modelos con fallback.',
    },
    images: [
      { src: '/img/projects/facsis-ia-02-panel-abierto.webp', alt: 'Panel del asistente de FACSIS recién abierto con sugerencias', width: 720, height: 1566 },
      { src: '/img/projects/facsis-ia-07-nota-de-voz.webp', alt: 'Respuesta del asistente con tarjetas de enlace tras una nota de voz', width: 720, height: 1566 },
      { src: '/img/projects/facsis-ia-11-margen-productos.webp', alt: 'Gráfico de margen por producto generado por el asistente (datos de prueba)', width: 720, height: 1566 },
      { src: '/img/projects/facsis-ia-15-documentacion.webp', alt: 'Explicación de la documentación con enlace a la sección de timbrados', width: 720, height: 1566 },
    ],
  },
  {
    slug: 'sifen',
    name: 'Pipeline de facturación electrónica SIFEN',
    kind: 'work',
    featured: true,
    tagline: 'Validación, firma digital y envío de documentos electrónicos a la DNIT',
    role: 'Autor principal del firmador y del panel de facturación electrónica',
    period: '2023 – actualidad',
    summary:
      'Servicio multiempresa que recibe documentos, los valida, los firma digitalmente (XML-DSig con CDC y código QR) y los envía en lotes a SIFEN, con consulta de estados, eventos de cancelación e inutilización y gestión de certificados.',
    stack: ['Laravel', 'Java / Spring Boot', 'XML-DSig', 'MySQL', 'S3', 'Docker', 'Kubernetes', 'Jenkins'],
    links: [],
    highlights: [
      'Firmador en Java/Spring Boot que transforma JSON en XML firmado para facturas, notas de crédito y eventos.',
      'Panel y API en Laravel para múltiples empresas: lotes, consultas por CDC, monitor, dashboard y consulta pública de documentos.',
      'Procesos programados para envío y consulta de lotes y firmado de pendientes.',
      'Auditorías internas de escalabilidad y seguridad de la integración, con un plan de mejoras (colas, timeouts, caché de certificados).',
    ],
    caseStudy: {
      context:
        'Tanto la plataforma Encom como FACSIS necesitan emitir documentos electrónicos válidos ante la DNIT. En lugar de duplicar esa lógica, se construyó un servicio compartido.',
      role:
        'Desarrollé la mayor parte del firmador en Java y soy el principal autor del panel en Laravel. Definí los contratos entre los sistemas emisores y el servicio.',
      challenges: [
        'Interpretar correctamente el manual técnico de SIFEN y sus notas de actualización.',
        'Manejar certificados digitales de muchas empresas de forma segura.',
        'Mantener trazabilidad de cada documento desde la emisión hasta su aprobación o rechazo.',
      ],
      decisions: [
        'Separar el firmado (Java, por madurez de las librerías XML-DSig) de la orquestación (Laravel), comunicados por API.',
        'Almacenar XML y respuestas en almacenamiento de objetos y exponer consultas por RUC y CDC.',
        'Documentar el pipeline y auditarlo antes de escalar el volumen.',
      ],
      outcome:
        'El servicio procesa en producción los documentos de ambos productos. Las auditorías derivaron en un plan de evolución hacia procesamiento asíncrono con colas.',
    },
  },
  {
    slug: 'ecommerce-v2',
    name: 'Encom E-commerce v2 — tiendas multi-tenant',
    kind: 'work',
    featured: true,
    tagline: 'Una sola aplicación Next.js que sirve todas las tiendas online de la plataforma',
    role: 'Diseño y desarrollo',
    period: '2026',
    summary:
      'Reescritura del e-commerce de Encom como aplicación Next.js sin base de datos propia (BFF sobre la API del panel). Cada comercio tiene su tienda por subdominio o dominio propio, con un editor de temas en vivo, SEO por tienda y pagos con tarjeta y QR.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Bancard', 'MapLibre', 'Vitest', 'Playwright'],
    links: [],
    highlights: [
      'Multi-tienda por subdominio o dominio personalizado, resuelto en el borde de la aplicación.',
      'Editor de temas con vista previa en vivo, secciones, plantillas y versiones.',
      'SSR/ISR con Open Graph, JSON-LD, sitemap y robots por tienda; PWA y notificaciones push.',
      'Cobros con Bancard (tarjeta y QR) conciliados por webhook, con validación de token, idempotencia y reverificación programada.',
      'Mapas abiertos (MapLibre, OpenFreeMap), modo tótem para locales, app de repartidor y seguimiento de pedidos.',
    ],
    caseStudy: {
      context:
        'El e-commerce original era una aplicación PHP con jQuery, difícil de evolucionar y con limitaciones de rendimiento y SEO. Los comercios pedían más control sobre el diseño de su tienda.',
      role: 'Diseñé la arquitectura y escribí la nueva aplicación, además de endurecer la integración de pagos en la versión anterior.',
      challenges: [
        'Servir cientos de tiendas con una sola aplicación sin degradar el rendimiento.',
        'No duplicar datos: el panel sigue siendo la fuente de verdad de productos, stock y pedidos.',
        'Dar a comercios no técnicos un editor de diseño seguro.',
      ],
      decisions: [
        'Backend-for-frontend: la aplicación no tiene base propia y consume la API del panel, cacheando por tienda.',
        'Editor de temas inspirado en Shopify: secciones configurables, plantillas y versiones publicables.',
        'Pagos con conciliación idempotente y callback de QR de una sola ejecución.',
        'Pruebas unitarias y de extremo a extremo desde el inicio.',
      ],
      outcome: 'Nueva base para las tiendas online de la plataforma, con despliegue independiente del panel y capacidad de personalización por comercio.',
    },
    images: [
      { src: '/img/projects/ecommerce-editor.webp', alt: 'Editor de temas del e-commerce con vista previa en vivo (tienda de demostración)', width: 1400, height: 875 },
      { src: '/img/projects/ecommerce-resumen.webp', alt: 'Panel de resumen de una tienda de demostración', width: 1400, height: 875 },
    ],
  },
  {
    slug: 'biggie',
    name: 'E-commerce y sistemas internos — Biggie',
    kind: 'work',
    tagline: 'Tienda online, sistema administrativo y aplicación de call center de una cadena de retail',
    role: 'Ingeniero de software',
    period: 'Mar. 2022 – Dic. 2022',
    summary:
      'Desarrollo y mantenimiento del e-commerce de Biggie, del sistema administrativo interno y de la aplicación de toma de pedidos del call center.',
    stack: ['Nuxt.js', 'Vue.js', 'Angular', 'TypeScript', 'Laravel', 'MySQL', 'Vuetify', 'Tailwind'],
    links: [{ label: 'biggie.com.py', href: 'https://biggie.com.py', kind: 'site' }],
    highlights: [
      'Frontend del e-commerce en Nuxt/Vue y mantenimiento del backend en Laravel.',
      'Aplicación de call center en Angular para la toma de pedidos telefónicos.',
      'Señalización digital para sucursales (rotación de banners) en Laravel Jetstream.',
    ],
  },
  {
    slug: 'code100',
    name: 'Sistemas de facturación electrónica y certificados — Code100',
    kind: 'work',
    tagline: 'Integraciones de facturación electrónica para grandes empresas',
    role: 'Ingeniero de software',
    period: 'Ene. 2023 – Jun. 2023',
    summary:
      'Desarrollo y mantenimiento de sistemas de certificados digitales e integración con sistemas externos vía API, base de datos y middleware, dentro de una plataforma de facturación electrónica SIFEN para grandes contribuyentes.',
    stack: ['Java', 'Spring Boot', 'Node.js', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'JasperReports'],
    links: [{ label: 'code100.com.py', href: 'https://code100.com.py', kind: 'site' }],
    highlights: [
      'Servicios web en Java para generación y envío de documentos electrónicos.',
      'Plantillas de representación gráfica (KuDE) con JasperReports por cliente.',
      'Gestión de certificados digitales de clientes para el firmado de XML.',
    ],
  },
  {
    slug: 'saldu',
    name: 'Saldu — finanzas personales para iOS',
    kind: 'personal',
    featured: true,
    tagline: 'App nativa en SwiftUI con widgets, Siri y registro automático de pagos',
    role: 'Diseño, desarrollo y marca',
    period: '2026',
    summary:
      'Aplicación de finanzas personales para iPhone y iPad, publicada en el App Store: movimientos, análisis con gráficos, planificación y metas. Widgets de pantalla de inicio y bloqueo, control en el Centro de control, atajos de Siri, registro automático de pagos con Apple Pay y sincronización con iCloud.',
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'WidgetKit', 'App Intents', 'CloudKit', 'StoreKit', 'Kotlin (Android)'],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/py/app/saldu/id6796043853', kind: 'store' },
      { label: 'Sitio de soporte', href: 'https://guilleveron.github.io/saldu-app/', kind: 'site' },
    ],
    highlights: [
      'SwiftUI y SwiftData con sincronización iCloud e inicio de sesión con Apple y Google.',
      'Widgets, Live Activities y control del Centro de control con WidgetKit y App Intents.',
      'Registro automático de pagos Apple Pay mediante automatizaciones de Atajos.',
      'Analítica con Swift Charts, paywall con StoreKit y port a Android en Kotlin.',
    ],
    images: [
      { src: '/img/projects/saldu-1.webp', alt: 'Pantalla de movimientos de Saldu', width: 720, height: 1565 },
      { src: '/img/projects/saldu-2.webp', alt: 'Pantalla de análisis de gastos de Saldu', width: 720, height: 1565 },
      { src: '/img/projects/saldu-3.webp', alt: 'Pantalla de insights de Saldu', width: 720, height: 1565 },
    ],
  },
  {
    slug: 'catequesis',
    name: 'Departamento de Catequesis — plataforma parroquial',
    kind: 'personal',
    tagline: 'Inscripciones, validación de documentos y certificados para una comunidad',
    role: 'Diseño y desarrollo',
    period: '2026',
    summary:
      'Plataforma para gestionar la catequesis de una parroquia: inscripción sin cuenta, roles con permisos granulares, cadena de validación de documentos, emisión de certificados y despliegue en un servidor propio con Docker.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Docker'],
    links: [],
    highlights: ['Control de acceso por alcance (RBAC granular).', 'Flujo de validación documental por etapas.', 'Generación de certificados.'],
  },
  {
    slug: 'factura-preimpresa',
    name: 'Factura preimpresa + servidor MCP',
    kind: 'personal',
    tagline: 'Herramienta local para imprimir sobre talonarios preimpresos, operable desde Claude Code',
    role: 'Diseño y desarrollo',
    period: '2026',
    summary:
      'Aplicación web local para completar e imprimir facturas sobre talonarios preimpresos, con validación de dígito verificador de RUC y consulta al padrón. Expone un servidor MCP para crear y consultar ventas desde un asistente de IA.',
    stack: ['Node.js', 'Express 5', 'SQLite', 'MCP', 'Podman'],
    links: [],
    highlights: ['Servidor MCP (Model Context Protocol) para operar la app desde Claude Code.', 'Impresión calibrada sobre formularios físicos.'],
  },
]
