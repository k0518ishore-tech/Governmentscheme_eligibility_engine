// ============================================================
// SchemeGuide Backend — Scheme Routes
// ============================================================

import { Router } from 'express';
import {
  getSchemes,
  searchSchemes,
  getSchemeById,
  getSchemesByCategory,
  getSchemesByState,
  createScheme,
  updateScheme,
  deleteScheme,
} from '../controllers/schemeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import validate from '../middleware/validationMiddleware.js';
import { createSchemeValidator, updateSchemeValidator } from '../validators/schemeValidator.js';

const router = Router();

// Public routes
router.get('/', getSchemes);
router.get('/search', searchSchemes);
router.get('/category/:category', getSchemesByCategory);
router.get('/state/:state', getSchemesByState);
router.get('/:id', getSchemeById);

// Admin routes
router.post('/', protect, adminOnly, ...createSchemeValidator, validate, createScheme);
router.put('/:id', protect, adminOnly, ...updateSchemeValidator, validate, updateScheme);
router.delete('/:id', protect, adminOnly, deleteScheme);

export default router;
