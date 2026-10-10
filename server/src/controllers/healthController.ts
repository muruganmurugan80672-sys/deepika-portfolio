import { Request, Response } from 'express';
import { getDBState } from '../config/database';

export const getHealthStatus = (req: Request, res: Response) => {
  const dbStatus = getDBState();
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
};
