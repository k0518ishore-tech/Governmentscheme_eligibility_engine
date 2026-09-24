// ============================================================
// SchemeGuide Backend — Eligibility Rule Routes
// ============================================================

import { Router } from 'express';
import {
  getRulesByScheme,
  getRuleById,
  createRule,
  updateRule,
  deleteRule,
} from '../controllers/eligibilityRuleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

// Public: view rules for a scheme
router.get('/:schemeId', getRulesByScheme);

// Public: view a single rule
router.get('/rule/:id', getRuleById);

// Admin: CRUD
router.post('/', protect, adminOnly, createRule);
router.put('/:id', protect, adminOnly, updateRule);
router.delete('/:id', protect, adminOnly, deleteRule);

export default router;
