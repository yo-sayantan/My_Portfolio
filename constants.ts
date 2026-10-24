
import { Experience, Project, Skill, Certification, Education, Award } from './types';
import { OWNER } from './ownerConfig';

// --- Raw Data Definitions ---

const SOCIAL_LINKS_DATA = {
  github: OWNER.github,
  linkedin: OWNER.linkedin,
  email: OWNER.email,
  phone: OWNER.phone,
};

/** First day of full-time work (HighRadius, Jun 2020) — drives every "years of experience" figure. */
export const CAREER_START = new Date('2020-06-01');

export const getExperienceYears = (now: Date = new Date()): string => {
  const years = (now.getTime() - CAREER_START.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return years.toFixed(1);
};

const SUMMARY_DATA = "Senior Software Engineer with over {{YRS}} years of experience building Java and Spring microservices, cloud-native AWS platforms and real-time fraud-detection systems for global financial services. I modernize legacy monoliths into containerized, Kubernetes-orchestrated services (JDK 8 → 21), design high-throughput APIs and payment integrations (Mastercard, HSBC, QuickBooks, WorldPay), and harden production systems against critical vulnerabilities. I also champion AI-native engineering, wiring Claude, Cursor, MCP servers and agentic workflows into the SDLC to ship faster without compromising quality, and I mentor engineers to raise the bar for the whole team.";

const EXPERIENCES_DATA: Experience[] = [
  {
    id: 'experian',
    company: 'Experian',
    role: 'Senior Software Engineer',
    period: 'Dec 2024 – Present',
    location: 'Hyderabad, Telangana',
    description: [
      'Building and evolving the real-time fraud-detection infrastructure behind financial transaction monitoring as part of the FSD team.',
      'Modernizing the identity and fraud suite (PreciseID, FraudAdmin, PreciseMatch and DeviceID) with stronger verification policies, configurable risk rules and richer fraud analytics.',
      'Engineering the API Gateway layer that aggregates data from downstream microservices and routes each request to the right service with low latency.',
      'Led the end-to-end migration of legacy on-prem applications to AWS: containerized them with Docker, upgraded core systems from JDK 8 to JDK 21 and remediated critical security vulnerabilities along the way.',
      'Orchestrating containerized microservices on Kubernetes with Jenkins CI/CD, delivering high availability and zero-downtime releases.',
      'Modernized the UIs of multiple enterprise portals by upgrading legacy front-end codebases to current JavaScript frameworks, improving responsiveness and cross-browser compatibility.',
      'Partnering with the Excalibur and CloudNine teams to shape new ideas, initiatives, products and services.',
      'Championing an AI-first engineering culture by integrating Claude, Cursor, MCP servers and AI agents into the SDLC, boosting team productivity by almost 50%.'
    ],
    skills: ['Java 21', 'Spring', 'Microservices', 'AWS', 'Docker', 'Kubernetes', 'Jenkins CI/CD', 'API Gateway', 'Fraud Detection', 'Claude Code', 'Cursor', 'MCP', 'AI Agents']
  },
  {
    id: 'oracle',
    company: 'Oracle',
    role: 'Applications Engineer 2',
    period: 'Aug 2022 – Nov 2024',
    location: 'Hyderabad, Telangana',
    description: [
      'Spearheaded a strategic payment-service integration with Mastercard and HSBC for Oracle Fusion Cloud Financials, accelerating revenue recognition and client cash flow.',
      'Designed the scalable microservices behind these payment integrations and managed their Docker deployments on Oracle VM with seamless Oracle DB integration and high availability.',
      'Partnered with the Tax and Project Management teams to design and launch new financial capabilities on Fusion Payables for global enterprises, universities and government organizations.',
      'Shipped new business features and enhancements on Fusion Payables while owning production stability, triaging and fixing customer-reported defects end to end.',
      'Tuned database performance through advanced PL/SQL optimization, SQLHC and AWR analysis, and delivered data-fix scripts to safeguard data integrity.',
      'Established automated testing with JUnit and utPLSQL, raising release confidence and code quality.',
      'Introduced AI-assisted workflows (GitHub Copilot, Claude) to automate coding and documentation tasks, achieving a 30% increase in productivity.'
    ],
    skills: ['Java', 'Oracle Fusion Cloud', 'Microservices', 'Docker', 'PL/SQL', 'Oracle DB', 'Payment Integrations', 'JUnit', 'GitHub Copilot']
  },
  {
    id: 'highradius-assoc',
    company: 'HighRadius',
    role: 'Associate Software Engineer',
    period: 'Jun 2021 – Jul 2022',
    location: 'Hyderabad, Telangana',
    description: [
      'Built core modules of the HighRadius Credit application with Java, Spring, Hibernate, ExtJS and MySQL, exposing robust RESTful APIs and leveraging AWS for scalability.',
      'Integrated QuickBooks and WorldPay to deliver dynamic credit-limit functionality, a key factor in winning new clients and improving payment efficiency.',
      'Engineered a parallel invoice-processing engine with Java multithreading, cutting credit-limit and risk approval time by almost 80% during financial year-end peaks.',
      'Designed a configurable Dynamic Notification System for merchant-specific in-portal alerts, lifting client engagement by 25%.',
      'Delivered 50+ client-driven enhancements and features while resolving critical production bottlenecks.',
      'Mentored and trained a cohort of 20+ interns and new hires on SaaS engineering best practices.'
    ],
    skills: ['Java', 'Spring', 'Hibernate', 'MySQL', 'ExtJS', 'REST APIs', 'AWS', 'Multithreading', 'Payment Integrations']
  },
  {
    id: 'highradius-junior',
    company: 'HighRadius',
    role: 'Junior Engineer',
    period: 'Jun 2020 – May 2021',
    location: 'Bhubaneswar, Odisha',
    description: [
      'Built a high-efficiency framework for autonomous testing of the flagship HighRadius Credit and EIPP products.',
      'Extended the framework with database and email verification systems, R&D work recognized with The HighFlyer award.',
      'Led a team of 6 engineers in designing and delivering critical user stories for the EIPP product suite.',
      'Engineered robust parsers for complex PDF, TXT and XLSX files using advanced regex patterns.',
      'Defined test scripts and automation protocols in close collaboration with the QA team.'
    ],
    skills: ['Java', 'Test Automation', 'Regex', 'Parsers', 'Team Leadership']
  }
];

const EDUCATION_DATA: Education[] = [
  {
    school: "Birla Institute of Technology & Science (BITS) Pilani",
    degree: "M. Tech. (Software Engineering)",
    location: "Hyderabad",
    details: [
      "Specialized in Full Stack, Security, DevOps, Scalability, Cloud, Software Architecture, Middleware and Agile",
      "CGPA: 8.0 / 10"
    ]
  },
  {
    school: "Kalinga Institute of Industrial Technology (KIIT) University",
    degree: "B. Tech. (Computer Science and Engineering)",
    location: "Bhubaneswar, Odisha",
    details: [
      "Majored in Computer Science and Engineering",
      "CGPA: 9.13 / 10"
    ]
  }
];

const PROJECTS_DATA: Project[] = [
  {
    id: 'legacy-modernization',
    title: 'Enterprise Legacy Modernization',
    type: 'Work',
    summary: 'Led the migration of legacy monoliths to cloud-native microservices on AWS, Docker and Kubernetes.',
    techStack: ['Java', 'AWS', 'Docker', 'Kubernetes', 'Spring Boot', 'Microservices', 'JDK21', 'Jenkins CI/CD'],
    description: 'Led the end-to-end architectural migration of legacy monolithic applications to a modern, cloud-native microservices architecture deployed on AWS with Docker containerization and Kubernetes orchestration. Established zero-downtime CI/CD pipelines with Disaster Recovery.',
    longDescription: 'A comprehensive enterprise modernization initiative at Experian to transform aging monolithic systems into scalable, resilient microservices. The project involved upgrading core systems from JDK8 to JDK21, decomposing tightly-coupled modules into independently deployable Docker-containerized services, and orchestrating them via Kubernetes on AWS. The migration also addressed risk mitigation through phased rollouts, automated rollback strategies, robust CI/CD pipelines using Jenkins, and a comprehensive Disaster Recovery strategy to ensure zero-downtime deployments and business continuity.',
    features: [
      'Monolith-to-Microservices Decomposition',
      'JDK8 to JDK21 Core System Upgrade',
      'Docker Containerization & Kubernetes Orchestration',
      'AWS Cloud-Native Deployment Architecture',
      'Zero-Downtime CI/CD Pipelines with Jenkins',
      'Phased Rollout & Automated Rollback Strategies',
      'Disaster Recovery & Business Continuity',
      'Risk Mitigation & Legacy Dependency Resolution'
    ]
  },
  {
    id: 'ai-jira-board',
    title: 'AI Jira Board',
    type: 'Personal',
    summary: 'Self-hosted kanban that mirrors Jira, with AI-written ticket briefs and PR readiness reports.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Vite', 'Python', 'Docker', 'Ollama', 'Claude / Gemini / Cursor APIs', 'Jira & Bitbucket REST APIs', 'Vitest'],
    description: 'A self-hosted, AI-assisted kanban board that mirrors your Jira tickets and pull requests. A background agent syncs the work, drag-and-drop writes status back to Jira, and LLMs generate ticket briefs and ship / no-ship PR readiness reports.',
    longDescription: 'A private, local-first replacement for the Jira UI. A Python agent pipeline syncs your assigned tickets and pull requests into a local snapshot, so the single-file React 19 app opens instantly. Dragging a card writes the status change through to Jira, guarded by workflow rules (In Review needs a PR, Done needs merged PRs and a QA ticket) with one-click undo. An AI layer, running local models via Ollama or cloud models (Claude, Gemini, Cursor), writes ticket briefs enriched from Confluence, linked tickets and PR diffs, plus PR Readiness Reports with release gates fed by Jenkins builds, security scans and Dynatrace evidence. Everything runs in non-root Docker containers on loopback with verified TLS.',
    features: [
      'Drag-and-Drop Status Sync to Jira with One-Click Undo',
      'Workflow Guard-Rails: In Review Needs a PR, Done Needs Merged PRs',
      'AI Ticket Briefs via Local (Ollama) or Cloud (Claude, Gemini) LLMs',
      'PR Readiness Reports with Ship / No-Ship Verdict',
      'Jenkins, Security-Scan and Dynatrace Evidence Gates',
      'Private by Default: Loopback-only, Non-root, Verified TLS',
      'Unit Tests (unittest, Vitest) and GitHub Actions CI'
    ],
    requirements: ['Docker & Docker Compose', 'Node.js 22.12+', 'Python 3 & Bash', 'Jira API token', 'Optional: Ollama or a cloud AI key'],
    skills: ['Agentic AI pipelines', 'LLM prompt & context engineering', 'Local vs cloud model routing', 'Workflow rules engine with undo', 'REST integration (Jira, Bitbucket, Confluence)', 'Secure containerized deployment', 'Config layering & schema validation'],
    link: `${OWNER.github}/AI_JIRA_Board`
  },
  {
    id: 'quickbooks-integration',
    title: 'QuickBooks Integration',
    type: 'Work',
    summary: 'Two-way QuickBooks and WorldPay sync for HighRadius Credit, handling 10,000+ transactions a month.',
    techStack: ['Java', 'QuickBooks API', 'WorldPay', 'OAuth', 'CRM Integration', 'Microservices', 'Data Synchronization'],
    description: 'Designed and developed seamless integration of QuickBooks and WorldPay with the HighRadius Credit Management, facilitating data import from CRM systems and optimizing payment and tax management. Streamlined financial operations, handling over 10,000 transactions monthly.',
    longDescription: 'This high-impact, proprietary integration serves as a secure bridge between HighRadius Credit Management and QuickBooks/WorldPay. The primary technical mandate involved handling complex OAuth authentication, facilitating data import from CRM systems, and engineering an intelligent engine to process credits and tax management. By ensuring real-time bidirectional synchronization handling over 10,000 transactions monthly, the system guaranteed that both HighRadius and QuickBooks data remained perfectly aligned after transaction processing—a feature that became a major selling point for new client acquisition.',
    features: [
      'Secure QuickBooks OAuth Authentication',
      'Bidirectional Data Synchronization Engine',
      'Advanced Credit Limit Processing Algorithms',
      'Automated Invoice & Transaction Fetching',
      'Real-time Financial Ledger Updates'
    ]
  },
  {
    id: 'book-exchange',
    title: 'ReadNTrade Book Exchange',
    type: 'Personal',
    summary: 'Peer-to-peer book rental and swap platform on Spring Boot 3, JWT security and React 18.',
    techStack: ['Java 17', 'Spring Boot 3', 'Spring Security', 'JWT & OAuth2', 'Spring Data JPA', 'MySQL', 'React 18', 'Redux', 'Material UI', 'Quartz', 'Google Sign-In', 'Recharts'],
    description: 'A full-stack peer-to-peer marketplace where readers list books to rent or swap. A Spring Boot 3 / Java 17 API secured with Spring Security and JWT powers a React 18 + Redux + Material UI front end, backed by MySQL.',
    longDescription: 'ReadNTrade turns shelves into a community: readers list books to rent or exchange and trade directly peer-to-peer. The Java 17 / Spring Boot 3.2 backend exposes a stateless REST API secured with Spring Security, JWT and an OAuth2 resource server, persists data through Spring Data JPA on MySQL, and uses Quartz for scheduled jobs and Apache POI for spreadsheets. The React 18 front end uses Redux, Axios, Material UI (with MUI X data grids and date pickers), Recharts, React Router and Google sign-in. Backend and UI ship as separate deployables, and a SQL dump gets the full stack running locally in minutes.',
    features: [
      'Stateless Spring Security with JWT & OAuth2 Resource Server',
      'Google Sign-In Alongside Token Login',
      'List Books for Rent or Peer-to-Peer Exchange',
      'Spring Data JPA on MySQL with Seed SQL Dump',
      'Quartz-Scheduled Jobs & Apache POI Spreadsheet Support',
      'Redux-Driven React UI with MUI X Data Grids, Date Pickers and Recharts',
      'Independent Backend JAR and Static UI Build'
    ],
    requirements: ['JDK 17+', 'Maven (wrapper included)', 'Node.js LTS & npm', 'MySQL Server'],
    skills: ['Layered REST API design', 'Token-based authentication & authorization', 'Google OAuth sign-in', 'Relational schema design with seed data', 'Scheduled background jobs', 'State management with Redux', 'Data grids, charts & date pickers', 'Component testing with Testing Library'],
    link: `${OWNER.github}/Book_Exchange_Project`
  },
  {
    id: 'quick-task',
    title: 'QuickTask Mobile Suite',
    type: 'Personal',
    summary: 'Cross-platform Flutter task manager on Back4App with auth, sync and automated Android builds.',
    techStack: ['Flutter', 'Dart', 'Back4App (Parse Server)', 'MongoDB', 'GitHub Actions', 'Material 3', 'Parse SDK for Flutter'],
    description: 'A cross-platform task manager built with Flutter and Dart on a Back4App (Parse Server) backend, with secure authentication, persistent sessions, real-time task sync and an automated GitHub Actions pipeline for Android builds.',
    longDescription: 'QuickTask is a full-stack mobile app that pairs a Flutter UI with a scalable Backend-as-a-Service. Authentication uses ParseUser through the Parse SDK for Flutter, with sessions persisted across restarts. Tasks support full CRUD with due dates and an instant completed/pending toggle, all scoped per user and stored in MongoDB through Back4App. The UI follows Material 3 with responsive layouts, and a GitHub Actions workflow builds Android APKs automatically.',
    features: [
      'Secure Sign-up & Login with ParseUser',
      'Persistent Sessions Across Restarts',
      'Real-time Task CRUD with Due Dates and Status Toggle',
      'Material 3 Responsive UI',
      'CI/CD: Automated Android APK Builds',
      'Release Notes and Project Report Included'
    ],
    requirements: ['Flutter SDK (stable) & Dart 3.1+', 'Android Studio or VS Code', 'Back4App account (Application ID & Client Key)'],
    skills: ['Cross-platform mobile development', 'Backend-as-a-Service integration', 'Authentication & session handling', 'Per-user data scoping', 'Material 3 design', 'CI for mobile builds'],
    link: `${OWNER.github}/QuickTask_Pro`
  },
  {
    id: 'pdf-unlocker',
    title: 'PDF Unlocker Pro',
    type: 'Personal',
    summary: 'Multi-threaded Rust tool that recovers PDF passwords with pattern-based search on every core.',
    techStack: ['Rust', 'Rayon', 'Ratatui', 'Clap', 'native-windows-gui', 'lopdf', 'Crossterm', 'GitHub Releases'],
    description: 'A high-performance, multi-threaded PDF password-recovery tool written in Rust. Pattern-based search spreads candidates across every CPU core via Rayon, with a native Windows GUI and a Ratatui terminal UI for macOS and Linux.',
    longDescription: 'Built to recover access to your own password-protected PDFs, such as bank statements and payslips, when you remember part of the password. You describe the known structure with a compact pattern language (n for digits, c for letters, a for alphanumerics, x for any printable character) and the engine generates only matching candidates, testing them in parallel on a configurable thread pool. The Rust 2021 codebase uses lopdf for PDF handling, Rayon for data parallelism, Clap for the command line, Ratatui and Crossterm for a rich terminal UI and native-windows-gui for the Windows desktop app, with an aggressively optimised release profile (LTO, single codegen unit, stripped binaries). Prebuilt binaries ship through GitHub Releases.',
    features: [
      'Multi-threaded Search Across All CPU Cores with Rayon',
      'Pattern-based Candidate Generation (n / c / a / x Wildcards)',
      'Native Windows GUI',
      'Ratatui Terminal UI and Clap CLI for macOS & Linux',
      'Release Builds Tuned with LTO, Single Codegen Unit and Stripped Binaries',
      'Prebuilt Binaries via GitHub Releases'
    ],
    requirements: ['Rust (latest stable) & Cargo', 'MSVC Build Tools (Windows GUI only)', 'Windows, macOS or Linux'],
    skills: ['Systems programming in Rust', 'Data-parallel, multi-threaded computing', 'Combinatorial search & pattern matching', 'CLI, TUI and native GUI design', 'Cross-platform builds & release optimisation', 'Idiomatic error handling'],
    link: `${OWNER.github}/PDF_Unlocker_Pro`
  },
  {
    id: 'pc-part-picker',
    title: 'PC Part Picker India',
    type: 'Personal',
    summary: 'PC-building assistant for India: drag-and-drop assembly, compatibility checks and live prices.',
    techStack: ['Next.js 14', 'React 18', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'dnd-kit', 'Puppeteer', 'Cheerio', 'Nodemailer', 'Docker'],
    description: 'An intelligent PC-building assistant for the Indian market. Drag components into a visual assembly workspace, get real-time compatibility checks and compare live prices scraped from Indian retailers.',
    longDescription: 'Helps builders plan a compatible rig at the best local price. A dnd-kit drag-and-drop assembly zone lets users build visually while a rules engine validates CPU and motherboard sockets, RAM type, GPU clearance, PSU wattage and case fitment. Prices are scraped from Amazon India and MDComputers with Puppeteer, Cheerio and Axios, parts persist in SQLite through Prisma ORM, and finished builds can be emailed as a summary with Nodemailer. The Next.js 14 (App Router) and TypeScript app ships with production and development Docker setups.',
    features: [
      'Visual Drag-and-Drop PC Assembly with dnd-kit',
      'Real-time Compatibility Rules Engine',
      'Live Price Scraping (Amazon India, MDComputers) with Puppeteer & Cheerio',
      'Prisma ORM with SQLite Persistence',
      'Email Build Summaries via Nodemailer',
      'Dockerized Production and Dev Builds'
    ],
    requirements: ['Node.js 20+', 'npm or pnpm', 'Docker (optional)', 'SMTP / Gmail app password for email summaries'],
    skills: ['Full-stack TypeScript with Next.js API routes', 'Rules-based compatibility engine', 'Web scraping with a headless browser', 'ORM schema design with Prisma', 'Drag-and-drop UX', 'Transactional email', 'Containerized builds'],
    link: `${OWNER.github}/PC_Part_Picker`
  },
  {
    id: 'legal-entity',
    title: 'Legal Entity Localization',
    type: 'Work',
    summary: 'Solo-built AWS microservice for legal-entity-specific invoicing across companies and currencies.',
    techStack: ['AWS', 'Java', 'Microservices', 'Compliance', 'PL/SQL', 'Spring Batch'],
    description: 'Solely developed and tested the implementation of Legal Entity Localization, enabling clients to issue invoices customized for individual companies, Legal Entity IDs, and currencies. Utilized AWS services to fetch critical legal entity information, improving invoice customization accuracy and ensuring compliance.',
    longDescription: 'This enterprise-grade microservice was architected to solve complex regulatory compliance challenges for multinational invoicing. Built with sole ownership from design through testing, the service on AWS dynamically adjusts validation logic based on the legal entity\'s jurisdiction, enabling clients to issue invoices customized for individual companies, Legal Entity IDs, and currencies. It integrates with legacy PL/SQL systems while providing a modern REST interface, significantly enhancing invoice accuracy and compliance through the integration of dynamic billing criteria.',
    features: [
      'Dynamic Regulatory Rule Engine',
      'AWS Lambda & API Gateway Integration',
      'Hybrid Cloud Architecture (AWS + On-Prem DB)',
      'High-Volume Data Processing with Spring Batch',
      'Automated Compliance Auditing'
    ]
  },
  {
    id: 'parallel-invoice',
    title: 'Parallel Invoice Engine',
    type: 'Work',
    summary: 'Parallel processing engine that cut credit approval time by almost 80% at year-end peaks.',
    techStack: ['Java', 'Concurrency', 'Multi-threading', 'ExecutorService', 'Distributed Systems'],
    description: 'Re-engineered credit approval workflows with a high-concurrency parallel processing engine. Custom thread pools process 20 to 100 invoices concurrently, cutting credit-limit and risk approval time by almost 80% during financial year-end closures.',
    longDescription: 'Addressing a critical bottleneck in financial closing periods, this engine utilizes Java advanced concurrency utilities to parallelize invoice processing. By implementing custom ExecutorServices and optimizing thread pool management, the system can handle massive spikes in load without degradation. The architecture includes a robust failure recovery mechanism to ensure data integrity even during partial system failures.',
    features: [
      'High-Concurrency Invoice Processing',
      'Custom Thread Pool Management',
      'Fault-Tolerant Batch Processing',
      'Real-time Processing Status Monitoring',
      '~80% Faster Approvals at Year-End Peaks'
    ]
  },
  {
    id: 'dynamic-notifications',
    title: 'Dynamic Notification Engine',
    type: 'Work',
    summary: 'Rule-based in-portal alerts that lifted client engagement by 25% on a SaaS credit platform.',
    techStack: ['Java', 'Spring Boot', 'Microservices', 'SaaS', 'Event-Driven Architecture'],
    description: 'Developed a scalable infrastructure for dynamic notifications, enabling clients to send personalized alerts based on predefined parameters. Boosted client engagement by 25% through targeted communication strategies.',
    longDescription: 'A key SaaS feature engineered for the HighRadius Credit platform, this Dynamic Notification Infrastructure enables merchants and users to configure customized in-portal notifications based on varying criteria. The system was designed for scalability, supporting personalized alert delivery across a large client base. Through targeted communication strategies driven by predefined parameters, the infrastructure boosted client engagement by 25%.',
    features: [
      'Customizable Notification Rules Engine',
      'Merchant-Specific Alert Configuration',
      'Scalable Event-Driven Architecture',
      '25% Boost in Client Engagement',
      'Real-time In-Portal Alert Delivery'
    ]
  },
  {
    id: 'my-portfolio',
    title: 'My Career Portfolio',
    type: 'Personal',
    summary: 'This site: React 19 portfolio with a Gemini AI assistant, particle web and serverless backend.',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Gemini API', 'Netlify Functions', 'Canvas 2D', 'GitHub Actions', 'Nodemailer'],
    description: 'This site: an interactive portfolio with a Gemini-powered AI assistant that answers questions about my experience, a flow-field particle simulation and serverless email and AI endpoints on Netlify.',
    longDescription: 'A comprehensive digital resume built with React 19, Vite and TypeScript, styled with Tailwind CSS. A Gemini-powered assistant, grounded in my resume data and served through a Netlify Function so no API keys reach the browser, answers visitor questions and can email the conversation transcript (Nodemailer). The background is a custom canvas particle simulation using a spatial hash grid, the light/dark theme switches with the View Transitions API, and CI/CD deploys the site to Netlify and GitHub Pages.',
    features: [
      'Gemini-Powered Chat Assistant (Serverless, Server-side Prompt)',
      'Interactive Canvas Particle Web Background',
      'View Transition Light / Dark Theme',
      'Contact Form with Validated, HTML-escaped Emails',
      'Reduced-Motion & Keyboard Accessibility',
      'Automated CI/CD Deployments'
    ],
    requirements: ['Node.js 18+', 'npm', 'Gemini API key (for the AI assistant)', 'Gmail app password (for contact-form email)'],
    skills: ['Serverless API design', 'LLM prompt grounding & abuse protection', 'Canvas physics & performance tuning', 'Accessibility & reduced-motion support', 'View Transitions API', 'CI/CD to Netlify and GitHub Pages', 'Input validation & email hardening'],
    link: `${OWNER.github}/My_Portfolio`
  },
  {
    id: 'investment-tracker',
    title: 'Algorithmic Investment Tracker',
    type: 'Personal',
    summary: 'Google Sheets system tracking live portfolio metrics to support risk-aware investing decisions.',
    techStack: ['Google Sheets', 'Real-time Market Data', 'Portfolio Analytics', 'Risk Management', 'Automation'],
    description: 'A Google Sheets-powered tracker that monitors live metrics across a personal investment portfolio, turning current market data into clear signals so buy, hold and rebalance decisions are faster and better informed.',
    longDescription: 'A complex, formula-driven spreadsheet system that tracks the real-time performance of personal investments. It pulls current market data into a single dashboard so portfolio health, allocation and returns are visible at a glance, supporting data-driven decisions that aim to maximise profit while minimising risk.',
    features: [
      'Live Portfolio Metrics from Current Market Data',
      'Allocation & Returns Dashboard',
      'Decision Support to Maximise Profit and Limit Risk',
      'Zero-Infrastructure: Runs Entirely in Google Sheets'
    ]
  },
  {
    id: 'investment-planner',
    title: 'Investment Planner',
    type: 'Personal',
    summary: 'Full-stack planner that parses CAMS / KFintech statements into a live portfolio dashboard.',
    techStack: ['Java', 'Spring Boot', 'React 18', 'MySQL', 'Spring Security & JWT', 'Redux', 'Material UI', 'Recharts', 'Liquibase', 'Docker Compose', 'Nginx'],
    description: 'A full-stack investment planning and portfolio-tracking platform. Upload CAMS and KFintech statements, let the Spring Boot backend extract your holdings, and explore returns, growth and allocation on a React dashboard, with goal-based planning for target profits.',
    longDescription: 'Built to replace manual spreadsheet tracking of mutual-fund investments and to plan toward profit goals. Users bulk-upload password-protected CAMS or KFintech statements; the Spring Boot backend parses the PDFs (Apache PDFBox) and serves the transactions through JWT-secured REST APIs on MySQL, with Liquibase migrations, stored procedures, Quartz scheduling and mail notifications. The React 18 front end (Redux, Material UI, Recharts) shows total value, daily returns, time-filtered growth charts (1M, 6M, 1Y, All) and allocation pie charts. It runs as a Docker Compose stack of MySQL 8, backend, frontend and an nginx reverse proxy.',
    features: [
      'Automated CAMS / KFintech Statement Extraction (Password-Protected PDFs)',
      'Goal-Based Planning: Required Investment for a Target Profit',
      'JWT-Secured Spring Boot REST APIs',
      'Interactive Growth & Allocation Charts with Recharts',
      'Time-based Performance Filters (1M, 6M, 1Y, All)',
      'Liquibase Migrations, MySQL Stored Procedures and Quartz Jobs',
      'One-Command Docker Compose Stack with nginx Reverse Proxy'
    ],
    requirements: ['Docker & Docker Compose (one-command run)', 'JDK & Maven (to build the backend)', 'Node.js & npm (to run the UI locally)', 'MySQL 8'],
    skills: ['Financial-domain modelling', 'PDF statement parsing with PDFBox', 'Database migrations with Liquibase', 'MySQL stored procedures', 'Secure REST design with JWT', 'Scheduled jobs & email notifications', 'Data visualisation with Recharts', 'Multi-container deployment with nginx'],
    link: `${OWNER.github}/Investment_Portfolio_Tracker`
  },
  {
    id: 'os-scheduler',
    title: 'OS CPU Scheduler Simulator',
    type: 'Personal',
    summary: 'C simulator comparing FCFS, Round Robin, SJF and Priority scheduling with CPU and I/O bursts.',
    techStack: ['C', 'Bash', 'Python', 'Linux', 'Operating Systems', 'CPU Scheduling Algorithms'],
    description: 'An interactive CPU-scheduling simulator written in C. Enter process and I/O burst details, switch between six scheduling algorithms and watch how processes run, wait and overlap on a single core with unlimited I/O.',
    longDescription: 'A hands-on deep dive into operating-system internals. The user describes each process, including its CPU and I/O bursts, and the simulator replays the schedule: which process enters first, how CPU and I/O phases overlap, for how long each runs and what the CPU and I/O devices are doing at every moment. Algorithms are implemented from scratch in C: First Come First Served, Round Robin, Shortest Job First (non-preemptive and preemptive) and Priority scheduling (non-preemptive and preemptive), so the same workload can be compared across strategies. Bash scripts link and rerun the programs on Linux, macOS and Windows, and a Python implementation cross-checks the FCFS results.',
    features: [
      'FCFS, Round Robin, SJF and Priority Scheduling',
      'Preemptive and Non-Preemptive Variants',
      'CPU and I/O Burst Overlap Modelling',
      'Switch Algorithms to Compare the Same Workload',
      'Cross-Platform Bash Build & Run Scripts',
      'Python Reference Implementation for Verification'
    ],
    requirements: ['GCC or any C compiler', 'Bash shell (Linux, macOS or WSL)', 'Python 3 (optional, FCFS reference)'],
    skills: ['Operating-system internals', 'Process & I/O scheduling theory', 'Algorithm implementation in C', 'Shell scripting & build automation', 'Turnaround and waiting-time analysis', 'Cross-checking with a second implementation'],
    link: `${OWNER.github}/OS_Scheduling`
  },
  {
    id: 'school-connect',
    title: 'SchoolConnect v3.0',
    type: 'Personal',
    summary: 'Microservices school platform with five role dashboards, real-time chat and analytics.',
    techStack: ['Java 21', 'Spring Boot 3', 'Microservices', 'Next.js 14', 'Spring Cloud Gateway', 'Netflix Eureka', 'MySQL 8', 'Docker Compose', 'Tailwind CSS', 'Recharts', 'JWT', 'Maven'],
    description: 'A modern, microservices-based school management platform that connects schools, students, parents and teachers. Java 21 and Spring Boot 3 services behind a Spring Cloud Gateway power a mobile-first, glassmorphic Next.js 14 front end with role-based dashboards, real-time chat and analytics.',
    longDescription: 'SchoolConnect bridges the gap between schools, students, parents and teachers with a mobile-first, glassmorphic experience. The backend is split into independently deployable Spring Boot 3 (Java 21) microservices: an auth service for users, roles and JWT, an academic service for grades, attendance and subjects, a communication service for chat and notices, and a calendar service for events and schedules. A Netflix Eureka registry handles service discovery and Spring Cloud Gateway is the single entry point. The Next.js 14 front end, styled with Tailwind CSS and Recharts, serves five role-specific dashboards (student, teacher, parent, principal and admin) with performance analytics and a unified real-time chat. Everything runs on MySQL 8 and starts with a single docker-compose command, with demo data generated by SQL seeds and Python scripts.',
    features: [
      'Five Role-Based Dashboards: Student, Teacher, Parent, Principal and Admin',
      'Microservices: Auth, Academic, Communication and Calendar',
      'Netflix Eureka Service Discovery and Spring Cloud Gateway Entry Point',
      'Unified Real-Time Chat Between Students, Teachers and Parents',
      'Advanced Analytics: Performance Trends and School-Wide Overview',
      'Calendar for Exams, Holidays and Meetings',
      'One-Command Docker Compose Deployment with Seeded Demo Data'
    ],
    requirements: ['Docker Desktop (running)', 'Git'],
    skills: ['Microservices architecture & service discovery', 'API gateway routing', 'JWT authentication & role-based access control', 'Real-time messaging', 'Analytics dashboards & data visualisation', 'Glassmorphic, mobile-first UI design', 'Multi-service container orchestration', 'Seed data generation with SQL and Python']
  },
  {
    id: 'beautiful-bengal',
    title: 'Beautiful Bengal v3',
    type: 'Personal',
    summary: 'Animated React 19 tourism and culture guide to every district of West Bengal.',
    techStack: ['React 19', 'Vite (Rolldown)', 'Tailwind CSS v4', 'React Router v7', 'Framer Motion', 'JavaScript (ES2022)', 'ESLint 9', 'Lucide Icons'],
    description: 'An immersive tourism and culture site for West Bengal, rebuilt as a modern React 19 + Vite app with Tailwind v4, Framer Motion transitions and a data-driven guide to every district, its cuisine, crafts and heritage.',
    longDescription: 'Beautiful Bengal v3 is a complete rebuild of an earlier site into a fast, animated single-page app, a digital gateway to the "Sweetest Part of India". Content is data-driven: a district dataset feeds drill-down pages for every district, alongside dedicated sections for tourism, culture, cuisine, architecture, handicrafts, industry and the people of Bengal, plus an immersive photo gallery and a contact page. React Router v7 handles routing, Framer Motion powers page transitions and scroll effects, Tailwind CSS v4 delivers a mobile-first responsive layout, ESLint 9 keeps the code clean, and Vite (running on the Rolldown bundler) keeps builds and hot reloads fast.',
    features: [
      'Drill-Down Guide for Every District of West Bengal',
      'Sections on Tourism, Culture, Cuisine, Architecture & Crafts',
      'Immersive Image Gallery',
      'Framer Motion Page Transitions & Scroll Effects',
      'Mobile-First Responsive Layout with Tailwind v4',
      'Vite + React Router v7 SPA with ESLint 9'
    ],
    requirements: ['Node.js 18+', 'npm'],
    skills: ['Component-driven SPA architecture', 'Client-side routing & data-driven pages', 'Animation design with Framer Motion', 'Mobile-first responsive design', 'Content modelling', 'Linting & code-quality tooling'],
    link: `${OWNER.github}/Beautiful_Bengal_v3`
  }
];

// Items are ordered by importance (strongest, most relevant first) and kept short so the pills pack
// tightly: Skills.tsx stretches each row of pills to the full card width.
const SKILLS_DATA: Skill[] = [
  {
    category: "Backend Engineering",
    items: ["Java 8–21", "Spring Boot", "Hibernate / JPA", "REST & SOAP", "Spring Security", "Spring Batch", "Concurrency", "JSP & Servlets", "Regex Parsing", "Python", "Rust", "C"]
  },
  {
    category: "Architecture & Integration",
    items: ["Microservices", "System Design", "API Gateway", "Spring Cloud & Eureka", "Event-Driven", "OAuth 2.0 & JWT", "Legacy Modernization", "Payments APIs", "QuickBooks & WorldPay", "DSA"]
  },
  {
    category: "Cloud & Containers",
    items: ["AWS", "Docker", "Kubernetes", "AWS Lambda", "Oracle Cloud (OCI)", "Zero-Downtime", "Disaster Recovery", "JBoss", "Oracle VM"]
  },
  {
    category: "Databases & Performance",
    items: ["MySQL", "Oracle DB", "PL/SQL", "Redis / NoSQL", "AWR Tuning", "Stored Procedures", "Liquibase", "Prisma ORM", "SQLite"]
  },
  {
    category: "AI & Agentic Engineering",
    items: ["Claude Code", "Cursor", "MCP Servers", "AI Agents", "Prompt Engineering", "GitHub Copilot", "ChatGPT / GPT-5", "Gemini API", "Ollama"]
  },
  {
    category: "Frontend & Mobile",
    items: ["React", "TypeScript", "JavaScript", "Next.js", "Redux", "Tailwind CSS", "Material UI", "Vite", "Framer Motion", "ExtJS", "Flutter & Dart"]
  },
  {
    category: "DevOps, Quality & Tooling",
    items: ["CI/CD", "Jenkins", "Git / GitHub", "GitHub Actions", "Maven / Gradle", "JUnit", "Test Automation", "Bitbucket", "Dynatrace", "Jira & Confluence"]
  },
  {
    category: "Domain Expertise",
    items: ["Fraud Detection", "Identity Verification", "Financial Services", "Payments", "Transaction Monitoring", "Risk Rules", "Fusion Financials", "Payables & Tax", "SaaS Credit"]
  }
];

// Newest first, then by relevance
const CERTIFICATIONS_DATA: Certification[] = [
  { name: "OCI Foundations Associate", date: "11/2023", issuer: "Oracle" },
  { name: "Basics of Mutual Funds", date: "05/2023", issuer: "INDmoney" },
  { name: "Product Essentials Program", date: "06/2021", issuer: "HighRadius" },
  { name: "Microsoft Technology Associate (MTA)", date: "07/2019", issuer: "NIIT" },
  { name: "Microsoft Imagine Academy", date: "07/2019", issuer: "NIIT" },
  { name: "Basic Python Certification", date: "06/2019" },
  { name: "NIIT Java Certification", date: "05/2018", issuer: "NIIT" }
];

const AWARDS_DATA: Award[] = [
  {
    title: "NIKE Technology Transformation",
    issuer: "Experian",
    year: "2026",
    description: "Recognized for leading the migration of multiple projects from on-prem infrastructure to AWS, owning complex technical outcomes and delivering measurable impact across the modernization effort."
  },
  {
    title: "Spot Award",
    issuer: "Oracle",
    year: "2023",
    description: "Recognized for the outstanding, accelerated delivery of the high-throughput Payment Service Integration with Mastercard and HSBC. The project was completed significantly ahead of schedule, optimizing revenue recognition and enabling seamless global transactions."
  },
  {
    title: "Star Performer",
    issuer: "HighRadius",
    year: "2021",
    description: "Honored for instrumental technical contributions to the Credit Cloud module. Recognized for engineering a highly concurrent parallel processing engine, while consistently mentoring team members and elevating the team's overall code quality."
  }
];

// --- Logical Grouping for Structured Access ---

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    summary: string;
    socialLinks: typeof SOCIAL_LINKS_DATA;
  };
  professional: {
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
    certifications: Certification[];
    awards: Award[];
    education: Education[];
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: OWNER.name,
    role: OWNER.role,
    summary: SUMMARY_DATA,
    socialLinks: SOCIAL_LINKS_DATA
  },
  professional: {
    experiences: EXPERIENCES_DATA,
    skills: SKILLS_DATA,
    projects: PROJECTS_DATA,
    certifications: CERTIFICATIONS_DATA,
    awards: AWARDS_DATA,
    education: EDUCATION_DATA
  }
};

// --- Backward Compatibility Exports ---
// These are kept to ensure existing imports in other files don't break.
export const SOCIAL_LINKS = SOCIAL_LINKS_DATA;
export const SUMMARY = SUMMARY_DATA;
export const EXPERIENCES = EXPERIENCES_DATA;
export const PROJECTS = PROJECTS_DATA;
export const SKILLS = SKILLS_DATA;
export const EDUCATION = EDUCATION_DATA;
export const CERTIFICATIONS = CERTIFICATIONS_DATA;
export const AWARDS = AWARDS_DATA;
