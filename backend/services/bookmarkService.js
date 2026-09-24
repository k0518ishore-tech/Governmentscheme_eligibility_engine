// ============================================================
// SchemeGuide Backend — Bookmark Service
// ============================================================

import Bookmark from '../models/Bookmark.js';
import User from '../models/User.js';

export const createBookmark = async (userId, schemeId, data = {}) => {
  // Check for existing bookmark
  const existing = await Bookmark.findOne({ userId, schemeId });
  if (existing) {
    const error = new Error('Scheme already bookmarked');
    error.statusCode = 409;
    error.code = 'DUPLICATE_BOOKMARK';
    throw error;
  }

  const bookmark = await Bookmark.create({
    userId,
    schemeId,
    bookmarkDate: new Date(),
    lastRenewedDate: data.lastRenewedDate || null,
    reminderDate: data.reminderDate || null,
  });

  // Sync with User.savedSchemes
  await User.findByIdAndUpdate(userId, { $addToSet: { savedSchemes: schemeId } });

  return bookmark;
};

export const getUserBookmarks = async (userId) => {
  // Sync any legacy savedSchemes from User document to Bookmark collection first
  const user = await User.findById(userId);
  if (user && user.savedSchemes && user.savedSchemes.length > 0) {
    for (const sId of user.savedSchemes) {
      const exists = await Bookmark.findOne({ userId, schemeId: sId });
      if (!exists) {
        await Bookmark.create({ userId, schemeId: sId, bookmarkDate: new Date() });
      }
    }
  }

  return Bookmark.find({ userId })
    .sort({ bookmarkDate: -1 })
    .populate('schemeId', 'name shortDescription category benefit status department');
};

export const getBookmarkById = async (id, userId) => {
  const bookmark = await Bookmark.findOne({ _id: id, userId })
    .populate('schemeId');
  if (!bookmark) {
    const error = new Error('Bookmark not found');
    error.statusCode = 404;
    throw error;
  }
  return bookmark;
};

export const deleteBookmark = async (id, userId) => {
  const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId });
  if (!bookmark) {
    const error = new Error('Bookmark not found');
    error.statusCode = 404;
    throw error;
  }

  // Sync with User.savedSchemes
  await User.findByIdAndUpdate(userId, { $pull: { savedSchemes: bookmark.schemeId } });

  return bookmark;
};
