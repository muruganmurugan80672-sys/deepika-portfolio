import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';

export const submitContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully.',
      data: {
        id: newMessage._id,
        name: newMessage.name,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'Failed to submit contact message: ' + error.message,
    });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
