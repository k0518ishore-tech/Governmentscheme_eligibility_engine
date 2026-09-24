// ============================================================
// SchemeGuide Backend — Search History Controller
// ============================================================

import * as searchHistoryService from '../services/searchHistoryService.js';
import { successResponse } from '../utils/response.js';

// POST /api/search-history
export const recordSearch = async (req, res, next) => {
  try {
    const entry = await searchHistoryService.recordSearch(req.user._id, req.body);
    successResponse(res, { entry }, 'Search recorded', 201);
  } catch (error) {
    next(error);
  }
};

// GET /api/search-history
export const getSearchHistory = async (req, res, next) => {
  try {
    const history = await searchHistoryService.getUserSearchHistory(req.user._id);
    successResponse(res, { history });
  } catch (error) {
    next(error);
  }
};

// GET /api/search-history/:id
export const getSearchById = async (req, res, next) => {
  try {
    const entry = await searchHistoryService.getSearchById(req.params.id, req.user._id);
    successResponse(res, { entry });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/search-history/:id
export const deleteSearchEntry = async (req, res, next) => {
  try {
    await searchHistoryService.deleteSearchEntry(req.params.id, req.user._id);
    successResponse(res, {}, 'Search history entry deleted');
  } catch (error) {
    next(error);
  }
};
