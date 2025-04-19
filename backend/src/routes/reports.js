const express = require('express');
const auth = require('../middleware/auth');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.get('/most-borrowed', auth(['admin', 'librarian']), reportController.getMostBorrowedBooks);
router.get('/overdue', auth(['admin', 'librarian']), reportController.getOverdueBooks);

module.exports = router;