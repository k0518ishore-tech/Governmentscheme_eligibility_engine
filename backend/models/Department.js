// ============================================================
// SchemeGuide Backend — Department Model
// ============================================================

import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
      unique: true,
    },
    departmentDescriptor: {
      type: String,
      trim: true,
    },
    ministryName: {
      type: String,
      trim: true,
    },
    stateOrCentral: {
      type: String,
      enum: ['Central', 'State'],
      default: 'Central',
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model('Department', departmentSchema);
export default Department;
