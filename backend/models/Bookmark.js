// ============================================================
// SchemeGuide Backend — Bookmark Model
// ============================================================

import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
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
    bookmarkDate: {
      type: Date,
      default: Date.now,
    },
    lastRenewedDate: {
      type: Date,
    },
    reminderDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate bookmarks: same user + same scheme
bookmarkSchema.index({ userId: 1, schemeId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
