// ============================================================
// SchemeGuide Backend — Application Controller
// ============================================================

import Application from '../models/Application.js';
import Scheme from '../models/Scheme.js';
import { successResponse, errorResponse } from '../utils/response.js';

// POST /api/applications
export const createApplication = async (req, res, next) => {
  try {
    const { schemeId, notes } = req.body;

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return errorResponse(res, 'Scheme not found', 404, 'SCHEME_NOT_FOUND');
    }

    // Check if already applied
    const existing = await Application.findOne({
      userId: req.user._id,
      schemeId,
    });
    if (existing) {
      return errorResponse(res, 'You have already applied for this scheme', 409, 'DUPLICATE_APPLICATION');
    }

    const application = await Application.create({
      userId: req.user._id,
      schemeId,
      schemeName: scheme.name,
      category: scheme.category,
      notes,
    });

    successResponse(res, { application }, 'Application submitted successfully', 201);
  } catch (error) {
    next(error);
  }
};

// GET /api/applications
export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('schemeId', 'name category benefit');
    successResponse(res, { applications });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications/:id
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate('schemeId');

    if (!application) {
      return errorResponse(res, 'Application not found', 404, 'NOT_FOUND');
    }

    successResponse(res, { application });
  } catch (error) {
    next(error);
  }
};

// PUT /api/applications/:id
export const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { notes: req.body.notes },
      { new: true }
    );

    if (!application) {
      return errorResponse(res, 'Application not found', 404, 'NOT_FOUND');
    }

    successResponse(res, { application }, 'Application updated');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/applications/:id
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!application) {
      return errorResponse(res, 'Application not found', 404, 'NOT_FOUND');
    }

    successResponse(res, {}, 'Application deleted');
  } catch (error) {
    next(error);
  }
};
