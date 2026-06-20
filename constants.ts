
import { Experience, Project, Skill, Certification, Education, Award } from './types';
import { OWNER } from './ownerConfig';

// --- Raw Data Definitions ---

const SOCIAL_LINKS_DATA = {
  github: OWNER.github,
  linkedin: OWNER.linkedin,
  email: OWNER.email,
  phone: OWNER.phone,
};

const SUMMARY_DATA = "Experienced Senior Software Engineer with over {{YRS}} years of expertise in Java backend development, AWS cloud architectures, and Microservices. I specialize in architecting high-performance, highly concurrent systems that solve complex, data-heavy enterprise challenges. By seamlessly blending traditional robust engineering with a touch of modern AI-driven workflows, I am able to significantly accelerate development lifecycles and maximize code quality. I am deeply committed to continuous innovation, mentoring cross-functional teams, and driving engineering excellence through scalable, intelligent solutions.";

const EXPERIENCES_DATA: Experience[] = [
  {
    id: 'experian',
    company: 'Experian',
    role: 'Senior Software Engineer',
    period: 'Dec 2024 – Present',
    location: 'Hyderabad, Telangana',
    description: [
      'Driving the Fraud Detection (FSD) Team initiatives, enhancing critical infrastructure for real-time financial transaction monitoring.',
      'Spearheading the modernization of the PreciseID tool to deliver advanced fraud analytics and robust verification policies.',
      'Architecting a high-throughput API Gateway to efficiently orchestrate data flow between microservices and redirect requests with low latency.',
      'Orchestrating containerized microservices using Docker and Kubernetes, ensuring high availability and seamless server management.',
      'Led the end-to-end architectural migration of legacy applications to AWS using Docker, while upgrading core systems from JDK8 to JDK21 to maximize scalability and performance.',
      'Modernized the user interfaces of multiple enterprise portals by upgrading legacy codebases to the latest JavaScript frameworks, ensuring seamless cross-browser compatibility and highly responsive frontend performance.',
      'Championing an AI-first culture by integrating Claude, Cursor, MCP servers, and other AI tools into the development lifecycle, boosting team productivity by almost 50%.'
    ],
    skills: ['Java', 'Microservices', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'API Gateway', 'Claude', 'Cursor', 'MCPs', 'AI Agents']
  },
  {
    id: 'oracle',
    company: 'Oracle',
    role: 'Applications Engineer 2',
    period: 'Aug 2022 – Nov 2024',
    location: 'Hyderabad, Telangana',
    description: [
      'Spearheaded a strategic payment service integration with Mastercard and HSBC for Oracle Fusion Cloud Financials, optimizing revenue recognition and client cash flow.',
      'Architected and managed dynamic Docker deployments on Oracle VM, ensuring seamless Oracle DB integration and high system availability.',
      'Designed and implemented scalable microservices architectures to facilitate robust payment service integrations.',
      'Partnered with Tax and Project Management teams to innovate and launch new financial products on Fusion Payables for global enterprise and government clients.',
      'Leveraged advanced PL/SQL optimization, SQLHC, and AWR analysis to boost database performance and ensure data integrity.',
      'Integrated AI-driven workflows (ChatGPT, Claude, Gemini) to automate coding tasks and documentation, achieving 30% increase in productivity.',
      'Established comprehensive automated testing frameworks using JUnit and UTPL/SQL to guarantee software quality.'
    ],
    skills: ['Java', 'Oracle Cloud', 'Docker', 'Microservices', 'PL/SQL', 'Generative AI', 'Payment Integrations', 'JUnit']
  },
  {
    id: 'highradius-assoc',
    company: 'HighRadius',
    role: 'Associate Software Engineer',
    period: 'Jun 2021 – Jul 2022',
    location: 'Hyderabad, Telangana',
    description: [
      'Architected and developed core modules for the HighRadius Credit application using Java, Spring, Hibernate, ExtJS, and MySQL, implementing robust RESTful APIs.',
      'Spearheaded the integration of QuickBooks and WorldPay to enable dynamic credit limit functionalities, directly driving new client acquisition and improving payment efficiency.',
      'Optimized system performance by implementing strategic multithreading solutions in Java, significantly reducing latency for critical core processes.',
      'Engineered a highly flexible Dynamic Notification System, enabling customized in-portal alerts based on specific merchant criteria to boost user engagement.',
      'Delivered over 50+ functional enhancements and software features based on client requirements, while resolving critical production bottlenecks.',
      'Mentored and trained a cohort of 20 interns and new hires, fostering best practices in SaaS development.'
    ],
    skills: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'ExtJS', 'REST API', 'Multithreading', 'Payment Integrations']
  },
  {
    id: 'highradius-junior',
    company: 'HighRadius',
    role: 'Junior Engineer',
    period: 'Jun 2020 – May 2021',
    location: 'Bhubaneshwar, Odisha',
    description: [
      'Developed a high-efficiency framework for autonomous testing of flagship products like HighRadius Credit and EIPP.',
      'Led a team of 6 engineers in designing and delivering critical User Stories for the EIPP product suite.',
      'Engineered robust solutions for parsing complex PDF, TXT, and XLSX files using advanced Regex patterns.',
      'Established comprehensive test scripts and automation protocols in collaboration with the QA team.'
    ],
    skills: ['Test Automation', 'Java', 'Regex', 'Team Leadership', 'Parsers']
  }
];

const EDUCATION_DATA: Education[] = [
  {
    school: "Birla Institute of Technology & Science (BITS) Pilani",
    degree: "M. Tech. (Software Engineering)",
    location: "Hyderabad",
    details: [
      "Specialised in Software Engineering (Full Stack, Security, DevOps, Scalability, Cloud, Architecture)",
      "Post-Graduated with 8 CGPA"
    ]
  },
  {
    school: "Kalinga Institute of Industrial Technology (KIIT) University",
    degree: "B. Tech. (Computer Science and Engineering)",
    location: "Bhubaneshwar, Odisha",
    details: [
      "Majored in Computer Science and Engineering",
      "Graduated with 9.13 CGPA"
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
    title: 'Book Exchange Ecosystem',
    type: 'Personal',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'React', 'Redux', 'Tailwind CSS', 'JWT'],
    description: 'Architected a comprehensive full-stack platform facilitating peer-to-peer book marketplace interactions. Leveraged Spring Boot microservices for complex transaction handling and React for a responsive, community-driven user interface.',
    longDescription: 'The Book Exchange Ecosystem is a robust, full-stack platform designed to democratize access to literature by enabling seamless peer-to-peer book trading. The architecture separates concerns between a high-performance Java Spring Boot backend and a dynamic React frontend. The system handles complex state management for trade negotiations, real-time inventory updates, and secure user authentication using JWT.',
    features: [
      'Secure User Authentication (JWT & OAuth2)',
      'Real-time Inventory Management',
      'Peer-to-Peer Trade Negotiation Logic',
      'Responsive React UI with Dark Mode Support',
      'RESTful API Design with Swagger Documentation'
    ],
    link: `${OWNER.github}/Book_Exchange_Project`
  },
  {
    id: 'quick-task',
    title: 'QuickTask Mobile Suite',
    type: 'Personal',
    techStack: ['Flutter', 'Dart', 'Android', 'SQLite', 'Material Design'],
    description: 'Designed and deployed a cross-platform productivity application using Flutter. Implemented advanced state management with Provider and local data persistence via SQLite to ensure a seamless offline-first experience for task tracking.',
    longDescription: 'QuickTask is a productivity-focused mobile application built with Flutter to ensure a native-like performance on both Android and iOS. It prioritizes an "Offline-First" architecture, utilizing SQLite for local persistence so users can manage tasks without internet connectivity. The app features a clean, Material Design interface and uses the Provider pattern for efficient state management across complex widget trees.',
    features: [
      'Offline-First Architecture with SQLite',
      'Cross-Platform Support (Android/iOS)',
      'Advanced State Management with Provider',
      'Customizable Task Categories & Priorities',
      'Push Notifications for Deadlines'
    ],
    link: `${OWNER.github}/QuickTask_Pro`
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
    description: 'Revolutionized credit approval workflows by engineering a high-concurrency parallel processing engine. Utilized custom thread pools to process batches of 100+ invoices simultaneously, reducing turnaround time by 80% during peak financial closures.',
    longDescription: 'Addressing a critical bottleneck in financial closing periods, this engine utilizes Java advanced concurrency utilities to parallelize invoice processing. By implementing custom ExecutorServices and optimizing thread pool management, the system can handle massive spikes in load without degradation. The architecture includes a robust failure recovery mechanism to ensure data integrity even during partial system failures.',
    features: [
      'High-Concurrency Invoice Processing',
      'Custom Thread Pool Management',
      'Fault-Tolerant Batch Processing',
      'Real-time Processing Status Monitoring',
      '80% Reduction in Turnaround Time'
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
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AI Integrations'],
    description: 'A dynamic, highly interactive personal portfolio website showcasing professional experience, projects, and skills. Built with modern web technologies and featuring advanced AI-driven conversational capabilities.',
    longDescription: 'This project serves as a comprehensive digital resume. It leverages React and Vite for blazing-fast performance, TypeScript for robust type safety, and Tailwind CSS for a stunning, responsive design. The platform integrates intelligent AI chatbots to provide an interactive experience for visitors seeking to learn more about my background.',
    features: [
      'Modern React & Vite Architecture',
      'Fully Responsive & Interactive UI',
      'AI-Powered Chat Assistant',
      'Dynamic Content Rendering',
      'Performance Optimized'
    ],
    link: `${OWNER.github}/My_Portfolio`
  },
  {
    id: 'investment-tracker',
    title: 'Algorithmic Investment Tracker',
    type: 'Personal',
    techStack: ['Google Sheets API', 'Python', 'Data Analysis'],
    description: 'Built an automated financial analytics tool integrating Google Sheets API for real-time market data ingestion. Developed custom algorithms to calculate risk-adjusted returns and visualize portfolio diversification for data-driven decisions.',
    longDescription: 'An automated personal finance tool that bridges the gap between raw market data and actionable insights. Using Python and the Google Sheets API, this tool fetches real-time stock prices, calculates complex metrics like Sharpe Ratio and Beta, and generates visualization reports. It allows for automated rebalancing alerts based on pre-set portfolio allocation targets.',
    features: [
      'Real-time Market Data Ingestion',
      'Automated Risk Metrics Calculation (Sharpe, Beta)',
      'Portfolio Rebalancing Alerts',
      'Visual Data Analysis with Matplotlib',
      'Google Sheets Bi-directional Sync'
    ]
  },
  {
    id: 'investment-planner',
    title: 'Investment Planner',
    type: 'Personal',
    techStack: ['Java', 'Financial Algorithms', 'Risk Management'],
    description: 'Developed a Java-based application for financial planning. Calculates required investments to achieve target profits and handles investment strategies for risk management.',
    longDescription: 'A Java-based financial planning tool designed to help users calculate the required investments to achieve target profit goals. The application implements investment strategy algorithms that factor in risk management, enabling informed financial decision-making through data-driven projections.',
    features: [
      'Target Profit Calculation Engine',
      'Investment Strategy Algorithms',
      'Risk Management Analysis',
      'Data-Driven Financial Projections'
    ]
  },
  {
    id: 'os-scheduler',
    title: 'OS CPU Scheduler Simulator',
    type: 'Personal',
    techStack: ['C++', 'Bash', 'Linux', 'System Architecture'],
    description: 'Simulated a complex Operating System process scheduler in C++. Implemented core algorithms like Round Robin and Shortest Job First (SJF) to visualize CPU resource allocation and context switching in a resource-constrained environment.',
    longDescription: 'A deep-dive educational simulation of Operating System internals. This project implements various CPU scheduling algorithms from scratch in C++ to visualize how processes are managed in a time-sharing environment. It includes a CLI interface to monitor process states (Ready, Running, Blocked) and analyzes the efficiency of algorithms like Round Robin, SJF, and Priority Scheduling under different loads.',
    features: [
      'Implementation of Round Robin & SJF Algorithms',
      'Context Switching Simulation',
      'Process State Visualization (CLI)',
      'Performance Metrics (Turnaround Time, Wait Time)',
      'Bash Scripts for Automated Testing'
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
    title: 'Beautiful Bengal',
    type: 'Personal',
    techStack: ['Web Development', 'UI/UX Design', 'Frontend'],
    description: 'A visually immersive web platform dedicated to showcasing the rich cultural heritage and tourism potential of Bengal. Focused on delivering a highly engaging and aesthetic user experience.',
    longDescription: 'Beautiful Bengal v3 is a passion project aimed at promoting regional tourism through a digital lens. The application features stunning visual galleries, interactive maps, and curated travel guides. The frontend was meticulously crafted to ensure seamless navigation, fast load times, and a responsive design that looks perfect on both mobile and desktop devices.',
    features: [
      'Immersive Visual Galleries',
      'Interactive Tourism Maps',
      'Curated Travel Guides',
      'Responsive Mobile-First Design',
      'Optimized Asset Loading'
    ],
    link: `${OWNER.github}/Beautiful_Bengal_v3`
  }
];

const SKILLS_DATA: Skill[] = [
  {
    category: "Backend Engineering",
    items: ["Java", "SpringBoot", "Microservices", "Hibernate", "REST/SOAP", "System Design", "DSA"]
  },
  {
    category: "Cloud & Database",
    items: ["AWS", "Oracle Cloud", "Docker", "Kubernetes", "MySQL", "PL/SQL", "Oracle DB", "Redis/NoSQL"]
  },
  {
    category: "AI & Productivity",
    items: ["GitHub Copilot", "Cursor", "GPT5", "Claude Code", "Ollama", "MCP Servers", "AI Agents", "Prompt Engineering"]
  },
  {
    category: "DevOps & Tools",
    items: ["CI/CD", "Jenkins", "JBoss", "Git/GitHub", "JUnits", "Maven/Gradle", "XML/JSON", "Regex", "ADF"]
  }
];

const CERTIFICATIONS_DATA: Certification[] = [
  { name: "OCI Foundations Associate", date: "11/2023", issuer: "Oracle" },
  { name: "Product Essentials Program", date: "06/2021" },
  { name: "Basic Python Certification", date: "06/2019" },
  { name: "NIIT Java Certification", date: "05/2018" }
];

const AWARDS_DATA: Award[] = [
  {
    title: "NIKE Technology Transformation",
    issuer: "Experian",
    year: "2026",
    description: "Awarded for exceptional leadership in driving strategic change, owning complex technical outcomes, and delivering measurable impacts during the comprehensive modernization of core fraud-detection workflows."
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
