import { Router } from 'express';
import { getEducation, createEducation } from '../controllers/educationController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getEducation);
router.post('/', requireAdmin, createEducation);

export default router;
