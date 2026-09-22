// ============================================================
// SchemeGuide Backend — User Validators
// ============================================================

import { body } from 'express-validator';

export const updateProfileValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim(),
  body('profile.age').optional().isInt({ min: 0, max: 120 }).withMessage('Age must be between 0 and 120'),
  body('profile.gender').optional().isIn(['Male', 'Female', 'Other', 'Prefer not to say', '']),
  body('profile.annualIncome').optional().isInt({ min: 0 }).withMessage('Income must be a positive number'),
  body('profile.state').optional().trim(),
  body('profile.district').optional().trim(),
  body('profile.disabilityStatus').optional().isBoolean(),
];
