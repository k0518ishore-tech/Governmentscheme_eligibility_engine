// ============================================================
// SchemeGuide Backend — Auth Validators
// ============================================================

import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];
