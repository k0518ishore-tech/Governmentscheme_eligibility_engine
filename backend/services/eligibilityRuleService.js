// ============================================================
// SchemeGuide Backend — Eligibility Rule Service
// ============================================================

import EligibilityRule from '../models/EligibilityRule.js';

export const getRulesBySchemeId = async (schemeId) => {
  return EligibilityRule.find({ schemeId }).populate('schemeId', 'name category');
};

export const getRuleById = async (id) => {
  const rule = await EligibilityRule.findById(id).populate('schemeId', 'name category');
  if (!rule) {
    const error = new Error('Eligibility rule not found');
    error.statusCode = 404;
    throw error;
  }
  return rule;
};

export const createRule = async (data) => {
  return EligibilityRule.create(data);
};

export const updateRule = async (id, data) => {
  const rule = await EligibilityRule.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!rule) {
    const error = new Error('Eligibility rule not found');
    error.statusCode = 404;
    throw error;
  }
  return rule;
};

export const deleteRule = async (id) => {
  const rule = await EligibilityRule.findByIdAndDelete(id);
  if (!rule) {
    const error = new Error('Eligibility rule not found');
    error.statusCode = 404;
    throw error;
  }
  return rule;
};
