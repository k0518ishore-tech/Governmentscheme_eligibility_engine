// ============================================================
// SchemeGuide Backend — Express Server
// ============================================================

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import env from './config/env.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { generalLimiter } from './middleware/rateLimitMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import eligibilityRoutes from './routes/eligibilityRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// New entity route imports
import departmentRoutes from './routes/departmentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import eligibilityRuleRoutes from './routes/eligibilityRuleRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import searchHistoryRoutes from './routes/searchHistoryRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

// ── Security Middleware ─────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: [env.CLIENT_URL, 'http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  credentials: true,
}));
app.use(generalLimiter);

// ── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ─────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// ── New Entity Routes ───────────────────────────────────────
app.use('/api/departments', departmentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/eligibility-rules', eligibilityRuleRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/search-history', searchHistoryRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/notifications', notificationRoutes);

// ── Health & Root Welcome Endpoints ─────────────────────────
app.get(['/', '/api'], (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SchemeGuide Backend API',
    version: '2.0.0',
    documentation: '/api/health',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      schemes: '/api/schemes',
      eligibility: '/api/eligibility',
      applications: '/api/applications',
      admin: '/api/admin',
      departments: '/api/departments',
      categories: '/api/categories',
      eligibilityRules: '/api/eligibility-rules',
      bookmarks: '/api/bookmarks',
      searchHistory: '/api/search-history',
      recommendations: '/api/recommendations',
      notifications: '/api/notifications',
      health: '/api/health',
    },
  });
});

app.get('/api/health', async (req, res) => {
  let database = { status: 'disconnected' };

  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    try {
      await mongoose.connection.db.admin().ping();
      database = { status: 'connected', name: mongoose.connection.name };
    } catch {
      database = { status: 'unavailable' };
    }
  }

  const healthy = database.status === 'connected';
  res.status(healthy ? 200 : 503).json({
    success: healthy,
    status: healthy ? 'ok' : 'degraded',
    message: healthy ? 'SchemeGuide API and database are available' : 'Database connection is unavailable',
    environment: env.NODE_ENV,
    database,
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    error: { code: 'NOT_FOUND' },
  });
});

// ── Error Handler ───────────────────────────────────────────
app.use(errorMiddleware);

// ── Start Server ────────────────────────────────────────────
const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║                                              ║');
    console.log('║   🏛️  SchemeGuide API Server                  ║');
    console.log(`║   🚀 Running on port ${env.PORT}                    ║`);
    console.log(`║   📦 Environment: ${env.NODE_ENV.padEnd(20)}   ║`);
    console.log(`║   🔗 ${`http://localhost:${env.PORT}/api`.padEnd(38)} ║`);
    console.log('║                                              ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
  });
};

startServer();
