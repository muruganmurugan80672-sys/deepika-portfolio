import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'] || req.headers['authorization']?.replace('Bearer ', '');
  const expectedKey = process.env.ADMIN_API_KEY || 'deepika_admin_secret_key_2026_x89a';

  if (!adminKey || adminKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator API key.',
    });
  }

  return next();
};
