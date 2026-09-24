// ============================================================
// SchemeGuide Backend — Search History Model
// ============================================================

import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    searchQuery: {
      type: String,
      trim: true,
    },
    searchCategory: {
      type: String,
      trim: true,
    },
    filterApplied: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true, // createdAt serves as search timestamp
  }
);

searchHistorySchema.index({ userId: 1 });
searchHistorySchema.index({ createdAt: -1 });

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);
export default SearchHistory;
