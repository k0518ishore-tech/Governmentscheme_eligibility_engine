// ============================================================
// SchemeGuide Backend — Notification Routes
// ============================================================

import { Router } from 'express';
import {
  getNotifications,
  getNotificationById,
  markAsRead,
  deleteNotification,
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// All notification routes require authentication
router.use(protect);

router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
