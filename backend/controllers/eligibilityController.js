// ============================================================
// SchemeGuide Backend — Eligibility Controller
// ============================================================

import { checkEligibility } from '../services/eligibilityEngine.js';
import { successResponse } from '../utils/response.js';

// POST /api/eligibility/check
export const checkUserEligibility = async (req, res, next) => {
  try {
    const userProfile = {
      age: req.body.age,
      gender: req.body.gender,
      state: req.body.state,
      district: req.body.district,
      category: req.body.category || req.body.community,
      occupation: req.body.occupation,
      annualIncome: req.body.annualIncome || req.body.income,
      education: req.body.education,
      maritalStatus: req.body.maritalStatus,
      disabilityStatus: req.body.disabilityStatus || req.body.disability,
      minorityStatus: req.body.minorityStatus,
      ruralUrban: req.body.ruralUrban || req.body.area,
    };

    // Use authenticated user's ID if available
    const userId = req.user?._id || null;

    const result = await checkEligibility(userProfile, userId);
    successResponse(res, result, 'Eligibility check completed');
  } catch (error) {
    next(error);
  }
};
