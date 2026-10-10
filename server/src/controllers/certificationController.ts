import { Request, Response } from 'express';
import { Certification } from '../models/Certification';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: certs.length,
      data: certs,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const { title, issuer, completionDate, credentialUrl } = req.body;

    if (!title || !issuer || !completionDate) {
      return res.status(400).json({ success: false, error: 'Title, issuer, and completion date are required' });
    }

    const cert = await Certification.create({
      title,
      issuer,
      completionDate,
      credentialUrl: credentialUrl || '',
    });

    return res.status(201).json({ success: true, message: 'Certification created successfully', data: cert });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
