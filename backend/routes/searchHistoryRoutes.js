// ============================================================
// SchemeGuide Backend — Search History Routes
// ============================================================

import { Router } from 'express';
import {
  recordSearch,
  getSearchHistory,
  getSearchById,
  deleteSearchEntry,
} from '../controllers/searchHistoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// All search history routes require authentication
router.use(protect);

router.post('/', recordSearch);
router.get('/', getSearchHistory);
router.get('/:id', getSearchById);
router.delete('/:id', deleteSearchEntry);

export default router;
