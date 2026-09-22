// ============================================================
// SchemeGuide Backend — Scheme Validators
// ============================================================

import { body } from 'express-validator';

export const createSchemeValidator = [
  body('name').trim().notEmpty().withMessage('Scheme name is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('status').optional().isIn(['active', 'inactive']),
];

export const updateSchemeValidator = [
  body('name').optional().trim().notEmpty().withMessage('Scheme name cannot be empty'),
  body('shortDescription').optional().trim(),
  body('category').optional().trim(),
  body('department').optional().trim(),
  body('status').optional().isIn(['active', 'inactive']),
];
