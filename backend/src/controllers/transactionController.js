const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const sendEmail = require('../utils/email');
const logActivity = require('../utils/activityLog');

exports.borrowBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bookId } = req.body;
  const userId = req.user.id;

  try {
    const book = await Book.findById(bookId);
    if (!book || book.status !== 'available') {
      return res.status(400).json({ message: 'Book not available' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks loan period

    const transaction = new Transaction({
      userId,
      bookId,
      dueDate
    });

    book.status = 'borrowed';
    await book.save();
    await transaction.save();

    // Send email notification to the user
    const user = req.user; // Assuming req.user contains the user details
    await sendEmail(
      user.email,
      'Book Borrowed',
      `You have borrowed "${book.title}". Due date: ${transaction.dueDate.toDateString()}`
    );
    await logActivity(userId, 'borrowBook', `Borrowed book: ${book.title}`);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.status !== 'active') {
      return res.status(400).json({ message: 'Invalid transaction' });
    }

    const book = await Book.findById(transaction.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const returnDate = new Date();
    transaction.returnDate = returnDate;
    transaction.status = 'returned';

    if (returnDate > transaction.dueDate) {
      const daysOverdue = Math.ceil(
        (returnDate - transaction.dueDate) / (1000 * 60 * 60 * 24)
      );
      transaction.fine = daysOverdue * 1; // $1 per day
      transaction.status = 'overdue';
    }

    book.status = 'available';
    await book.save();
    await transaction.save();

    await logActivity(req.user.id, 'returnBook', `Returned book: ${book.title}`);
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .populate('bookId', 'title author isbn');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to view borrowing history
async function viewHistory(req, res) {
    try {
        const { userId } = req.params;
        const history = await Transaction.find({ userId }).populate('bookId');
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching borrowing history' });
    }
}

// Function to track fines
async function trackFines(req, res) {
    try {
        const fines = await Transaction.aggregate([
            { $match: { returned: false, dueDate: { $lt: new Date() } } },
            { $project: { userId: 1, fine: { $multiply: [{ $subtract: [new Date(), '$dueDate'] }, 0.5] } } }
        ]);
        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ error: 'Error tracking fines' });
    }
}

module.exports = { viewHistory, trackFines };