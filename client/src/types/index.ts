export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  imageUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
  sortOrder: number;
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  department: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  completionDate: string;
  credentialUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data?: T;
  message?: string;
  error?: string;
  details?: Array<{ field: string; message: string }>;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  database: {
    connected: boolean;
    state: string;
    host?: string;
    name?: string;
  };
}
