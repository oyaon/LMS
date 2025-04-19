const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const bookController = require('../controllers/bookcontroller');

const router = express.Router();

router.get('/', bookController.getBooks);

router.post(
  '/',
  [
    auth(['admin', 'librarian']),
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('isbn', 'ISBN is required').not().isEmpty()
  ],
  bookController.addBook
);

router.put(
  '/:id',
  [
    auth(['admin', 'librarian']),
    check('title', 'Title is required').optional().not().isEmpty(),
    check('author', 'Author is required').optional().not().isEmpty(),
    check('isbn', 'ISBN is required').optional().not().isEmpty()
  ],
  bookController.updateBook
);

router.delete('/:id', auth(['admin', 'librarian']), bookController.deleteBook);

module.exports = router;
