// ============================================================
// SchemeGuide Backend — Eligibility Routes
// ============================================================

import { Router } from 'express';
import { checkUserEligibility } from '../controllers/eligibilityController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validationMiddleware.js';
import { eligibilityCheckValidator } from '../validators/eligibilityValidator.js';
import { eligibilityLimiter } from '../middleware/rateLimitMiddleware.js';

const router = Router();

// Eligibility check — optionally authenticated (saves results if logged in)
router.post('/check', eligibilityLimiter, (req, res, next) => {
  // Optional auth — don't fail if no token
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, ...eligibilityCheckValidator, validate, checkUserEligibility);

export default router;
