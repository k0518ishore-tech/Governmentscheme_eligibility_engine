// ============================================================
// SchemeGuide Backend — Admin Controller
// ============================================================

import User from '../models/User.js';
import Scheme from '../models/Scheme.js';
import Application from '../models/Application.js';
import EligibilityResult from '../models/EligibilityResult.js';
import AuditLog from '../models/AuditLog.js';
import Department from '../models/Department.js';
import Category from '../models/Category.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/response.js';

// GET /api/admin/dashboard
export const getDashboard = async (req, res, next) => {
  try {
    const [totalSchemes, activeSchemes, totalUsers, totalApplications, totalDepartments, totalCategories, recentUsers, recentApps] =
      await Promise.all([
        Scheme.countDocuments(),
        Scheme.countDocuments({ status: 'active' }),
        User.countDocuments({ role: 'user' }),
        Application.countDocuments(),
        Department.countDocuments(),
        Category.countDocuments(),
        User.find({ role: 'user' }).sort({ createdAt: -1 }).limit(5).select('name email createdAt'),
        Application.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'name email'),
      ]);

    const appsByStatus = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const schemesByCategory = await Scheme.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    successResponse(res, {
      stats: {
        totalSchemes,
        activeSchemes,
        totalUsers,
        totalApplications,
        totalDepartments,
        totalCategories,
      },
      appsByStatus,
      schemesByCategory,
      recentUsers,
      recentApps,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/users
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-password');

    const total = await User.countDocuments({ role: 'user' });

    successResponse(res, { users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/schemes (includes inactive)
export const getSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find().sort({ updatedAt: -1 });
    successResponse(res, { schemes });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/schemes/:id/rules — Update eligibility rules
export const updateSchemeRules = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return errorResponse(res, 'Scheme not found', 404);
    }

    scheme.eligibilityRules = req.body.eligibilityRules || req.body;
    await scheme.save();

    // Audit log
    await AuditLog.create({
      userId: req.user._id,
      action: 'UPDATE_ELIGIBILITY_RULES',
      resource: 'Scheme',
      resourceId: scheme._id,
      details: { rules: scheme.eligibilityRules },
    });

    successResponse(res, { scheme }, 'Eligibility rules updated');
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/applications
export const getApplications = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone profile')
      .populate('schemeId', 'name category');

    successResponse(res, { applications });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/applications/:id — Update application status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Submitted', 'Under Review', 'Approved', 'Rejected', 'Pending'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400, 'INVALID_STATUS');
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email').populate('schemeId', 'name');

    if (!application) {
      return errorResponse(res, 'Application not found', 404);
    }

    // Audit log
    await AuditLog.create({
      userId: req.user._id,
      action: 'UPDATE_APPLICATION_STATUS',
      resource: 'Application',
      resourceId: application._id,
      details: { newStatus: status },
    });

    try {
      await Notification.create({
        userId: application.userId._id,
        schemeId: application.schemeId?._id,
        title: 'Application status updated',
        type: 'application_update',
        message: `Your application for ${application.schemeId?.name || application.schemeName} is now ${status}.`,
        priority: status === 'Rejected' ? 'medium' : 'high',
      });
    } catch (notificationError) {
      console.error('[Notifications] Application status was updated, but the citizen notification failed:', notificationError.message);
    }

    successResponse(res, { application }, `Application status updated to ${status}`);
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/eligibility-statistics
export const getEligibilityStatistics = async (req, res, next) => {
  try {
    const totalChecks = await EligibilityResult.countDocuments();
    const recentChecks = await EligibilityResult.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email');

    successResponse(res, { totalChecks, recentChecks });
  } catch (error) {
    next(error);
  }
};
