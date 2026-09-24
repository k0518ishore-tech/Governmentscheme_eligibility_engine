// ============================================================
// SchemeGuide Backend — Eligibility Rule Controller
// ============================================================

import * as ruleService from '../services/eligibilityRuleService.js';
import AuditLog from '../models/AuditLog.js';
import { successResponse } from '../utils/response.js';

// GET /api/eligibility-rules/:schemeId
export const getRulesByScheme = async (req, res, next) => {
  try {
    const rules = await ruleService.getRulesBySchemeId(req.params.schemeId);
    successResponse(res, { rules });
  } catch (error) {
    next(error);
  }
};

// GET /api/eligibility-rules/rule/:id
export const getRuleById = async (req, res, next) => {
  try {
    const rule = await ruleService.getRuleById(req.params.id);
    successResponse(res, { rule });
  } catch (error) {
    next(error);
  }
};

// POST /api/eligibility-rules (admin)
export const createRule = async (req, res, next) => {
  try {
    const rule = await ruleService.createRule(req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'ELIGIBILITY_RULE_CREATED',
      resource: 'EligibilityRule',
      resourceId: rule._id,
      details: { schemeId: rule.schemeId, ruleType: rule.ruleType },
    });

    successResponse(res, { rule }, 'Eligibility rule created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/eligibility-rules/:id (admin)
export const updateRule = async (req, res, next) => {
  try {
    const rule = await ruleService.updateRule(req.params.id, req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'ELIGIBILITY_RULE_UPDATED',
      resource: 'EligibilityRule',
      resourceId: rule._id,
      details: { schemeId: rule.schemeId, ruleType: rule.ruleType },
    });

    successResponse(res, { rule }, 'Eligibility rule updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/eligibility-rules/:id (admin)
export const deleteRule = async (req, res, next) => {
  try {
    const rule = await ruleService.deleteRule(req.params.id);

    await AuditLog.create({
      userId: req.user._id,
      action: 'ELIGIBILITY_RULE_DELETED',
      resource: 'EligibilityRule',
      resourceId: rule._id,
      details: { schemeId: rule.schemeId },
    });

    successResponse(res, {}, 'Eligibility rule deleted successfully');
  } catch (error) {
    next(error);
  }
};
