// ============================================================
// SchemeGuide Backend — Auth Middleware
// ============================================================

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/env.js';
import { errorResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized — no token provided', 401, 'AUTH_NO_TOKEN');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return errorResponse(res, 'User not found', 401, 'AUTH_USER_NOT_FOUND');
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Not authorized — invalid token', 401, 'AUTH_INVALID_TOKEN');
  }
};
