import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { requireAdmin } from '../middleware/auth';
import { validateProject } from '../validators/projectValidator';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', requireAdmin, validateProject, createProject);
router.put('/:id', requireAdmin, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
