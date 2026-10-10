import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    longDescription: { type: String, trim: true, default: '' },
    technologies: [{ type: String, trim: true }],
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    liveDemoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Project = model<IProject>('Project', projectSchema);
