export type ProjectStatus = "ongoing" | "normal";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectAttachment {
  kind: "pdf" | "image" | "readme" | "external";
  label: string;
  path?: string;
  url?: string;
}

export interface StorySection {
  title: string;
  body: string;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  status: ProjectStatus;
  year: string;
  shortDescription: string;
  headline: string;
  domain: string;
  graphLabels: string[];
  stack: string[];
  metrics: ProjectMetric[];
  story: StorySection[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  sourceFolder?: string;
  readme?: string;
  attachments: ProjectAttachment[];
}

export interface ProjectPreview {
  slug: string;
  title: string;
  status: ProjectStatus;
  year: string;
  shortDescription: string;
  headline: string;
  domain: string;
  graphLabels: string[];
  stack: string[];
  metrics: ProjectMetric[];
  image?: string;
  featured: boolean;
}

export interface GraphCluster {
  id: string;
  label: string;
  description: string;
  color: string;
  x: number;
  y: number;
  relatedProjectSlugs: string[];
}

export interface JourneyEntry {
  stamp: string;
  title: string;
  body: string;
}

export interface SiteProfile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  labels: string[];
  detail: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  accent: "cyan" | "red" | "yellow" | "white";
  cards: KanbanCard[];
}

export interface KanbanBoard {
  updatedAt: string;
  columns: KanbanColumn[];
}
