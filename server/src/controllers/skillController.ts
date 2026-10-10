import { Request, Response } from 'express';
import { Skill } from '../models/Skill';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ category: 1, sortOrder: 1, name: 1 });
    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, category, icon, sortOrder } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, error: 'Skill name and category are required' });
    }

    const skill = await Skill.create({
      name,
      category,
      icon: icon || 'Code',
      sortOrder: sortOrder || 0,
    });

    return res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
