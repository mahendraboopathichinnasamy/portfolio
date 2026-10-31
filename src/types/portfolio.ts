export interface Profile {
  name: string;
  titles: string[];
  role: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  location: string;
  availability: string;
  resumeDownloadUrl: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export type SkillCategory = 'all' | 'mobile' | 'frontend' | 'backend' | 'data' | 'ai';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Advanced' | 'Intermediate' | 'Expert';
  percentage: number;
  icon: string;
  color: string;
  description: string;
  yearsOfExperience: string;
  relatedProjects: string[];
  shortNote: string;
}

export type ProjectTechCategory = 'all' | 'mobile' | 'web' | 'python' | 'data' | 'ai';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  techCategory: ProjectTechCategory;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  image: string;
  metrics: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  score: string;
  year: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  type: string;
  description: string;
  skillsAcquired: string[];
}
