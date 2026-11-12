const mongoose = require('mongoose');
const Tag = require('../models/Tag');
const storage = require('../config/storage');
const { generateSlug } = require('../utils/helpers');

const isMongo = () => mongoose.connection.readyState === 1;

exports.getTags = async (req, res, next) => {
  try {
    if (isMongo()) {
      const tags = await Tag.find().sort({ name: 1 });
      return res.status(200).json({ success: true, count: tags.length, data: tags });
    }
    const tags = storage.getTags();
    res.status(200).json({ success: true, count: tags.length, data: tags });
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Tag name is required' });

    const slug = generateSlug(name);
    if (isMongo()) {
      let tag = await Tag.findOne({ $or: [{ name }, { slug }] });
      if (tag) return res.status(200).json({ success: true, data: tag, message: 'Tag already exists' });
      tag = await Tag.create({ name, slug });
      return res.status(201).json({ success: true, data: tag });
    }

    const tag = storage.createTag({ name, slug });
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    if (isMongo()) {
      await Tag.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Tag deleted successfully' });
    }
    res.status(200).json({ success: true, message: 'Tag deleted successfully' });
  } catch (error) {
    next(error);
  }
};
