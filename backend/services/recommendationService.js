// ============================================================
// SchemeGuide Backend — Recommendation Service
// ============================================================
// Generates recommendations by leveraging the existing
// eligibility engine. Does NOT produce fake/arbitrary results.
// ============================================================

import Recommendation from '../models/Recommendation.js';
import Scheme from '../models/Scheme.js';
import EligibilityRule from '../models/EligibilityRule.js';
import User from '../models/User.js';

/**
 * Generate recommendations for a user based on their profile.
 * Uses the same evaluation logic as the eligibility engine.
 */
export const generateRecommendations = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.profile) {
    const error = new Error('User profile not found. Please complete your profile first.');
    error.statusCode = 400;
    throw error;
  }

  const profile = user.profile;
  const schemes = await Scheme.find({ status: 'active' });

  if (schemes.length === 0) {
    return [];
  }

  const recommendations = [];

  for (const scheme of schemes) {
    // Try to get dedicated eligibility rules first
    const dedicatedRules = await EligibilityRule.find({ schemeId: scheme._id });
    let score = 0;
    let totalChecks = 0;
    let passedChecks = 0;
    const reasons = [];

    if (dedicatedRules.length > 0) {
      // Use dedicated EligibilityRule documents
      for (const rule of dedicatedRules) {
        // Age check
        if (rule.minimumAge != null || rule.maximumAge != null) {
          totalChecks++;
          if (profile.age != null) {
            if (profile.age >= (rule.minimumAge || 0) && profile.age <= (rule.maximumAge || 120)) {
              passedChecks++;
              reasons.push('Age requirement met');
            }
          }
        }

        // Income check
        if (rule.maximumIncome != null) {
          totalChecks++;
          if (profile.annualIncome != null && profile.annualIncome <= rule.maximumIncome) {
            passedChecks++;
            reasons.push('Income requirement met');
          }
        }

        // Gender check
        if (rule.gender && rule.gender.length > 0 && !rule.gender.includes('All')) {
          totalChecks++;
          if (profile.gender && rule.gender.includes(profile.gender)) {
            passedChecks++;
            reasons.push('Gender requirement met');
          }
        }

        // Category check
        if (rule.socialCategory && rule.socialCategory.length > 0 && !rule.socialCategory.includes('All')) {
          totalChecks++;
          if (profile.category && rule.socialCategory.includes(profile.category)) {
            passedChecks++;
            reasons.push('Category requirement met');
          }
        }

        // Occupation check
        if (rule.occupation && rule.occupation.length > 0 && !rule.occupation.includes('All')) {
          totalChecks++;
          if (profile.occupation && rule.occupation.includes(profile.occupation)) {
            passedChecks++;
            reasons.push('Occupation requirement met');
          }
        }

        // State check
        if (rule.state && rule.state.length > 0 && !rule.state.includes('All States')) {
          totalChecks++;
          if (profile.state && rule.state.includes(profile.state)) {
            passedChecks++;
            reasons.push('State requirement met');
          }
        }
      }
    } else if (scheme.eligibilityRules) {
      // Fallback to embedded eligibility rules on scheme
      const rules = scheme.eligibilityRules;

      // Age
      if (rules.age && (rules.age.min != null || rules.age.max != null)) {
        totalChecks++;
        if (profile.age != null) {
          if (profile.age >= (rules.age.min || 0) && profile.age <= (rules.age.max || 120)) {
            passedChecks++;
            reasons.push('Age requirement met');
          }
        }
      }

      // Income
      if (rules.maxAnnualIncome != null) {
        totalChecks++;
        if (profile.annualIncome != null && profile.annualIncome <= rules.maxAnnualIncome) {
          passedChecks++;
          reasons.push('Income requirement met');
        }
      }

      // Gender
      if (rules.gender && rules.gender.length > 0 && !rules.gender.includes('All')) {
        totalChecks++;
        if (profile.gender && rules.gender.includes(profile.gender)) {
          passedChecks++;
          reasons.push('Gender requirement met');
        }
      }

      // Categories
      if (rules.categories && rules.categories.length > 0 && !rules.categories.includes('All')) {
        totalChecks++;
        if (profile.category && rules.categories.includes(profile.category)) {
          passedChecks++;
          reasons.push('Category requirement met');
        }
      }

      // Occupation
      if (rules.occupations && rules.occupations.length > 0 && !rules.occupations.includes('All')) {
        totalChecks++;
        if (profile.occupation && rules.occupations.includes(profile.occupation)) {
          passedChecks++;
          reasons.push('Occupation requirement met');
        }
      }

      // State
      if (rules.states && rules.states.length > 0 && !rules.states.includes('All States')) {
        totalChecks++;
        if (profile.state && rules.states.includes(profile.state)) {
          passedChecks++;
          reasons.push('State requirement met');
        }
      }
    }

    // Calculate match percentage
    const matchPercentage = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
    const recommendationScore = matchPercentage;

    // Only recommend if at least partially matching (score > 0)
    if (recommendationScore > 0) {
      recommendations.push({
        userId,
        schemeId: scheme._id,
        recommendationScore,
        matchPercentage,
        reason: [...new Set(reasons)].join('; ') || 'Matches your profile',
      });
    }
  }

  // Sort by score descending
  recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);

  // Remove old recommendations for this user and store new ones
  await Recommendation.deleteMany({ userId });
  if (recommendations.length > 0) {
    await Recommendation.insertMany(recommendations);
  }

  // Return populated recommendations
  return Recommendation.find({ userId })
    .sort({ recommendationScore: -1 })
    .populate('schemeId', 'name shortDescription category benefit department status');
};

export const getUserRecommendations = async (userId) => {
  const existing = await Recommendation.find({ userId })
    .sort({ recommendationScore: -1 })
    .populate('schemeId', 'name shortDescription category benefit department status');

  // If no existing recommendations, generate fresh ones
  if (existing.length === 0) {
    return generateRecommendations(userId);
  }

  return existing;
};

export const getRecommendationById = async (id, userId) => {
  const rec = await Recommendation.findOne({ _id: id, userId })
    .populate('schemeId');
  if (!rec) {
    const error = new Error('Recommendation not found');
    error.statusCode = 404;
    throw error;
  }
  return rec;
};
