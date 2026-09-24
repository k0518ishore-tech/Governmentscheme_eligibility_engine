// ============================================================
// SchemeGuide Backend — Notification Model
// ============================================================

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
    },
    title: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['new_scheme', 'application_update', 'recommendation', 'system'],
      default: 'system',
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true,
    },
    sendDate: {
      type: Date,
      default: Date.now,
    },
    sendTime: {
      type: String, // HH:MM format
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    readStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ userId: 1 });
notificationSchema.index({ readStatus: 1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
