import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from './models/Project';
import { Skill } from './models/Skill';
import { Education } from './models/Education';
import { Certification } from './models/Certification';
import { connectDatabase } from './config/database';

dotenv.config();

const sampleProjects = [
  {
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
  },
  {
    title: 'Personal Portfolio Website',
    slug: 'personal-portfolio-website',
    description: 'A responsive full-stack portfolio showcasing technical skills, projects, education, and professional interests with Swagger documentation and MongoDB storage.',
    longDescription: 'Engineered with Midnight Executive theme styling, Vite, React, TypeScript, Express REST APIs, Mongoose data modeling, and custom CSS design system.',
    technologies: ['React', 'TypeScript', 'Bootstrap 5', 'Express', 'MongoDB', 'Swagger'],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: 'http://localhost:5173',
    featured: true,
    published: true,
  },
  {
    title: 'Banking Information System',
    slug: 'banking-information-system',
    description: 'A programming project focused on organizing banking-related information, user accounts, and implementing core data operations.',
    longDescription: 'Implemented robust object-oriented architecture in Java for account management, transaction logging, data validation, and persistent file/database storage.',
    technologies: ['Java', 'SQL', 'SQLite', 'OOP', 'Data Structures'],
    category: 'Backend / Systems',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: '',
    featured: false,
    published: true,
  },
  {
    title: 'Restaurant Website',
    slug: 'restaurant-website',
    description: 'A responsive restaurant website presenting menu information, restaurant details, reservation booking layout, and an attractive browsing experience.',
    longDescription: 'Features smooth UI components, interactive menu filtering, responsive media grids, and optimized asset loading.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    category: 'Frontend',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com',
    liveDemoUrl: '',
    featured: false,
    published: true,
  },
];

const sampleSkills = [
  // Frontend
  { name: 'HTML5', category: 'Frontend Development', icon: 'Code', sortOrder: 1 },
  { name: 'CSS3', category: 'Frontend Development', icon: 'Palette', sortOrder: 2 },
  { name: 'JavaScript', category: 'Frontend Development', icon: 'FileCode', sortOrder: 3 },
  { name: 'React.js', category: 'Frontend Development', icon: 'Atom', sortOrder: 4 },
  { name: 'TypeScript', category: 'Frontend Development', icon: 'FileCheck', sortOrder: 5 },
  { name: 'Bootstrap 5', category: 'Frontend Development', icon: 'LayoutGrid', sortOrder: 6 },

  // Backend
  { name: 'Node.js', category: 'Backend Development', icon: 'Server', sortOrder: 1 },
  { name: 'Express.js', category: 'Backend Development', icon: 'Cpu', sortOrder: 2 },
  { name: 'REST API Development', category: 'Backend Development', icon: 'Network', sortOrder: 3 },
  { name: 'Swagger / OpenAPI', category: 'Backend Development', icon: 'FileText', sortOrder: 4 },

  // Databases
  { name: 'MongoDB', category: 'Databases', icon: 'Database', sortOrder: 1 },
  { name: 'Mongoose', category: 'Databases', icon: 'Layers', sortOrder: 2 },
  { name: 'SQL', category: 'Databases', icon: 'Table', sortOrder: 3 },
  { name: 'SQLite', category: 'Databases', icon: 'HardDrive', sortOrder: 4 },

  // Programming Languages
  { name: 'Java', category: 'Programming Languages', icon: 'Coffee', sortOrder: 1 },
  { name: 'Python', category: 'Programming Languages', icon: 'Terminal', sortOrder: 2 },

  // Tools & Libraries
  { name: 'Git', category: 'Development Tools', icon: 'GitBranch', sortOrder: 1 },
  { name: 'GitHub', category: 'Development Tools', icon: 'Github', sortOrder: 2 },
  { name: 'Visual Studio Code', category: 'Development Tools', icon: 'Code2', sortOrder: 3 },
  { name: 'npm', category: 'Development Tools', icon: 'Package', sortOrder: 4 },
  { name: 'Postman', category: 'Development Tools', icon: 'Send', sortOrder: 5 },
];

const sampleEducation = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'Anna University / Affiliated Engineering College',
    department: 'Department of Information Technology',
    startYear: '2022',
    endYear: '2026',
    description: 'Pursuing undergraduate studies with strong emphasis on Data Structures, Web Technologies, Database Systems, Software Engineering, and Object-Oriented Programming.',
  },
];

const sampleCertifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Online Learning Platform / Technical Certification',
    completionDate: '2024',
    credentialUrl: '',
  },
  {
    title: 'Python for Data Science & Foundations',
    issuer: 'Technical Learning Portal',
    completionDate: '2023',
    credentialUrl: '',
  },
  {
    title: 'Data Structures and Algorithms in Java',
    issuer: 'Academic & Online Platform',
    completionDate: '2023',
    credentialUrl: '',
  },
];

const seedData = async () => {
  console.log('Connecting to database for seeding...');
  const connected = await connectDatabase();
  if (!connected) {
    console.error('Database connection failed. Seeding aborted.');
    process.exit(1);
  }

  try {
    console.log('Seeding projects...');
    for (const proj of sampleProjects) {
      await Project.findOneAndUpdate({ slug: proj.slug }, proj, { upsert: true, new: true });
    }

    console.log('Seeding skills...');
    for (const skill of sampleSkills) {
      await Skill.findOneAndUpdate({ name: skill.name }, skill, { upsert: true, new: true });
    }

    console.log('Seeding education...');
    for (const edu of sampleEducation) {
      await Education.findOneAndUpdate({ degree: edu.degree }, edu, { upsert: true, new: true });
    }

    console.log('Seeding certifications...');
    for (const cert of sampleCertifications) {
      await Certification.findOneAndUpdate({ title: cert.title }, cert, { upsert: true, new: true });
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
