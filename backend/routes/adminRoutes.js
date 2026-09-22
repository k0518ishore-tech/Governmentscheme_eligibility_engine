// ============================================================
// SchemeGuide Backend — Admin Routes
// ============================================================

import { Router } from 'express';
import {
  getDashboard,
  getUsers,
  getSchemes,
  updateSchemeRules,
  getApplications,
  updateApplicationStatus,
  getEligibilityStatistics,
} from '../controllers/adminController.js';
import { createScheme, updateScheme, deleteScheme } from '../controllers/schemeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/schemes', getSchemes);
router.post('/schemes', createScheme);
router.put('/schemes/:id', updateScheme);
router.delete('/schemes/:id', deleteScheme);
router.put('/schemes/:id/rules', updateSchemeRules);
router.get('/applications', getApplications);
router.put('/applications/:id', updateApplicationStatus);
router.get('/eligibility-statistics', getEligibilityStatistics);

export default router;
