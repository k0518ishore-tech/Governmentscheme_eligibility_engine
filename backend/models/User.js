// ============================================================
// SchemeGuide Backend — User Model
// ============================================================

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // Never return password by default
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      age: { type: Number, min: 0, max: 120 },
      gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say', ''] },
      state: { type: String },
      district: { type: String },
      category: { type: String, enum: ['General', 'OBC', 'SC', 'ST', 'Minority', 'EWS', ''] },
      occupation: {
        type: String,
        enum: ['Student', 'Employed', 'Self-Employed', 'Farmer', 'Unemployed', 'Homemaker', 'Retired', 'Other', ''],
      },
      annualIncome: { type: Number, min: 0 },
      education: {
        type: String,
        enum: [
          'No Formal Education', 'Primary', 'Secondary', 'Higher Secondary',
          'Diploma', "Bachelor's Degree", "Master's Degree", 'Doctorate', '',
        ],
      },
      maritalStatus: { type: String, enum: ['Single', 'Married', 'Widowed', 'Divorced', ''] },
      disabilityStatus: { type: Boolean, default: false },
      minorityStatus: { type: Boolean, default: false },
      ruralUrban: { type: String, enum: ['Urban', 'Rural', 'Semi-Urban', ''] },
    },
    savedSchemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);
export default User;
