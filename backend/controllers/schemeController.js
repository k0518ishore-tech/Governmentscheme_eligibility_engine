// ============================================================
// SchemeGuide Backend — Scheme Controller
// ============================================================

import * as schemeService from '../services/schemeService.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { successResponse } from '../utils/response.js';

// GET /api/schemes
export const getSchemes = async (req, res, next) => {
  try {
    const result = await schemeService.getAllSchemes(req.query);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// GET /api/schemes/search  (alias for GET /api/schemes with query params)
export const searchSchemes = async (req, res, next) => {
  try {
    const result = await schemeService.getAllSchemes(req.query);
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// GET /api/schemes/category/:category
export const getSchemesByCategory = async (req, res, next) => {
  try {
    const schemes = await schemeService.getSchemesByCategory(req.params.category);
    successResponse(res, { schemes });
  } catch (error) {
    next(error);
  }
};

// GET /api/schemes/state/:state
export const getSchemesByState = async (req, res, next) => {
  try {
    const schemes = await schemeService.getSchemesByState(req.params.state);
    successResponse(res, { schemes });
  } catch (error) {
    next(error);
  }
};

// GET /api/schemes/:id
export const getSchemeById = async (req, res, next) => {
  try {
    const scheme = await schemeService.getSchemeById(req.params.id);
    successResponse(res, { scheme });
  } catch (error) {
    next(error);
  }
};

// POST /api/schemes (admin)
export const createScheme = async (req, res, next) => {
  try {
    const scheme = await schemeService.createScheme(req.body);
    let notificationsSent = 0;
    let notificationWarning;

    if (scheme.status === 'active') {
      try {
        const users = await User.find({ role: 'user' }).select('_id').lean();
        if (users.length) {
          const notifications = users.map(({ _id }) => ({
            userId: _id,
            schemeId: scheme._id,
            title: 'New Scheme Available',
            type: 'new_scheme',
            message: `${scheme.name} is now available. View the scheme to learn more.`,
            priority: 'medium',
          }));
          const inserted = await Notification.insertMany(notifications, { ordered: false });
          notificationsSent = inserted.length;
        }
      } catch (error) {
        notificationWarning = 'The scheme was saved, but user notifications could not all be created.';
        console.error('[Notifications] Failed to notify users about new scheme:', error.message);
      }
    }

    successResponse(res, { scheme, notificationsSent, notificationWarning }, 'Scheme created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/schemes/:id (admin)
export const updateScheme = async (req, res, next) => {
  try {
    const scheme = await schemeService.updateScheme(req.params.id, req.body);
    successResponse(res, { scheme }, 'Scheme updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/schemes/:id (admin)
export const deleteScheme = async (req, res, next) => {
  try {
    await schemeService.deleteScheme(req.params.id);
    successResponse(res, {}, 'Scheme deleted successfully');
  } catch (error) {
    next(error);
  }
};
