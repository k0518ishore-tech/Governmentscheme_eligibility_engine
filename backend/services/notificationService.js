// ============================================================
// SchemeGuide Backend — Notification Service
// ============================================================

import Notification from '../models/Notification.js';

export const createNotification = async (data) => {
  return Notification.create({
    userId: data.userId,
    schemeId: data.schemeId || null,
    message: data.message,
    sendDate: data.sendDate || new Date(),
    sendTime: data.sendTime || new Date().toTimeString().slice(0, 5),
    priority: data.priority || 'medium',
    readStatus: false,
  });
};

export const getUserNotifications = async (userId) => {
  return Notification.find({ userId })
    .sort({ sendDate: -1, createdAt: -1 })
    .populate('schemeId', 'name category');
};

export const getNotificationById = async (id, userId) => {
  const notification = await Notification.findOne({ _id: id, userId })
    .populate('schemeId', 'name category');
  if (!notification) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }
  return notification;
};

export const markAsRead = async (id, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: id, userId },
    { readStatus: true },
    { new: true }
  );
  if (!notification) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }
  return notification;
};

export const deleteNotification = async (id, userId) => {
  const notification = await Notification.findOneAndDelete({ _id: id, userId });
  if (!notification) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }
  return notification;
};

export const getUnreadCount = async (userId) => {
  return Notification.countDocuments({ userId, readStatus: false });
};
