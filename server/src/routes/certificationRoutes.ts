import { Router } from 'express';
import { getCertifications, createCertification } from '../controllers/certificationController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getCertifications);
router.post('/', requireAdmin, createCertification);

export default router;
