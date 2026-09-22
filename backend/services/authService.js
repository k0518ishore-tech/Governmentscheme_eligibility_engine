// ============================================================
// SchemeGuide Backend — Auth Service
// ============================================================

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async ({ name, email, password, phone }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    error.code = 'EMAIL_EXISTS';
    throw error;
  }

  const user = await User.create({ name, email, password, phone });
  const token = generateToken(user._id, user.role);

  return {
    user: user.toJSON(),
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    error.code = 'AUTH_INVALID_CREDENTIALS';
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    error.code = 'AUTH_INVALID_CREDENTIALS';
    throw error;
  }

  const token = generateToken(user._id, user.role);

  return {
    user: user.toJSON(),
    token,
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).populate('savedSchemes');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};
