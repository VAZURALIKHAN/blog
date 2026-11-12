const mongoose = require('mongoose');
const Category = require('../models/Category');
const Post = require('../models/Post');
const storage = require('../config/storage');
const { generateSlug } = require('../utils/helpers');

const isMongo = () => mongoose.connection.readyState === 1;

exports.getCategories = async (req, res, next) => {
  try {
    if (isMongo()) {
      const categories = await Category.find().sort({ name: 1 }).lean();
      const categoriesWithCount = await Promise.all(
        categories.map(async (cat) => {
          const count = await Post.countDocuments({
            category: cat._id,
            $or: [
              { status: 'published' },
              { status: 'scheduled', scheduledAt: { $lte: new Date() } },
            ],
          });
          return { ...cat, postCount: count };
        })
      );
      return res.status(200).json({ success: true, count: categoriesWithCount.length, data: categoriesWithCount });
    }

    const categories = storage.getCategories();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    if (isMongo()) {
      const category = await Category.findOne({ slug: req.params.slug });
      if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
      return res.status(200).json({ success: true, data: category });
    }

    const category = storage.getCategoryBySlug(req.params.slug);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });

    const slug = generateSlug(name);

    if (isMongo()) {
      const existing = await Category.findOne({ $or: [{ name }, { slug }] });
      if (existing) return res.status(400).json({ success: false, message: 'Category already exists' });
      const category = await Category.create({ name, slug, description: description || '', color: color || '#2563eb' });
      return res.status(201).json({ success: true, data: category });
    }

    const category = storage.createCategory({ name, slug, description: description || '', color: color || '#2563eb' });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;
    const payload = {};
    if (name) {
      payload.name = name;
      payload.slug = generateSlug(name);
    }
    if (description !== undefined) payload.description = description;
    if (color !== undefined) payload.color = color;

    if (isMongo()) {
      const category = await Category.findByIdAndUpdate(req.params.id, payload, { new: true });
      if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
      return res.status(200).json({ success: true, data: category });
    }

    const category = storage.updateCategory(req.params.id, payload);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    if (isMongo()) {
      const postsUsingCategory = await Post.countDocuments({ category: req.params.id });
      if (postsUsingCategory > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete category. There are ${postsUsingCategory} posts using it.`,
        });
      }
      await Category.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    }

    const deleted = storage.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
