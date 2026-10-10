import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact submissions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many contact messages submitted from this IP. Please try again after 15 minutes.',
  },
});
