// ============================================================
// SchemeGuide Backend — User Routes
// ============================================================

import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getEligibilityResults,
  getApplications,
  saveScheme,
  unsaveScheme,
  getSavedSchemes,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validationMiddleware.js';
import { updateProfileValidator } from '../validators/userValidator.js';

const router = Router();

// All routes require authentication
router.use(protect);

router.get('/me', getProfile);
router.put('/me', ...updateProfileValidator, validate, updateProfile);
router.get('/me/results', getEligibilityResults);
router.get('/me/applications', getApplications);
router.get('/me/saved', getSavedSchemes);
router.post('/me/saved/:schemeId', saveScheme);
router.delete('/me/saved/:schemeId', unsaveScheme);

export default router;
