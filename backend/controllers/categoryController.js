// ============================================================
// SchemeGuide Backend — Category Controller
// ============================================================

import * as categoryService from '../services/categoryService.js';
import AuditLog from '../models/AuditLog.js';
import { successResponse } from '../utils/response.js';

// GET /api/categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    successResponse(res, { categories });
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    successResponse(res, { category });
  } catch (error) {
    next(error);
  }
};

// POST /api/categories (admin)
export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'CATEGORY_CREATED',
      resource: 'Category',
      resourceId: category._id,
      details: { categoryName: category.categoryName },
    });

    successResponse(res, { category }, 'Category created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/categories/:id (admin)
export const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'CATEGORY_UPDATED',
      resource: 'Category',
      resourceId: category._id,
      details: { categoryName: category.categoryName },
    });

    successResponse(res, { category }, 'Category updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id (admin)
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);

    await AuditLog.create({
      userId: req.user._id,
      action: 'CATEGORY_DELETED',
      resource: 'Category',
      resourceId: category._id,
      details: { categoryName: category.categoryName },
    });

    successResponse(res, {}, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};
