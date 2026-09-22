// ============================================================
// SchemeGuide Backend — User Controller
// ============================================================

import * as userService from '../services/userService.js';
import { successResponse, errorResponse } from '../utils/response.js';

// GET /api/users/me
export const getProfile = async (req, res, next) => {
  try {
    successResponse(res, { user: req.user });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/me
export const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserProfile(req.user._id, req.body);
    successResponse(res, { user }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me/results
export const getEligibilityResults = async (req, res, next) => {
  try {
    const results = await userService.getUserEligibilityResults(req.user._id);
    successResponse(res, { results });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me/applications
export const getApplications = async (req, res, next) => {
  try {
    const applications = await userService.getUserApplications(req.user._id);
    successResponse(res, { applications });
  } catch (error) {
    next(error);
  }
};

// POST /api/users/me/saved/:schemeId
export const saveScheme = async (req, res, next) => {
  try {
    await userService.addSavedScheme(req.user._id, req.params.schemeId);
    successResponse(res, {}, 'Scheme saved');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/me/saved/:schemeId
export const unsaveScheme = async (req, res, next) => {
  try {
    await userService.removeSavedScheme(req.user._id, req.params.schemeId);
    successResponse(res, {}, 'Scheme removed from saved');
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me/saved
export const getSavedSchemes = async (req, res, next) => {
  try {
    const schemes = await userService.getSavedSchemes(req.user._id);
    successResponse(res, { schemes });
  } catch (error) {
    next(error);
  }
};
