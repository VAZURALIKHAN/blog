const mongoose = require('mongoose');
const Author = require('../models/Author');
const Post = require('../models/Post');
const storage = require('../config/storage');
const { generateSlug } = require('../utils/helpers');

const isMongo = () => mongoose.connection.readyState === 1;

exports.getAuthors = async (req, res, next) => {
  try {
    if (isMongo()) {
      const authors = await Author.find().sort({ name: 1 }).lean();
      const authorsWithCount = await Promise.all(
        authors.map(async (author) => {
          const postCount = await Post.countDocuments({
            author: author._id,
            $or: [
              { status: 'published' },
              { status: 'scheduled', scheduledAt: { $lte: new Date() } },
            ],
          });
          return { ...author, postCount };
        })
      );
      return res.status(200).json({ success: true, count: authorsWithCount.length, data: authorsWithCount });
    }

    const authors = storage.getAuthors();
    res.status(200).json({ success: true, count: authors.length, data: authors });
  } catch (error) {
    next(error);
  }
};

exports.getAuthorById = async (req, res, next) => {
  try {
    if (isMongo()) {
      const author = await Author.findById(req.params.id);
      if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
      return res.status(200).json({ success: true, data: author });
    }

    const author = storage.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
    res.status(200).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio, avatar, role, socialLinks } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Author name is required' });

    const slug = generateSlug(name);
    const payload = {
      name,
      slug,
      email: email || '',
      bio: bio || '',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: role || 'Contributing Writer',
      socialLinks: socialLinks || {},
    };

    if (isMongo()) {
      const author = await Author.create(payload);
      return res.status(201).json({ success: true, data: author });
    }

    const author = storage.createAuthor(payload);
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const { name, email, bio, avatar, role, socialLinks } = req.body;
    const payload = {};
    if (name) {
      payload.name = name;
      payload.slug = generateSlug(name);
    }
    if (email !== undefined) payload.email = email;
    if (bio !== undefined) payload.bio = bio;
    if (avatar !== undefined) payload.avatar = avatar;
    if (role !== undefined) payload.role = role;
    if (socialLinks !== undefined) payload.socialLinks = socialLinks;

    if (isMongo()) {
      const author = await Author.findByIdAndUpdate(req.params.id, payload, { new: true });
      if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
      return res.status(200).json({ success: true, data: author });
    }

    const author = storage.updateAuthor(req.params.id, payload);
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
    res.status(200).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    if (isMongo()) {
      await Author.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Author deleted successfully' });
    }

    const deleted = storage.deleteAuthor(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Author not found' });
    res.status(200).json({ success: true, message: 'Author deleted successfully' });
  } catch (error) {
    next(error);
  }
};
