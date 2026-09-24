// ============================================================
// SchemeGuide Backend — Department Controller
// ============================================================

import * as departmentService from '../services/departmentService.js';
import AuditLog from '../models/AuditLog.js';
import { successResponse } from '../utils/response.js';

// GET /api/departments
export const getDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    successResponse(res, { departments });
  } catch (error) {
    next(error);
  }
};

// GET /api/departments/:id
export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    successResponse(res, { department });
  } catch (error) {
    next(error);
  }
};

// POST /api/departments (admin)
export const createDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.createDepartment(req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'DEPARTMENT_CREATED',
      resource: 'Department',
      resourceId: department._id,
      details: { departmentName: department.departmentName },
    });

    successResponse(res, { department }, 'Department created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/departments/:id (admin)
export const updateDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.updateDepartment(req.params.id, req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'DEPARTMENT_UPDATED',
      resource: 'Department',
      resourceId: department._id,
      details: { departmentName: department.departmentName },
    });

    successResponse(res, { department }, 'Department updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/departments/:id (admin)
export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.deleteDepartment(req.params.id);

    await AuditLog.create({
      userId: req.user._id,
      action: 'DEPARTMENT_DELETED',
      resource: 'Department',
      resourceId: department._id,
      details: { departmentName: department.departmentName },
    });

    successResponse(res, {}, 'Department deleted successfully');
  } catch (error) {
    next(error);
  }
};
