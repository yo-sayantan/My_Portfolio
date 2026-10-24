
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
    techStack: ['TypeScript', 'React 19', 'Python', 'Docker', 'Ollama', 'Claude / Gemini', 'LLM Agents', 'Jira & Bitbucket APIs'],
    description: 'A self-hosted, AI-assisted kanban board that mirrors your Jira tickets and pull requests. A background agent syncs the work, drag-and-drop writes status back to Jira, and LLMs generate ticket briefs and ship / no-ship PR readiness reports.',
    longDescription: 'A private, local-first replacement for the Jira UI. A background agent pulls assigned tickets and pull requests into a local snapshot, so the single-file React app opens instantly with no login or spinner. Dragging a card writes the status change through to Jira behind the scenes, guarded by workflow rules (In Review needs a PR, Done needs merged PRs and a QA ticket) with one-click undo. An AI layer, using local models via Ollama or cloud models (Claude, Gemini, Cursor) at four depth levels, writes ticket briefs enriched from Confluence pages, linked tickets and PR diffs, plus PR Readiness Reports whose release gates pull in Jenkins builds, security-scan findings and Dynatrace evidence. Everything runs in non-root Docker containers bound to loopback with verified TLS.',
    features: [
      'Drag-and-Drop Status Sync to Jira',
      'Workflow Guard-Rails with One-Click Undo',
      'AI Ticket Briefs with Local or Cloud LLMs',
      'PR Readiness Reports with Ship / No-Ship Verdict',
      'Jenkins, Security-Scan & Dynatrace Evidence Gates',
      'Private by Default: Ollama and Loopback-only Containers'
    ],
    link: `${OWNER.github}/AI_JIRA_Board`
  },
  {
    id: 'quickbooks-integration',
    title: 'QuickBooks Integration',
    type: 'Work',
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
    title: 'ReadNTrade: Book Exchange Platform',
    type: 'Personal',
    techStack: ['Java 17', 'Spring Boot 3', 'Spring Security', 'JWT & OAuth2', 'Spring Data JPA', 'MySQL', 'React 18', 'Redux', 'Material UI', 'Quartz Scheduler', 'Maven'],
    description: 'A full-stack peer-to-peer marketplace where readers list books to rent or swap. A Spring Boot 3 / Java 17 API secured with Spring Security and JWT powers a React 18 + Redux + Material UI front end, backed by MySQL.',
    longDescription: 'ReadNTrade turns shelves into a community. Readers list books they are willing to rent or exchange, browse what others have, and trade directly peer-to-peer. The Java 17 / Spring Boot 3.2 backend exposes a stateless REST API protected by Spring Security with JWT and an OAuth2 resource server, persists data through Spring Data JPA on MySQL, and uses Quartz for scheduled background jobs and Apache POI for spreadsheet import and export. The React 18 front end is built with Redux for state, Axios for API calls and Material UI for a responsive interface. Backend and UI ship as separate deployables (an executable Spring Boot JAR and a static React build), and the repo includes a SQL dump so the whole stack runs locally in minutes.',
    features: [
      'Stateless Spring Security with JWT & OAuth2 Resource Server',
      'List Books for Rent or Peer-to-Peer Exchange',
      'Spring Data JPA on MySQL with Seed SQL Dump',
      'Quartz-Scheduled Jobs & Apache POI Spreadsheet Support',
      'React 18 + Redux + Material UI Responsive Front End',
      'Independent Backend JAR and Static UI Build for Easy Deployment'
    ],
    link: `${OWNER.github}/Book_Exchange_Project`
  },
  {
    id: 'quick-task',
    title: 'QuickTask Mobile Suite',
    type: 'Personal',
    techStack: ['Flutter', 'Dart', 'Back4App (Parse Server)', 'MongoDB', 'GitHub Actions', 'Material 3'],
    description: 'A cross-platform task manager built with Flutter and Dart on a Back4App (Parse Server) backend, with secure authentication, persistent sessions, real-time task sync and an automated GitHub Actions pipeline for Android builds.',
    longDescription: 'QuickTask is a full-stack mobile app that pairs a Flutter UI with a scalable Backend-as-a-Service. Authentication uses ParseUser for secure sign-up and login, with sessions persisted across restarts. Tasks support full CRUD with due dates and an instant completed/pending toggle, all scoped per user and stored in MongoDB through Back4App. The UI follows Material 3 with responsive layouts, and a GitHub Actions workflow builds Android APKs automatically.',
    features: [
      'Secure Sign-up & Login with ParseUser',
      'Persistent Sessions Across Restarts',
      'Real-time Task CRUD with Status Toggle',
      'Material 3 Responsive UI',
      'CI/CD: Automated Android APK Builds'
    ],
    link: `${OWNER.github}/QuickTask_Pro`
  },
  {
    id: 'pdf-unlocker',
    title: 'PDF Unlocker Pro',
    type: 'Personal',
    techStack: ['Rust', 'Multithreading', 'Native Windows GUI', 'Terminal UI', 'Cross-Platform'],
    description: 'A high-performance, multi-threaded PDF password-recovery tool written in Rust. Pattern-based search spreads candidates across every CPU core, with a native Windows GUI and a rich terminal UI for macOS and Linux.',
    longDescription: 'Built to recover access to your own password-protected PDFs, such as bank statements and payslips, when you remember part of the password. You describe the known structure with a compact pattern language (n for digits, c for letters, a for alphanumerics, x for any printable character), and the engine generates only matching candidates, distributing them across a configurable pool of worker threads to saturate every core. It ships as a native Windows GUI plus CLI/TUI builds for macOS and Linux, published through GitHub Releases.',
    features: [
      'Multi-threaded Search Across All CPU Cores',
      'Pattern-based Candidate Generation',
      'Native Windows GUI',
      'Rich Terminal UI for macOS & Linux',
      'Prebuilt Binaries via GitHub Releases'
    ],
    link: `${OWNER.github}/PDF_Unlocker_Pro`
  },
  {
    id: 'pc-part-picker',
    title: 'PC Part Picker: India Edition',
    type: 'Personal',
    techStack: ['Next.js 14', 'React', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'Docker', 'Web Scraping'],
    description: 'An intelligent PC-building assistant for the Indian market. Drag components into a visual assembly workspace, get real-time compatibility checks and compare live prices scraped from Indian retailers.',
    longDescription: 'Helps builders plan a compatible rig at the best local price. A drag-and-drop assembly zone lets users build visually while a rules engine validates CPU and motherboard sockets, RAM type, GPU clearance, PSU wattage and case fitment. Prices are scraped from Amazon India and MDComputers, parts persist in SQLite through Prisma ORM, and finished builds can be emailed as a summary. The Next.js 14 app ships with production and development Docker setups.',
    features: [
      'Visual Drag-and-Drop PC Assembly',
      'Real-time Compatibility Rules Engine',
      'Live Price Scraping (Amazon India, MDComputers)',
      'Prisma ORM with SQLite Persistence',
      'Email Build Summaries',
      'Dockerized Production Builds'
    ],
    link: `${OWNER.github}/PC_Part_Picker`
  },
  {
    id: 'legal-entity',
    title: 'Legal Entity Localization',
    type: 'Work',
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
    title: 'Dynamic Notification Infrastructure',
    type: 'Work',
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
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Gemini API', 'Netlify Functions', 'Canvas Physics'],
    description: 'This site: an interactive portfolio with a Gemini-powered AI assistant that answers questions about my experience, a flow-field particle simulation and serverless email and AI endpoints on Netlify.',
    longDescription: 'A comprehensive digital resume built with React 19, Vite and TypeScript, styled with Tailwind CSS. A Gemini-powered assistant, grounded in my resume data and served through a Netlify Function so no API keys reach the browser, answers visitor questions and can email the conversation transcript. The background is a custom canvas flow-field particle simulation using a spatial hash grid, with View Transition theme switching and CI/CD to Netlify and GitHub Pages.',
    features: [
      'Modern React & Vite Architecture',
      'Fully Responsive & Interactive UI',
      'Gemini-Powered Chat Assistant (Serverless)',
      'Flow-Field Particle Physics Background',
      'View Transition Light / Dark Theme',
      'Automated CI/CD Deployments'
    ],
    link: `${OWNER.github}/My_Portfolio`
  },
  {
    id: 'mf-portfolio-tracker',
    title: 'Mutual Fund Portfolio Tracker',
    type: 'Personal',
    techStack: ['Java', 'Spring Boot', 'React', 'Redux', 'Material UI', 'Recharts', 'JWT', 'Docker'],
    description: 'A full-stack mutual-fund tracker that ingests CAMS and KFintech statements, extracts holdings automatically and visualizes returns, allocation and growth on an interactive dashboard.',
    longDescription: 'Built to replace manual spreadsheet tracking of mutual-fund investments. Users bulk-upload password-protected CAMS or KFintech statements; the Spring Boot backend parses the PDFs securely, extracts transactions and serves them through JWT-protected REST APIs. The React and Redux frontend turns that data into a live dashboard with total value, daily returns, time-filtered growth charts (1M, 6M, 1Y, All) and allocation pie charts. The whole stack is packaged with Docker.',
    features: [
      'Automated CAMS / KFintech Statement Parsing',
      'Secure Password-Protected PDF Handling',
      'JWT-Secured Spring Boot REST APIs',
      'Interactive Growth & Allocation Charts',
      'Time-based Performance Filters'
    ],
    link: `${OWNER.github}/Investment_Portfolio_Tracker`
  },
  {
    id: 'investment-tracker',
    title: 'Algorithmic Investment Tracker',
    type: 'Personal',
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
    techStack: ['Java', 'Financial Algorithms', 'Risk Management', 'Goal-Based Planning'],
    description: 'A Java application that works backwards from a profit goal: it calculates the investment required to hit a target and applies risk-aware strategies to get there.',
    longDescription: 'A goal-driven financial planning tool. Instead of asking "what will my money become?", it answers "what do I need to invest to reach this profit?". Investment-strategy algorithms factor in risk appetite so the plan balances ambition with safety, giving data-driven projections for informed financial decisions.',
    features: [
      'Target-Profit to Required-Investment Calculation',
      'Risk-Aware Investment Strategy Algorithms',
      'Data-Driven Financial Projections'
    ]
  },
  {
    id: 'os-scheduler',
    title: 'OS CPU Scheduler Simulator',
    type: 'Personal',
    techStack: ['C', 'Bash', 'Python', 'Linux', 'Operating Systems', 'Concurrency', 'Algorithms'],
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
    link: `${OWNER.github}/OS_Scheduling`
  },
  {
    id: 'school-connect',
    title: 'School Connect',
    type: 'Personal',
    techStack: ['Java', 'Spring Boot', 'Database', 'RESTful APIs'],
    description: 'A comprehensive educational platform designed to streamline communication and management between students, teachers, and administrators. Developed scalable backend services to handle complex academic workflows.',
    longDescription: 'SchoolConnect is a robust application engineered to digitize school administration. It provides a centralized hub for managing student records, grading systems, and real-time notifications. The architecture utilizes a scalable backend designed to handle high concurrency during peak usage times, such as exam result publications.',
    features: [
      'Centralized Academic Management',
      'Real-time Notification System',
      'Scalable Backend Architecture',
      'Secure Role-Based Access Control',
      'Streamlined Grading & Reporting'
    ]
  },
  {
    id: 'beautiful-bengal',
    title: 'Beautiful Bengal v3',
    type: 'Personal',
    techStack: ['React 19', 'Vite', 'Tailwind CSS v4', 'React Router v7', 'Framer Motion', 'Responsive Design', 'Lucide Icons'],
    description: 'An immersive tourism and culture site for West Bengal, rebuilt as a modern React 19 + Vite app with Tailwind v4, Framer Motion transitions and a data-driven guide to every district, its cuisine, crafts and heritage.',
    longDescription: 'Beautiful Bengal v3 is a complete rebuild of an earlier site into a fast, animated single-page app, a digital gateway to the "Sweetest Part of India". Content is data-driven: a district dataset feeds drill-down pages for every district, alongside dedicated sections for tourism, culture, cuisine, architecture, handicrafts, industry and the people of Bengal, plus an immersive photo gallery and a contact page. React Router v7 handles routing, Framer Motion powers page transitions and scroll effects, Tailwind CSS v4 delivers a mobile-first responsive layout, and Vite keeps builds and hot reloads fast.',
    features: [
      'Drill-Down Guide for Every District of West Bengal',
      'Sections on Tourism, Culture, Cuisine, Architecture & Crafts',
      'Immersive Image Gallery',
      'Framer Motion Page Transitions & Scroll Effects',
      'Mobile-First Responsive Layout with Tailwind v4',
      'Vite + React Router v7 for a Fast SPA'
    ],
    link: `${OWNER.github}/Beautiful_Bengal_v3`
  }
];

const SKILLS_DATA: Skill[] = [
  {
    category: "Backend Engineering",
    items: ["Java (8–21)", "Spring Boot", "Microservices", "Hibernate / JPA", "REST & SOAP APIs", "API Gateway", "Multithreading & Concurrency", "System Design", "DSA"]
  },
  {
    category: "Cloud & Database",
    items: ["AWS", "Oracle Cloud (OCI)", "Docker", "Kubernetes", "MySQL", "Oracle DB", "PL/SQL", "Redis / NoSQL"]
  },
  {
    category: "AI & Productivity",
    items: ["Claude Code", "Cursor", "GitHub Copilot", "GPT-5", "Gemini API", "MCP Servers", "AI Agents", "Ollama (Local LLMs)", "Prompt Engineering"]
  },
  {
    category: "DevOps & Full-Stack",
    items: ["CI/CD", "Jenkins", "GitHub Actions", "Git / GitHub", "Maven / Gradle", "JUnit", "JBoss", "React & TypeScript", "Regex", "XML / JSON"]
  }
];

const CERTIFICATIONS_DATA: Certification[] = [
  { name: "OCI Foundations Associate", date: "11/2023", issuer: "Oracle" },
  { name: "Product Essentials Program", date: "06/2021" },
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
