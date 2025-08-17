import { body, query } from 'express-validator';

export const projectCreateRules = [
  body('title').isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['active', 'completed'])
];

export const projectUpdateRules = [
  body('title').optional().isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['active', 'completed'])
];

export const projectListRules = [
  query('q').optional().isString(),
  query('status').optional().isIn(['active', 'completed']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
];
