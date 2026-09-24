// ============================================================
// SchemeGuide Backend — Department Service
// ============================================================

import Department from '../models/Department.js';

export const getAllDepartments = async () => {
  return Department.find().sort({ departmentName: 1 });
};

export const getDepartmentById = async (id) => {
  const department = await Department.findById(id);
  if (!department) {
    const error = new Error('Department not found');
    error.statusCode = 404;
    throw error;
  }
  return department;
};

export const createDepartment = async (data) => {
  return Department.create(data);
};

export const updateDepartment = async (id, data) => {
  const department = await Department.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!department) {
    const error = new Error('Department not found');
    error.statusCode = 404;
    throw error;
  }
  return department;
};

export const deleteDepartment = async (id) => {
  const department = await Department.findByIdAndDelete(id);
  if (!department) {
    const error = new Error('Department not found');
    error.statusCode = 404;
    throw error;
  }
  return department;
};
