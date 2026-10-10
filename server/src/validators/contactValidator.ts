import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 150 })
    .withMessage('Subject must not exceed 150 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long')
    .isLength({ max: 2000 })
    .withMessage('Message must not exceed 2000 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array().map((err) => ({ field: (err as any).path, message: err.msg })),
      });
    }
    next();
  },
];
