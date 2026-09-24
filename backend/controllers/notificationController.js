// ============================================================
// SchemeGuide Backend — Notification Controller
// ============================================================

import * as notificationService from '../services/notificationService.js';
import { successResponse } from '../utils/response.js';

// GET /api/notifications
export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user._id);
    const unreadCount = await notificationService.getUnreadCount(req.user._id);
    successResponse(res, { notifications, unreadCount });
  } catch (error) {
    next(error);
  }
};

// GET /api/notifications/:id
export const getNotificationById = async (req, res, next) => {
  try {
    const notification = await notificationService.getNotificationById(req.params.id, req.user._id);
    successResponse(res, { notification });
  } catch (error) {
    next(error);
  }
};

// PUT /api/notifications/:id/read
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user._id);
    successResponse(res, { notification }, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/notifications/:id
export const deleteNotification = async (req, res, next) => {
  try {
    await notificationService.deleteNotification(req.params.id, req.user._id);
    successResponse(res, {}, 'Notification deleted');
  } catch (error) {
    next(error);
  }
};
