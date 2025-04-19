const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post(
  '/borrow',
  [auth(['member']), check('bookId', 'Book ID is required').isMongoId()],
  transactionController.borrowBook
);

router.post('/return/:id', auth(['member']), transactionController.returnBook);

router.get('/user', auth(['member']), transactionController.getUserTransactions);

module.exports = router;