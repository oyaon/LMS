const express = require('express');
const router = express.Router();

// Mock data for now
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
];

// GET /api/books - Fetch all books
router.get('/', (req, res) => {
  res.json(books);
});

module.exports = router;