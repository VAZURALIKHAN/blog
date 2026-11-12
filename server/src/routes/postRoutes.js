const express = require('express');
const router = express.Router();
const {
  getPosts,
  getFeaturedPosts,
  getTrendingPosts,
  getPostBySlug,
  getAdminPosts,
  getAdminPostById,
  createPost,
  updatePost,
  deletePost,
  getDashboardStats,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getPosts);
router.get('/featured', getFeaturedPosts);
router.get('/trending', getTrendingPosts);
router.get('/slug/:slug', getPostBySlug);

// Admin routes
router.get('/admin/stats', protect, getDashboardStats);
router.get('/admin/all', protect, getAdminPosts);
router.get('/admin/:id', protect, getAdminPostById);
router.post('/admin', protect, createPost);
router.put('/admin/:id', protect, updatePost);
router.delete('/admin/:id', protect, deletePost);

module.exports = router;
