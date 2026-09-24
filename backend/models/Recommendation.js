// ============================================================
// SchemeGuide Backend — Recommendation Model
// ============================================================

import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      required: true,
    },
    recommendationScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    matchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    reason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

recommendationSchema.index({ userId: 1 });
recommendationSchema.index({ schemeId: 1 });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
