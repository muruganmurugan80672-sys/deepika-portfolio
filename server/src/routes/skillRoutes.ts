import { Router } from 'express';
import { getSkills, createSkill } from '../controllers/skillController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getSkills);
router.post('/', requireAdmin, createSkill);

export default router;
