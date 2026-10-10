import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateProject = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),

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
