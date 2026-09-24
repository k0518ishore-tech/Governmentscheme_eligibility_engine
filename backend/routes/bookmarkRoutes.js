// ============================================================
// SchemeGuide Backend — Bookmark Routes
// ============================================================

import { Router } from 'express';
import {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  deleteBookmark,
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// All bookmark routes require authentication
router.use(protect);

router.post('/', createBookmark);
router.get('/', getBookmarks);
router.get('/:id', getBookmarkById);
router.delete('/:id', deleteBookmark);

export default router;
