// ============================================================
// SchemeGuide Backend — Validation Middleware
// ============================================================

import { validationResult } from 'express-validator';
import { validationErrorResponse } from '../utils/response.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
      value: e.value,
    }));
    return validationErrorResponse(res, formatted);
  }
  next();
};

export default validate;
