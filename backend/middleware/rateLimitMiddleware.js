// ============================================================
// SchemeGuide Backend — Rate Limiting Middleware
// ============================================================

import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    error: { code: 'RATE_LIMIT_EXCEEDED' },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.',
    error: { code: 'AUTH_RATE_LIMIT' },
  },
});

export const eligibilityLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many eligibility checks, please try again shortly.',
    error: { code: 'ELIGIBILITY_RATE_LIMIT' },
  },
});
