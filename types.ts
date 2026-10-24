
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills?: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  /** Medium-length blurb (used by the AI assistant's context). */
  description: string;
  /** One-line teaser shown on the project card. */
  summary?: string;
  /** Full write-up shown in the project details window. */
  longDescription?: string;
  features?: string[];
  /** Tools you need installed to build/run the project (shown as "Run it with"). */
  requirements?: string[];
  /** Engineering skills and concepts the project demonstrates (shown as "Skills demonstrated"). */
  skills?: string[];
  type: 'Work' | 'Personal';
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  date: string;
  issuer?: string;
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  details: string[];
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description: string;
}
