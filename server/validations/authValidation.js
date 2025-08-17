import { body } from 'express-validator';

export const registerRules = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password >= 6 chars'),
  body('name').optional().isString().trim()
];

export const loginRules = [
  body('email').isEmail(),
  body('password').isString()
];
