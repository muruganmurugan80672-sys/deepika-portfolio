import { Router } from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contactController';
import { validateContact } from '../validators/contactValidator';
import { contactRateLimiter } from '../middleware/rateLimiter';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', contactRateLimiter, validateContact, submitContactMessage);
router.get('/', requireAdmin, getContactMessages);

export default router;
