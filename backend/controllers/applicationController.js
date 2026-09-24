// ============================================================
// SchemeGuide Backend — Application Controller
// ============================================================

import Application from '../models/Application.js';
import Scheme from '../models/Scheme.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/response.js';

// POST /api/applications
export const createApplication = async (req, res, next) => {
  try {
    const { schemeId, notes } = req.body;
    const submittedDetails = req.body.applicantDetails && typeof req.body.applicantDetails === 'object' && !Array.isArray(req.body.applicantDetails)
      ? req.body.applicantDetails : {};

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return errorResponse(res, 'Scheme not found', 404, 'SCHEME_NOT_FOUND');
    }

    const fieldForRule = {
      age: 'age', gender: 'gender', categories: 'category', occupations: 'occupation',
      education: 'education', maritalStatus: 'maritalStatus', ruralUrban: 'ruralUrban',
      states: 'state', districts: 'district', minAnnualIncome: 'annualIncome', maxAnnualIncome: 'annualIncome',
      disabilityRequired: 'disabilityStatus', minorityRequired: 'minorityStatus',
    };
    const rules = scheme.eligibilityRules?.toObject?.() || scheme.eligibilityRules || {};
    const requiredFields = new Set(['phone']);
    for (const [ruleKey, field] of Object.entries(fieldForRule)) {
      const configured = ruleKey === 'age'
        ? rules.age?.min != null || rules.age?.max != null
        : ruleKey === 'minAnnualIncome' || ruleKey === 'maxAnnualIncome'
          ? rules[ruleKey] != null || rules[ruleKey === 'minAnnualIncome' ? 'maxAnnualIncome' : 'minAnnualIncome'] != null
          : ruleKey === 'disabilityRequired' || ruleKey === 'minorityRequired'
            ? rules[ruleKey] === true
            : Array.isArray(rules[ruleKey]) && rules[ruleKey].length > 0;
      if (configured) requiredFields.add(field);
    }
    const allowedFields = new Set(['phone', 'age', 'gender', 'state', 'district', 'category', 'occupation', 'annualIncome', 'education', 'maritalStatus', 'disabilityStatus', 'minorityStatus', 'ruralUrban']);
    const applicantDetails = Object.fromEntries(Object.entries(submittedDetails)
      .filter(([key, value]) => allowedFields.has(key) && value !== undefined && value !== null && String(value).trim() !== '')
      .map(([key, value]) => [key, ['disabilityStatus', 'minorityStatus'].includes(key) ? value === true || value === 'true' : value]));
    const missingFields = [...requiredFields].filter(field => applicantDetails[field] === undefined || applicantDetails[field] === '');
    if (missingFields.length) {
      return errorResponse(res, `Please provide the required application information: ${missingFields.join(', ')}`, 400, 'APPLICATION_DETAILS_REQUIRED');
    }
    const phoneDigits = String(applicantDetails.phone).replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return errorResponse(res, 'Enter a valid phone number so the admin team can contact you', 400, 'INVALID_PHONE');
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
      applicantDetails,
    });

    let notificationWarning;
    try {
      const admins = await User.find({ role: 'admin' }).select('_id');
      if (admins.length) {
        await Notification.insertMany(admins.map(admin => ({
          userId: admin._id,
          schemeId: scheme._id,
          title: 'New scheme application',
          type: 'application_update',
          message: `${req.user.name} submitted an application for ${scheme.name}.`,
          priority: 'high',
        })));
      } else notificationWarning = 'Application was saved, but no admin account is configured to receive notifications.';
    } catch {
      notificationWarning = 'Application was saved, but the admin notification could not be created.';
    }

    successResponse(res, { application, notificationWarning }, 'Application submitted successfully', 201);
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
