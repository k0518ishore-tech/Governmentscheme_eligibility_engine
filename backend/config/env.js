// ============================================================
// SchemeGuide Backend — Environment Configuration
// ============================================================

import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/GovernmentSchemeDB',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_dev_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5500',
};

export default env;
