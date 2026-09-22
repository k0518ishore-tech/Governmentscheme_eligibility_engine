// ============================================================
// SchemeGuide Backend — Auth Controller
// ============================================================

import * as authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/response.js';

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const result = await authService.registerUser({ name, email, password, phone });

    successResponse(res, result, 'Account created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user._id);
    successResponse(res, { user });
  } catch (error) {
    next(error);
  }
};
