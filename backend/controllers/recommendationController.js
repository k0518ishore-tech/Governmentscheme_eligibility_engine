// ============================================================
// SchemeGuide Backend — Recommendation Controller
// ============================================================

import * as recommendationService from '../services/recommendationService.js';
import { successResponse } from '../utils/response.js';

// GET /api/recommendations
export const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await recommendationService.getUserRecommendations(req.user._id);
    successResponse(res, { recommendations });
  } catch (error) {
    next(error);
  }
};

// GET /api/recommendations/generate
export const generateRecommendations = async (req, res, next) => {
  try {
    const recommendations = await recommendationService.generateRecommendations(req.user._id);
    successResponse(res, { recommendations }, 'Recommendations generated successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/recommendations/:id
export const getRecommendationById = async (req, res, next) => {
  try {
    const recommendation = await recommendationService.getRecommendationById(req.params.id, req.user._id);
    successResponse(res, { recommendation });
  } catch (error) {
    next(error);
  }
};
