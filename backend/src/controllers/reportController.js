const Transaction = require('../models/Transaction');

exports.getMostBorrowedBooks = async (req, res) => {
  try {
    const mostBorrowed = await Transaction.aggregate([
      {
        $group: {
          _id: '$bookId',
          borrowCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book'
        }
      },
      {
        $unwind: '$book'
      },
      {
        $project: {
          title: '$book.title',
          author: '$book.author',
          isbn: '$book.isbn',
          borrowCount: 1
        }
      },
      {
        $sort: { borrowCount: -1 }
      },
      {
        $limit: 10 // Top 10 most borrowed books
      }
    ]);

    res.json(mostBorrowed);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await Transaction.find({
      status: 'active',
      dueDate: { $lt: new Date() }
    })
      .populate('bookId', 'title author isbn')
      .populate('userId', 'name email');

    res.json(overdueBooks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const User = require('../models/User');
    const Book = require('../models/Book');
    const Transaction = require('../models/Transaction');
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const activeLoans = await Transaction.countDocuments({ status: 'active' });
    const overdueBooks = await Transaction.countDocuments({ status: 'overdue' });
    res.json({
      totalUsers,
      totalBooks,
      activeLoans,
      overdueBooks
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};