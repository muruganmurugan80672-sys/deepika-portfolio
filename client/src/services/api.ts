import axios from 'axios';
import { Project, Skill, Education, Certification, ContactFormData, ApiResponse, HealthResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Fallback seed data in case API is loading or offline
const FALLBACK_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Project Management Dashboard',
    slug: 'project-management-dashboard',
    description: 'A task management dashboard for organizing projects, tracking task statuses, and viewing task details through a structured interface.',
    longDescription: 'Full-stack task and project tracking application featuring interactive Kanban/list views, priority tagging, status tracking, search filtering, and RESTful API backend.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap 5'],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: '',
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Personal Portfolio Website',
    slug: 'personal-portfolio-website',
    description: 'A responsive portfolio showcasing technical skills, projects, education, and professional interests with Swagger documentation and MongoDB backend.',
    longDescription: 'Engineered with Midnight Executive theme styling, Vite, React, TypeScript, Express REST APIs, Mongoose data modeling, and custom CSS design system.',
    technologies: ['React', 'TypeScript', 'Bootstrap 5', 'Express', 'MongoDB', 'Swagger'],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: 'http://localhost:5173',
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Banking Information System',
    slug: 'banking-information-system',
    description: 'A programming project focused on organizing banking-related information, user accounts, and implementing core data operations.',
    longDescription: 'Implemented robust object-oriented architecture in Java for account management, transaction logging, data validation, and persistent storage.',
    technologies: ['Java', 'SQL', 'SQLite', 'OOP', 'Data Structures'],
    category: 'Backend / Systems',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: '',
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Restaurant Website',
    slug: 'restaurant-website',
    description: 'A responsive restaurant website presenting menu information, restaurant details, reservation layout, and an attractive browsing experience.',
    longDescription: 'Features smooth UI components, interactive menu filtering, responsive media grids, and optimized asset loading.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    category: 'Frontend',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: '',
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const FALLBACK_SKILLS: Skill[] = [
  { _id: '1', name: 'HTML5', category: 'Frontend Development', icon: 'Code', sortOrder: 1 },
  { _id: '2', name: 'CSS3', category: 'Frontend Development', icon: 'Palette', sortOrder: 2 },
  { _id: '3', name: 'JavaScript', category: 'Frontend Development', icon: 'FileCode', sortOrder: 3 },
  { _id: '4', name: 'React.js', category: 'Frontend Development', icon: 'Atom', sortOrder: 4 },
  { _id: '5', name: 'TypeScript', category: 'Frontend Development', icon: 'FileCheck', sortOrder: 5 },
  { _id: '6', name: 'Bootstrap 5', category: 'Frontend Development', icon: 'LayoutGrid', sortOrder: 6 },
  { _id: '7', name: 'Node.js', category: 'Backend Development', icon: 'Server', sortOrder: 1 },
  { _id: '8', name: 'Express.js', category: 'Backend Development', icon: 'Cpu', sortOrder: 2 },
  { _id: '9', name: 'REST API Development', category: 'Backend Development', icon: 'Network', sortOrder: 3 },
  { _id: '10', name: 'Swagger / OpenAPI', category: 'Backend Development', icon: 'FileText', sortOrder: 4 },
  { _id: '11', name: 'MongoDB', category: 'Databases', icon: 'Database', sortOrder: 1 },
  { _id: '12', name: 'Mongoose', category: 'Databases', icon: 'Layers', sortOrder: 2 },
  { _id: '13', name: 'SQL', category: 'Databases', icon: 'Table', sortOrder: 3 },
  { _id: '14', name: 'SQLite', category: 'Databases', icon: 'HardDrive', sortOrder: 4 },
  { _id: '15', name: 'Java', category: 'Programming Languages', icon: 'Coffee', sortOrder: 1 },
  { _id: '16', name: 'Python', category: 'Programming Languages', icon: 'Terminal', sortOrder: 2 },
  { _id: '17', name: 'Git', category: 'Development Tools', icon: 'GitBranch', sortOrder: 1 },
  { _id: '18', name: 'GitHub', category: 'Development Tools', icon: 'Github', sortOrder: 2 },
  { _id: '19', name: 'Visual Studio Code', category: 'Development Tools', icon: 'Code2', sortOrder: 3 },
  { _id: '20', name: 'npm', category: 'Development Tools', icon: 'Package', sortOrder: 4 },
  { _id: '21', name: 'Postman', category: 'Development Tools', icon: 'Send', sortOrder: 5 },
];

const FALLBACK_EDUCATION: Education[] = [
  {
    _id: '1',
    degree: 'B.Tech in Information Technology',
    institution: 'University College of Engineering',
    department: 'Department of Information Technology',
    startYear: '2022',
    endYear: '2026',
    description: 'Pursuing undergraduate studies focusing on Data Structures, Algorithms, Web Development, Database Systems, Operating Systems, and Software Engineering principles.',
  },
];

const FALLBACK_CERTIFICATIONS: Certification[] = [
  {
    _id: '1',
    title: 'Full-Stack Web Development',
    issuer: 'Technical Online Program',
    completionDate: '2024',
    credentialUrl: '',
  },
  {
    _id: '2',
    title: 'Python for Data Science',
    issuer: 'Online Learning Platform',
    completionDate: '2023',
    credentialUrl: '',
  },
  {
    _id: '3',
    title: 'Data Structures and Algorithms in Java',
    issuer: 'Academic Portal',
    completionDate: '2023',
    credentialUrl: '',
  },
];

export const getHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  } catch (error) {
    return {
      status: 'offline',
      timestamp: new Date().toISOString(),
      database: { connected: false, state: 'disconnected' },
    };
  }
};

export const getProjects = async (category?: string, featured?: boolean): Promise<Project[]> => {
  try {
    const response = await api.get<ApiResponse<Project[]>>('/projects', {
      params: { category, featured },
    });
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data;
    }
    return FALLBACK_PROJECTS;
  } catch (error) {
    console.warn('API error fetching projects, using fallback data:', error);
    return FALLBACK_PROJECTS;
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    if (response.data && response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('API error fetching project by ID, searching fallback data:', error);
  }
  return FALLBACK_PROJECTS.find((p) => p._id === id || p.slug === id) || null;
};

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get<ApiResponse<Skill[]>>('/skills');
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data;
    }
    return FALLBACK_SKILLS;
  } catch (error) {
    console.warn('API error fetching skills, using fallback data:', error);
    return FALLBACK_SKILLS;
  }
};

export const getEducation = async (): Promise<Education[]> => {
  try {
    const response = await api.get<ApiResponse<Education[]>>('/education');
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data;
    }
    return FALLBACK_EDUCATION;
  } catch (error) {
    console.warn('API error fetching education, using fallback data:', error);
    return FALLBACK_EDUCATION;
  }
};

export const getCertifications = async (): Promise<Certification[]> => {
  try {
    const response = await api.get<ApiResponse<Certification[]>>('/certifications');
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data;
    }
    return FALLBACK_CERTIFICATIONS;
  } catch (error) {
    console.warn('API error fetching certifications, using fallback data:', error);
    return FALLBACK_CERTIFICATIONS;
  }
};

export const submitContact = async (data: ContactFormData): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>('/contact', data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: error.message || 'Network error occurred while submitting contact message.',
    };
  }
};

export default api;
