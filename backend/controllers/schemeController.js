// ============================================================
// SchemeGuide Backend — Scheme Controller
// ============================================================

import * as schemeService from '../services/schemeService.js';
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
    successResponse(res, { scheme }, 'Scheme created successfully', 201);
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
