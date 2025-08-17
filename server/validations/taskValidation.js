import { body, query } from 'express-validator';

export const taskCreateRules = [
  body('title').isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']),
  body('dueDate').optional().isISO8601().toDate()
];

export const taskUpdateRules = [
  body('title').optional().isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']),
  body('dueDate').optional().isISO8601().toDate()
];

export const taskListRules = [
  query('status').optional().isIn(['todo', 'in-progress', 'done']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
];
