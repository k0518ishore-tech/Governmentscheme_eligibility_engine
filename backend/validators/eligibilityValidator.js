// ============================================================
// SchemeGuide Backend — Eligibility Validators
// ============================================================

import { body } from 'express-validator';

export const eligibilityCheckValidator = [
  body('age').optional().isInt({ min: 0, max: 120 }).withMessage('Age must be between 0 and 120'),
  body('gender').optional().isIn(['Male', 'Female', 'Other', '']),
  body('annualIncome').optional().isInt({ min: 0 }).withMessage('Income must be positive'),
  body('state').optional().trim(),
  body('occupation').optional().trim(),
  body('education').optional().trim(),
  body('category').optional().trim(),
  body('disabilityStatus').optional().isBoolean(),
];
