// ============================================================
// SchemeGuide Backend — Eligibility Result Model
// ============================================================

import mongoose from 'mongoose';

const conditionResultSchema = new mongoose.Schema(
  {
    condition: { type: String, required: true },
    userValue: { type: mongoose.Schema.Types.Mixed },
    requiredValue: { type: String },
    status: {
      type: String,
      enum: ['passed', 'failed', 'insufficient_info'],
      required: true,
    },
    message: { type: String },
  },
  { _id: false }
);

const schemeResultSchema = new mongoose.Schema(
  {
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      required: true,
    },
    schemeName: { type: String, required: true },
    category: { type: String },
    status: {
      type: String,
      enum: ['ELIGIBLE', 'NOT_ELIGIBLE', 'INSUFFICIENT_INFORMATION', 'PARTIALLY_ELIGIBLE'],
      required: true,
    },
    score: { type: Number, min: 0, max: 100 },
    matchedConditions: [String],
    failedConditions: [String],
    missingInformation: [String],
    conditionResults: [conditionResultSchema],
  },
  { _id: false }
);

const eligibilityResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profileSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    totalSchemesEvaluated: { type: Number, default: 0 },
    eligibleCount: { type: Number, default: 0 },
    results: [schemeResultSchema],
  },
  {
    timestamps: true,
  }
);

const EligibilityResult = mongoose.model('EligibilityResult', eligibilityResultSchema);
export default EligibilityResult;
