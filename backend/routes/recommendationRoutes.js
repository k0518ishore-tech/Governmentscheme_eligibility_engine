// ============================================================
// SchemeGuide Backend — Recommendation Routes
// ============================================================

import { Router } from 'express';
import {
  getRecommendations,
  generateRecommendations,
  getRecommendationById,
} from '../controllers/recommendationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// All recommendation routes require authentication
router.use(protect);

router.get('/', getRecommendations);
router.get('/generate', generateRecommendations);
router.get('/:id', getRecommendationById);

export default router;
