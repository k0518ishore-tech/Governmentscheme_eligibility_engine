// ============================================================
// SchemeGuide Backend — Eligibility Engine
// ============================================================
// This is the CORE of the backend.
// It evaluates a user's profile against scheme rules stored in MongoDB.
// Returns explainable results matching the frontend's expected format.
//
// UPDATED: Now checks the EligibilityRule collection first.
// Falls back to embedded scheme.eligibilityRules if no dedicated rules.
// ============================================================

import Scheme from '../models/Scheme.js';
import EligibilityResult from '../models/EligibilityResult.js';
import EligibilityRule from '../models/EligibilityRule.js';

/**
 * Format currency for display in messages
 */
const formatCurrency = (num) => '₹' + Number(num).toLocaleString('en-IN');

/**
 * Evaluate a single condition.
 * Returns { condition, userValue, requiredValue, status, message }
 */
function evaluateCondition(conditionName, userValue, rule, scheme) {
  // If rule is not defined for this scheme, skip it
  if (rule === undefined || rule === null) return null;

  switch (conditionName) {
    case 'age': {
      if (!rule.min && !rule.max) return null;
      if (userValue === undefined || userValue === null || userValue === '') {
        return {
          condition: 'Age',
          userValue: 'Not provided',
          requiredValue: `${rule.min || 0}–${rule.max || 120} years`,
          status: 'insufficient_info',
          message: 'Age information is required to check this condition.',
        };
      }
      const passed = userValue >= (rule.min || 0) && userValue <= (rule.max || 120);
      return {
        condition: 'Age',
        userValue: `${userValue} years`,
        requiredValue: `${rule.min || 0}–${rule.max || 120} years`,
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your age meets the requirement.'
          : `The scheme requires applicants to be between ${rule.min || 0} and ${rule.max || 120} years.`,
      };
    }

    case 'gender': {
      if (!rule || rule.length === 0 || rule.includes('All') || rule.includes('Male') && rule.includes('Female') && rule.includes('Other')) return null;
      if (!userValue) {
        return {
          condition: 'Gender',
          userValue: 'Not provided',
          requiredValue: rule.join(' / '),
          status: 'insufficient_info',
          message: 'Gender information is required.',
        };
      }
      const passed = rule.includes(userValue);
      return {
        condition: 'Gender',
        userValue,
        requiredValue: rule.join(' / '),
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your gender meets the requirement.'
          : `This scheme is for ${rule.join(' / ')} applicants.`,
      };
    }

    case 'income': {
      if (!rule) return null;
      if (userValue === undefined || userValue === null || userValue === '') {
        return {
          condition: 'Annual Income',
          userValue: 'Not provided',
          requiredValue: `Maximum ${formatCurrency(rule)}`,
          status: 'insufficient_info',
          message: 'Income information is required.',
        };
      }
      const passed = userValue <= rule;
      return {
        condition: 'Annual Income',
        userValue: formatCurrency(userValue),
        requiredValue: `Maximum ${formatCurrency(rule)}`,
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your annual income is within the required limit.'
          : `The scheme requires annual income below ${formatCurrency(rule)}.`,
      };
    }

    case 'occupation': {
      if (!rule || rule.length === 0 || rule.includes('All')) return null;
      if (!userValue) {
        return {
          condition: 'Occupation',
          userValue: 'Not provided',
          requiredValue: rule.join(' / '),
          status: 'insufficient_info',
          message: 'Occupation information is required.',
        };
      }
      const passed = rule.includes(userValue);
      return {
        condition: 'Occupation',
        userValue,
        requiredValue: rule.join(' / '),
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your occupation meets the requirement.'
          : `This scheme is for ${rule.join(' / ')}.`,
      };
    }

    case 'education': {
      if (!rule || rule.length === 0 || rule.includes('All')) return null;
      if (!userValue) {
        return {
          condition: 'Education',
          userValue: 'Not provided',
          requiredValue: rule.join(' / '),
          status: 'insufficient_info',
          message: 'Education information is required.',
        };
      }
      const passed = rule.includes(userValue);
      return {
        condition: 'Education',
        userValue,
        requiredValue: rule.join(' / '),
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your education level meets the requirement.'
          : `This scheme requires ${rule.join(' / ')}.`,
      };
    }

    case 'category': {
      if (!rule || rule.length === 0 || rule.includes('All')) return null;
      if (!userValue) {
        return {
          condition: 'Community',
          userValue: 'Not provided',
          requiredValue: rule.join(' / '),
          status: 'insufficient_info',
          message: 'Community/category information is required.',
        };
      }
      const passed = rule.includes(userValue);
      return {
        condition: 'Community',
        userValue,
        requiredValue: rule.join(' / '),
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your community category meets the requirement.'
          : `This scheme is for ${rule.join(', ')} categories.`,
      };
    }

    case 'state': {
      if (!rule || rule.length === 0 || rule.includes('All States')) return null;
      if (!userValue) {
        return {
          condition: 'State',
          userValue: 'Not provided',
          requiredValue: rule.join(', '),
          status: 'insufficient_info',
          message: 'State information is required.',
        };
      }
      const passed = rule.includes(userValue);
      return {
        condition: 'State',
        userValue,
        requiredValue: rule.join(', '),
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'Your state is covered by this scheme.'
          : `This scheme is available only in ${rule.join(', ')}.`,
      };
    }

    case 'disability': {
      if (!rule) return null; // Not required
      if (userValue === undefined || userValue === null) {
        return {
          condition: 'Disability Status',
          userValue: 'Not provided',
          requiredValue: 'Person with disability',
          status: 'insufficient_info',
          message: 'Disability status information is required.',
        };
      }
      const passed = userValue === true;
      return {
        condition: 'Disability Status',
        userValue: userValue ? 'Yes' : 'No',
        requiredValue: 'Person with disability',
        status: passed ? 'passed' : 'failed',
        message: passed
          ? 'You meet the disability requirement.'
          : 'This scheme is specifically for persons with disability.',
      };
    }

    default:
      return null;
  }
}

/**
 * Convert an EligibilityRule document from the collection into the
 * internal rules format used by evaluateScheme().
 */
function convertDedicatedRule(rule) {
  return {
    age: {
      min: rule.minimumAge ?? undefined,
      max: rule.maximumAge ?? undefined,
    },
    gender: rule.gender && rule.gender.length > 0 ? rule.gender : undefined,
    maxAnnualIncome: rule.maximumIncome ?? undefined,
    occupations: rule.occupation && rule.occupation.length > 0 ? rule.occupation : undefined,
    education: rule.educationalLevel && rule.educationalLevel.length > 0 ? rule.educationalLevel : undefined,
    categories: rule.socialCategory && rule.socialCategory.length > 0 ? rule.socialCategory : undefined,
    states: rule.state && rule.state.length > 0 ? rule.state : undefined,
    districts: rule.district && rule.district.length > 0 ? rule.district : undefined,
    disabilityRequired: rule.disabilityStatus || false,
    maritalStatus: rule.maritalStatus && rule.maritalStatus.length > 0 ? rule.maritalStatus : undefined,
    ruralUrban: rule.residenceType && rule.residenceType.length > 0 ? rule.residenceType : undefined,
  };
}

/**
 * Merge multiple dedicated rules into a single rules object.
 * Uses the most restrictive values (narrowest ranges).
 */
function mergeDedicatedRules(dedicatedRules) {
  if (dedicatedRules.length === 1) {
    return convertDedicatedRule(dedicatedRules[0]);
  }

  // Start with the first rule and merge others
  const merged = convertDedicatedRule(dedicatedRules[0]);

  for (let i = 1; i < dedicatedRules.length; i++) {
    const r = convertDedicatedRule(dedicatedRules[i]);

    // Age: take the most restrictive range
    if (r.age) {
      if (!merged.age) merged.age = {};
      if (r.age.min != null) merged.age.min = Math.max(merged.age.min || 0, r.age.min);
      if (r.age.max != null) merged.age.max = Math.min(merged.age.max || 120, r.age.max);
    }

    // Income: take the most restrictive
    if (r.maxAnnualIncome != null) {
      merged.maxAnnualIncome = merged.maxAnnualIncome != null
        ? Math.min(merged.maxAnnualIncome, r.maxAnnualIncome)
        : r.maxAnnualIncome;
    }

    // Arrays: union approach for multiple rules
    ['gender', 'occupations', 'education', 'categories', 'states', 'districts', 'maritalStatus', 'ruralUrban'].forEach((key) => {
      if (r[key] && r[key].length > 0) {
        if (!merged[key] || merged[key].length === 0) {
          merged[key] = r[key];
        }
      }
    });

    // Disability: if any rule requires it, require it
    if (r.disabilityRequired) merged.disabilityRequired = true;
  }

  return merged;
}

/**
 * Evaluate a user's profile against a single scheme's eligibility rules.
 */
function evaluateScheme(scheme, userProfile, rulesOverride = null) {
  const rules = rulesOverride || scheme.eligibilityRules || {};
  const conditionResults = [];

  // Map scheme rules to conditions
  const evaluations = [
    evaluateCondition('age', userProfile.age, rules.age, scheme),
    evaluateCondition('gender', userProfile.gender, rules.gender, scheme),
    evaluateCondition('income', userProfile.annualIncome, rules.maxAnnualIncome, scheme),
    evaluateCondition('occupation', userProfile.occupation, rules.occupations, scheme),
    evaluateCondition('education', userProfile.education, rules.education, scheme),
    evaluateCondition('category', userProfile.category, rules.categories, scheme),
    evaluateCondition('state', userProfile.state, rules.states, scheme),
    evaluateCondition('disability', userProfile.disabilityStatus, rules.disabilityRequired, scheme),
  ];

  // Filter out null (conditions not defined for this scheme)
  evaluations.forEach((result) => {
    if (result) conditionResults.push(result);
  });

  // Calculate status
  const passed = conditionResults.filter((r) => r.status === 'passed');
  const failed = conditionResults.filter((r) => r.status === 'failed');
  const missing = conditionResults.filter((r) => r.status === 'insufficient_info');

  let status;
  if (failed.length > 0) {
    status = 'NOT_ELIGIBLE';
  } else if (missing.length > 0 && passed.length > 0) {
    status = 'PARTIALLY_ELIGIBLE';
  } else if (missing.length > 0 && passed.length === 0) {
    status = 'INSUFFICIENT_INFORMATION';
  } else {
    status = 'ELIGIBLE';
  }

  // Score: percentage of passed conditions
  const totalConditions = conditionResults.length || 1;
  const score = Math.round((passed.length / totalConditions) * 100);

  return {
    schemeId: scheme._id,
    schemeName: scheme.name,
    category: scheme.category,
    status,
    score,
    matchedConditions: passed.map((r) => r.condition),
    failedConditions: failed.map((r) => r.condition),
    missingInformation: missing.map((r) => r.condition),
    conditionResults,
  };
}

/**
 * Main eligibility check function.
 * Fetches all active schemes, evaluates each, stores results, returns response.
 *
 * UPDATED: For each scheme, first checks the EligibilityRule collection.
 * If dedicated rules exist, uses those. Otherwise falls back to embedded rules.
 */
export const checkEligibility = async (userProfile, userId = null) => {
  // Fetch all active schemes
  const schemes = await Scheme.find({ status: 'active' });

  if (schemes.length === 0) {
    return {
      totalSchemesEvaluated: 0,
      eligibleSchemes: 0,
      results: [],
    };
  }

  // Pre-fetch all dedicated eligibility rules for all schemes in one query
  const schemeIds = schemes.map((s) => s._id);
  const allDedicatedRules = await EligibilityRule.find({ schemeId: { $in: schemeIds } });

  // Group rules by schemeId
  const rulesByScheme = {};
  allDedicatedRules.forEach((rule) => {
    const key = rule.schemeId.toString();
    if (!rulesByScheme[key]) rulesByScheme[key] = [];
    rulesByScheme[key].push(rule);
  });

  // Evaluate each scheme
  const results = schemes.map((scheme) => {
    const schemeKey = scheme._id.toString();
    const dedicatedRules = rulesByScheme[schemeKey];

    if (dedicatedRules && dedicatedRules.length > 0) {
      // Use dedicated EligibilityRule documents
      const mergedRules = mergeDedicatedRules(dedicatedRules);
      return evaluateScheme(scheme, userProfile, mergedRules);
    } else {
      // Fallback to embedded eligibilityRules on scheme document
      return evaluateScheme(scheme, userProfile);
    }
  });

  const eligibleCount = results.filter((r) => r.status === 'ELIGIBLE').length;

  // Store results in database if user is logged in
  if (userId) {
    await EligibilityResult.create({
      userId,
      profileSnapshot: userProfile,
      totalSchemesEvaluated: schemes.length,
      eligibleCount,
      results,
    });
  }

  return {
    totalSchemesEvaluated: schemes.length,
    eligibleSchemes: eligibleCount,
    results,
  };
};

export default { checkEligibility };
