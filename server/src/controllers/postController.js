const mongoose = require('mongoose');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Author = require('../models/Author');
const storage = require('../config/storage');
const {
  generateSlug,
  calculateReadingTime,
  extractTableOfContents,
} = require('../utils/helpers');

const isMongo = () => mongoose.connection.readyState === 1;

const publicVisibilityFilter = () => ({
  $or: [
    { status: 'published' },
    { status: 'scheduled', scheduledAt: { $lte: new Date() } },
  ],
});

// @desc    Get all public posts with search, category, tag, sort, pagination
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const { category, tag, search, sort } = req.query;

    if (isMongo()) {
      const skip = (page - 1) * limit;
      const query = { ...publicVisibilityFilter() };

      if (category) {
        const foundCategory = await Category.findOne({ slug: category });
        if (foundCategory) {
          query.category = foundCategory._id;
        } else {
          return res.status(200).json({
            success: true,
            count: 0,
            total: 0,
            totalPages: 0,
            currentPage: page,
            data: [],
          });
        }
      }

      if (tag) {
        const foundTag = await Tag.findOne({ slug: tag });
        if (foundTag) query.tags = foundTag._id;
      }

      if (search && search.trim() !== '') {
        const regex = new RegExp(search.trim(), 'i');
        query.$and = [
          {
            $or: [{ title: regex }, { excerpt: regex }, { content: regex }],
          },
        ];
      }

      let sortQuery = { publishedAt: -1 };
      if (sort === 'popular') sortQuery = { views: -1 };
      else if (sort === 'oldest') sortQuery = { publishedAt: 1 };

      const total = await Post.countDocuments(query);
      const posts = await Post.find(query)
        .populate('category', 'name slug color')
        .populate('author', 'name slug avatar role')
        .populate('tags', 'name slug')
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .select('-content');

      return res.status(200).json({
        success: true,
        count: posts.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        data: posts,
      });
    }

    // Storage Fallback
    const result = storage.getPublicPosts({ category, search, sort, page, limit });
    res.status(200).json({
      success: true,
      count: result.posts.length,
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured posts for homepage hero
// @route   GET /api/posts/featured
// @access  Public
exports.getFeaturedPosts = async (req, res, next) => {
  try {
    if (isMongo()) {
      const posts = await Post.find({
        ...publicVisibilityFilter(),
        isFeatured: true,
      })
        .populate('category', 'name slug color')
        .populate('author', 'name slug avatar role')
        .sort({ publishedAt: -1 })
        .limit(4)
        .select('-content');

      return res.status(200).json({ success: true, data: posts });
    }

    const posts = storage.getFeaturedPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending / popular posts
// @route   GET /api/posts/trending
// @access  Public
exports.getTrendingPosts = async (req, res, next) => {
  try {
    if (isMongo()) {
      const posts = await Post.find(publicVisibilityFilter())
        .populate('category', 'name slug color')
        .populate('author', 'name slug avatar role')
        .sort({ views: -1, publishedAt: -1 })
        .limit(5)
        .select('-content');

      return res.status(200).json({ success: true, data: posts });
    }

    const posts = storage.getTrendingPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/slug/:slug
// @access  Public
exports.getPostBySlug = async (req, res, next) => {
  try {
    if (isMongo()) {
      const post = await Post.findOne({
        slug: req.params.slug,
        ...publicVisibilityFilter(),
      })
        .populate('category', 'name slug color description')
        .populate('author', 'name slug avatar role bio socialLinks')
        .populate('tags', 'name slug');

      if (!post) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

      const relatedPosts = await Post.find({
        _id: { $ne: post._id },
        category: post.category?._id,
        ...publicVisibilityFilter(),
      })
        .populate('category', 'name slug color')
        .populate('author', 'name slug avatar role')
        .select('title slug excerpt featuredImage publishedAt readingTime category author')
        .limit(3);

      const previousPost = await Post.findOne({
        publishedAt: { $lt: post.publishedAt },
        ...publicVisibilityFilter(),
      })
        .sort({ publishedAt: -1 })
        .select('title slug');

      const nextPost = await Post.findOne({
        publishedAt: { $gt: post.publishedAt },
        ...publicVisibilityFilter(),
      })
        .sort({ publishedAt: 1 })
        .select('title slug');

      return res.status(200).json({
        success: true,
        data: post,
        relatedPosts,
        previousPost,
        nextPost,
      });
    }

    const result = storage.getPostBySlug(req.params.slug);
    if (!result || !result.post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({
      success: true,
      data: result.post,
      relatedPosts: result.relatedPosts,
      previousPost: result.previousPost,
      nextPost: result.nextPost,
    });
  } catch (error) {
    next(error);
  }
};

// ======================== ADMIN CONTROLLERS ======================== //

// @desc    Get all posts for Admin Panel
// @route   GET /api/posts/admin/all
// @access  Private (Admin)
exports.getAdminPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { status, search, category } = req.query;

    if (isMongo()) {
      const skip = (page - 1) * limit;
      const query = {};

      if (status && status !== 'all') query.status = status;
      if (category) query.category = category;
      if (search && search.trim() !== '') {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [{ title: regex }, { excerpt: regex }];
      }

      const total = await Post.countDocuments(query);
      const posts = await Post.find(query)
        .populate('category', 'name slug color')
        .populate('author', 'name slug avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content');

      return res.status(200).json({
        success: true,
        count: posts.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        data: posts,
      });
    }

    const result = storage.getAdminPosts({ status, search, category, page, limit });
    res.status(200).json({
      success: true,
      count: result.posts.length,
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by ID (for admin editing)
// @route   GET /api/posts/admin/:id
// @access  Private (Admin)
exports.getAdminPostById = async (req, res, next) => {
  try {
    if (isMongo()) {
      const post = await Post.findById(req.params.id)
        .populate('category')
        .populate('author')
        .populate('tags');

      if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
      return res.status(200).json({ success: true, data: post });
    }

    const post = storage.getPostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new blog post
// @route   POST /api/posts/admin
// @access  Private (Admin)
exports.createPost = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      featuredImageCaption,
      category,
      tags,
      author,
      status: postStatus,
      scheduledAt,
      isFeatured,
      isTrending,
      seo,
      tableOfContents,
    } = req.body;

    if (!title || !content || !category || !author) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, category, and author are required.',
      });
    }

    let finalSlug = slug ? generateSlug(slug) : generateSlug(title);
    const readingTime = calculateReadingTime(content);
    const toc = tableOfContents && tableOfContents.length > 0 ? tableOfContents : extractTableOfContents(content);

    let publishedAt = new Date().toISOString();
    let currentStatus = postStatus || 'draft';
    let scheduleDate = null;

    if (currentStatus === 'scheduled') {
      if (!scheduledAt) {
        return res.status(400).json({
          success: false,
          message: 'Scheduled date and time is required for scheduled status.',
        });
      }
      scheduleDate = new Date(scheduledAt).toISOString();
      publishedAt = scheduleDate;
    }

    const payload = {
      title,
      slug: finalSlug,
      excerpt: excerpt || title,
      content,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      featuredImageCaption: featuredImageCaption || '',
      category,
      tags: tags || [],
      author,
      status: currentStatus,
      scheduledAt: scheduleDate,
      publishedAt,
      isFeatured: !!isFeatured,
      isTrending: !!isTrending,
      readingTime,
      tableOfContents: toc,
      seo: {
        metaTitle: seo?.metaTitle || title,
        metaDescription: seo?.metaDescription || excerpt || title,
        focusKeywords: seo?.focusKeywords || [],
        canonicalUrl: seo?.canonicalUrl || '',
      },
    };

    if (isMongo()) {
      let existing = await Post.findOne({ slug: finalSlug });
      if (existing) payload.slug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      const post = await Post.create(payload);
      return res.status(201).json({ success: true, data: post });
    }

    const post = storage.createPost(payload);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/posts/admin/:id
// @access  Private (Admin)
exports.updatePost = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      featuredImageCaption,
      category,
      tags,
      author,
      status: postStatus,
      scheduledAt,
      isFeatured,
      isTrending,
      seo,
      tableOfContents,
    } = req.body;

    const payload = {};
    if (title) payload.title = title;
    if (slug) payload.slug = generateSlug(slug);
    if (excerpt !== undefined) payload.excerpt = excerpt;
    if (featuredImage !== undefined) payload.featuredImage = featuredImage;
    if (featuredImageCaption !== undefined) payload.featuredImageCaption = featuredImageCaption;
    if (category) payload.category = category;
    if (tags !== undefined) payload.tags = tags;
    if (author) payload.author = author;
    if (isFeatured !== undefined) payload.isFeatured = isFeatured;
    if (isTrending !== undefined) payload.isTrending = isTrending;

    if (content) {
      payload.content = content;
      payload.readingTime = calculateReadingTime(content);
      payload.tableOfContents = tableOfContents && tableOfContents.length > 0
        ? tableOfContents
        : extractTableOfContents(content);
    } else if (tableOfContents !== undefined) {
      payload.tableOfContents = tableOfContents;
    }

    if (postStatus) {
      payload.status = postStatus;
      if (postStatus === 'scheduled' && scheduledAt) {
        payload.scheduledAt = new Date(scheduledAt).toISOString();
        payload.publishedAt = payload.scheduledAt;
      } else if (postStatus === 'published') {
        payload.publishedAt = new Date().toISOString();
        payload.scheduledAt = null;
      }
    }

    if (seo) payload.seo = seo;

    if (isMongo()) {
      const post = await Post.findByIdAndUpdate(req.params.id, payload, { new: true });
      if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
      return res.status(200).json({ success: true, data: post });
    }

    const post = storage.updatePost(req.params.id, payload);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/posts/admin/:id
// @access  Private (Admin)
exports.deletePost = async (req, res, next) => {
  try {
    if (isMongo()) {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    }

    const deleted = storage.deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin dashboard statistics
// @route   GET /api/posts/admin/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    if (isMongo()) {
      const totalPosts = await Post.countDocuments();
      const publishedPosts = await Post.countDocuments({ status: 'published' });
      const draftPosts = await Post.countDocuments({ status: 'draft' });
      const scheduledPosts = await Post.countDocuments({ status: 'scheduled' });
      const totalCategories = await Category.countDocuments();
      const totalAuthors = await Author.countDocuments();

      const viewsAggregation = await Post.aggregate([
        { $group: { _id: null, totalViews: { $sum: '$views' } } },
      ]);
      const totalViews = viewsAggregation.length > 0 ? viewsAggregation[0].totalViews : 0;

      const recentPosts = await Post.find()
        .populate('category', 'name color')
        .populate('author', 'name avatar')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug status views publishedAt createdAt category author');

      return res.status(200).json({
        success: true,
        data: {
          totalPosts,
          publishedPosts,
          draftPosts,
          scheduledPosts,
          totalCategories,
          totalAuthors,
          totalViews,
          recentPosts,
        },
      });
    }

    const stats = storage.getStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};
