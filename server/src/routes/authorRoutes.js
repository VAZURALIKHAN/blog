const express = require('express');
const router = express.Router();
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getAuthors)
  .post(protect, createAuthor);

router.route('/:id')
  .get(getAuthorById)
  .put(protect, updateAuthor)
  .delete(protect, deleteAuthor);

module.exports = router;
