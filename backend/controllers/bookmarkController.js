// ============================================================
// SchemeGuide Backend — Bookmark Controller
// ============================================================

import * as bookmarkService from '../services/bookmarkService.js';
import { successResponse } from '../utils/response.js';

// POST /api/bookmarks
export const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await bookmarkService.createBookmark(
      req.user._id,
      req.body.schemeId,
      req.body
    );
    successResponse(res, { bookmark }, 'Scheme bookmarked successfully', 201);
  } catch (error) {
    next(error);
  }
};

// GET /api/bookmarks
export const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await bookmarkService.getUserBookmarks(req.user._id);
    successResponse(res, { bookmarks });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookmarks/:id
export const getBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await bookmarkService.getBookmarkById(req.params.id, req.user._id);
    successResponse(res, { bookmark });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/bookmarks/:id
export const deleteBookmark = async (req, res, next) => {
  try {
    await bookmarkService.deleteBookmark(req.params.id, req.user._id);
    successResponse(res, {}, 'Bookmark removed');
  } catch (error) {
    next(error);
  }
};
