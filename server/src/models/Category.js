const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#2563eb', // Default blue
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
