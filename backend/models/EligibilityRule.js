// ============================================================
// SchemeGuide Backend — Eligibility Rule Model
// ============================================================
// Stores eligibility rules per scheme in a dedicated collection.
// EligibilityRule ≠ EligibilityResult.
//   Rule  = "What does the scheme require?"
//   Result = "What happened when a user was evaluated?"
// ============================================================

import mongoose from 'mongoose';

const eligibilityRuleSchema = new mongoose.Schema(
  {
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      required: [true, 'Scheme reference is required'],
    },
    ruleType: {
      type: String,
      trim: true,
      default: 'standard',
    },
    // ── ER Diagram Fields ─────────────────────────────────────
    minimumAge: { type: Number, min: 0 },
    maximumAge: { type: Number, max: 120 },
    minimumIncome: { type: Number, min: 0 },
    maximumIncome: { type: Number, min: 0 },
    // ── Extended Fields (for eligibility engine) ──────────────
    gender: {
      type: [String],
      default: [],
    },
    socialCategory: {
      type: [String],
      default: [],
    },
    occupation: {
      type: [String],
      default: [],
    },
    educationalLevel: {
      type: [String],
      default: [],
    },
    maritalStatus: {
      type: [String],
      default: [],
    },
    disabilityStatus: {
      type: Boolean,
      default: false,
    },
    residenceType: {
      type: [String],
      default: [],
    },
    state: {
      type: [String],
      default: [],
    },
    district: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

eligibilityRuleSchema.index({ schemeId: 1 });

const EligibilityRule = mongoose.model('EligibilityRule', eligibilityRuleSchema);
export default EligibilityRule;
