// ============================================================
// SchemeGuide Backend — Category Model
// ============================================================

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    categoryDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // serves as createdDate / updatedDate
  }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
