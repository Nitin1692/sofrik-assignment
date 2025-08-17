import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { projectCreateRules, projectUpdateRules, projectListRules } from '../validations/projectValidation.js';
import { createProject, updateProject, deleteProject, getProject, listProjects } from '../controllers/projectController.js';

const router = Router();

router.use(auth);
router.get('/', projectListRules, validate, listProjects);
router.post('/create', projectCreateRules, validate, createProject);
router.get('/:id', getProject);
router.put('/:id', projectUpdateRules, validate, updateProject);
router.delete('/:id', deleteProject);

export default router;
