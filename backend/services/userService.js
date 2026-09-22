// ============================================================
// SchemeGuide Backend — User Service
// ============================================================

import User from '../models/User.js';
import EligibilityResult from '../models/EligibilityResult.js';
import Application from '../models/Application.js';

export const updateUserProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  // Update top-level fields
  if (updateData.name) user.name = updateData.name;
  if (updateData.phone !== undefined) user.phone = updateData.phone;
  if (updateData.email) user.email = updateData.email;

  // Update profile sub-document
  if (updateData.profile) {
    user.profile = { ...user.profile?.toObject?.() || {}, ...updateData.profile };
  }

  await user.save();
  return user;
};

export const getUserEligibilityResults = async (userId) => {
  return EligibilityResult.find({ userId }).sort({ createdAt: -1 }).limit(20);
};

export const getUserApplications = async (userId) => {
  return Application.find({ userId }).sort({ createdAt: -1 });
};

export const addSavedScheme = async (userId, schemeId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (!user.savedSchemes.includes(schemeId)) {
    user.savedSchemes.push(schemeId);
    await user.save();
  }
  return user;
};

export const removeSavedScheme = async (userId, schemeId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  user.savedSchemes = user.savedSchemes.filter((id) => id.toString() !== schemeId.toString());
  await user.save();
  return user;
};

export const getSavedSchemes = async (userId) => {
  const user = await User.findById(userId).populate('savedSchemes');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user.savedSchemes;
};
