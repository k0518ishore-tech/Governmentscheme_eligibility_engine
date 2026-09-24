// ============================================================
// SchemeGuide Backend — Scheme Model
// ============================================================

import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Scheme name is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
    },
    description: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    ministry: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    schemeType: {
      type: String,
    },
    level: {
      type: String,
      enum: ['Central', 'State', 'Both'],
      default: 'Central',
    },
    state: {
      type: [String],
      default: ['All States'],
    },
    benefit: {
      type: String,
    },
    benefitDetail: {
      type: String,
    },
    benefits: {
      type: [String],
    },
    eligibilityRules: {
      age: {
        min: { type: Number },
        max: { type: Number },
      },
      gender: {
        type: [String],
        default: [],
      },
      categories: {
        type: [String],
        default: [],
      },
      minAnnualIncome: { type: Number },
      maxAnnualIncome: { type: Number },
      occupations: {
        type: [String],
        default: [],
      },
      education: {
        type: [String],
        default: [],
      },
      maritalStatus: {
        type: [String],
        default: [],
      },
      disabilityRequired: { type: Boolean, default: false },
      minorityRequired: { type: Boolean, default: false },
      ruralUrban: {
        type: [String],
        default: [],
      },
      states: {
        type: [String],
        default: [],
      },
      districts: {
        type: [String],
        default: [],
      },
    },
    criteria: [
      {
        label: String,
        requirement: String,
      },
    ],
    documentsRequired: {
      type: [String],
      default: [],
    },
    applicationProcess: {
      type: [String],
      default: [],
    },
    applicationUrl: {
      type: String,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    eligibilitySourceUrl: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
schemeSchema.index({ name: 'text', shortDescription: 'text', category: 'text', tags: 'text' });

// Additional indexes for new references and common queries
schemeSchema.index({ departmentId: 1 });
schemeSchema.index({ categoryId: 1 });
schemeSchema.index({ status: 1 });

const Scheme = mongoose.model('Scheme', schemeSchema);
export default Scheme;
