
import { Experience, Project, Skill, Certification, Education, Award } from './types';

// --- Raw Data Definitions ---

const SOCIAL_LINKS_DATA = {
  github: "https://github.com/yo-sayantan",
  linkedin: "https://www.linkedin.com/in/yo-sayantan",
  email: "sayantanbiswas.mycareer@gmail.com",
  phone: "+917381183721",
};

const SUMMARY_DATA = "Experienced Senior Software Engineer with nearly 5 years of expertise in Java backend development, AWS cloud architectures, and Microservices. I specialize in building high-performance, scalable systems while leveraging AI-driven workflows—including prompt engineering, MCP Servers, and AI agents—to maximize productivity and code quality. Committed to continuous innovation, I drive engineering excellence through modern tech stacks and intelligent solutions.";

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
      'Championing an AI-first culture by integrating GitHub Copilot, Cursor, and GPT-5 into the development lifecycle, boosting team productivity by 30%.'
    ],
    skills: ['Java', 'Microservices', 'Docker', 'Kubernetes', 'API Gateway', 'Fraud Detection', 'AI Agents', 'Cursor']
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
      'Integrated AI-driven workflows (ChatGPT, Claude, Gemini) to automate coding tasks and documentation, achieving a 30% increase in productivity.',
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
    link: 'https://github.com/yo-sayantan/Book_Exchange_Project'
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
    link: 'https://github.com/yo-sayantan/QuickTask_Pro'
  },
  {
    id: 'legal-entity',
    title: 'Legal Entity Localization',
    type: 'Work',
    techStack: ['AWS', 'Java', 'Microservices', 'Compliance', 'PL/SQL', 'Spring Batch'],
    description: 'Spearheaded the development of a mission-critical microservice on AWS for invoice localization. Engineered workflows to dynamically validate and fetch entity data, ensuring strict compliance with diverse international financial regulations.',
    longDescription: 'This enterprise-grade microservice was architected to solve complex regulatory compliance challenges for multinational invoicing. Hosting on AWS, the service dynamically adjusts validation logic based on the legal entitys jurisdiction. It integrates with legacy PL/SQL systems while providing a modern REST interface for consuming applications, ensuring that all financial documents meet strict local legal standards.',
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
    link: 'https://github.com/yo-sayantan/OS_Scheduling'
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
    items: ["GitHub Copilot", "Cursor", "GPT5", "ChatGPT-4o", "MCP Servers", "AI Agents", "Prompt Engineering"]
  },
  {
    category: "DevOps & Tools",
    items: ["CI/CD", "JBoss", "Git/GitHub", "JUnits", "Maven/Gradle", "XML/JSON", "Regex", "ADF"]
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
    title: "Spot Award",
    issuer: "Oracle",
    year: "2023",
    description: "For exceptional delivery of the Payment Service Integration project ahead of schedule."
  },
  {
    title: "Star Performer",
    issuer: "HighRadius",
    year: "2021",
    description: "Recognized for outstanding contributions to the Credit Cloud module and team mentorship."
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
    name: "Sayantan Biswas",
    role: "Senior Software Engineer",
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
