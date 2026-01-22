// Global TypeScript definitions for the portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  hook: string;
  technologies: string[];
  domains: string[]; // Dual-fluency tags
  metrics?: ProjectMetric[];
  image?: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface StackLayer {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  description: string;
  accentColor: "cmu-red" | "bio-cyan" | "neural-purple" | "system-amber";
  icon: React.ReactNode;
  projects: Project[];
  backgroundEffect?: "bounding-box" | "node-graph" | "circuit" | "dna-helix";
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  location: string;
  education: Education[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
  coursework?: string[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}
