// ============================================================
// SchemeGuide Backend — Admin Middleware
// ============================================================

import { errorResponse } from '../utils/response.js';

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return errorResponse(res, 'Access denied — admin only', 403, 'FORBIDDEN');
};
