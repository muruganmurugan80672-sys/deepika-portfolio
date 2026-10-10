import { Request, Response } from 'express';
import { Education } from '../models/Education';

export const getEducation = async (req: Request, res: Response) => {
  try {
    const educationList = await Education.find().sort({ startYear: -1 });
    return res.status(200).json({
      success: true,
      count: educationList.length,
      data: educationList,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const { degree, institution, department, startYear, endYear, description } = req.body;

    if (!degree || !institution || !department || !startYear || !endYear) {
      return res.status(400).json({ success: false, error: 'All primary education fields are required' });
    }

    const edu = await Education.create({
      degree,
      institution,
      department,
      startYear,
      endYear,
      description: description || '',
    });

    return res.status(201).json({ success: true, message: 'Education entry created successfully', data: edu });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
