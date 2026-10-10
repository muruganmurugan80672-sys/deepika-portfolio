import { Request, Response } from 'express';
import { Project } from '../models/Project';
import mongoose from 'mongoose';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const filter: any = { published: true };

    if (category && typeof category === 'string') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid Project ID format' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, slug, description, longDescription, technologies, category, imageUrl, githubUrl, liveDemoUrl, featured, published } = req.body;

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingProject = await Project.findOne({ slug: generatedSlug });
    if (existingProject) {
      return res.status(400).json({ success: false, error: 'Project with this title/slug already exists' });
    }

    const project = await Project.create({
      title,
      slug: generatedSlug,
      description,
      longDescription,
      technologies: Array.isArray(technologies) ? technologies : [],
      category,
      imageUrl: imageUrl || '',
      githubUrl: githubUrl || '',
      liveDemoUrl: liveDemoUrl || '',
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
    });

    return res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid Project ID format' });
    }

    const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    return res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid Project ID format' });
    }

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
