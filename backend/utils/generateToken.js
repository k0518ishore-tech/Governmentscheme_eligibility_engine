// ============================================================
// SchemeGuide Backend — JWT Token Generator
// ============================================================

import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const generateToken = (userId, role = 'user') => {
  return jwt.sign({ userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
