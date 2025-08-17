import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { taskCreateRules, taskUpdateRules, taskListRules } from '../validations/taskValidation.js';
import { createTask, updateTask, deleteTask, listTasks, getTask } from '../controllers/taskController.js';

const router = Router({ mergeParams: true });

router.use(auth);
router.get('/', taskListRules, validate, listTasks);
router.post('/create', taskCreateRules, validate, createTask);
router.get('/:taskId', getTask);
router.put('/:taskId', taskUpdateRules, validate, updateTask);
router.delete('/:taskId', deleteTask);

export default router;
