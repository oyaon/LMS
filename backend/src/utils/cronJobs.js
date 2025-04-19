const cron = require('node-cron');
const Transaction = require('../models/Transaction');
const sendEmail = require('./email');

const checkOverdueBooks = async () => {
  try {
    const overdueTransactions = await Transaction.find({
      status: 'active',
      dueDate: { $lt: new Date() }
    })
      .populate('userId', 'email name')
      .populate('bookId', 'title');

    for (const transaction of overdueTransactions) {
      const daysOverdue = Math.ceil(
        (new Date() - transaction.dueDate) / (1000 * 60 * 60 * 24)
      );
      const fine = daysOverdue * 1; // $1 per day

      await sendEmail(
        transaction.userId.email,
        'Overdue Book Reminder',
        `Dear ${transaction.userId.name},\n\nThe book "${transaction.bookId.title}" is overdue by ${daysOverdue} day(s). Please return it as soon as possible. Current fine: $${fine}.\n\nThank you,\nLibrary Management System`
      );

      transaction.status = 'overdue';
      transaction.fine = fine;
      await transaction.save();
    }

    console.log('Overdue notifications sent:', overdueTransactions.length);
  } catch (err) {
    console.error('Error in overdue cron job:', err);
  }
};

// Schedule to run daily at midnight
cron.schedule('0 0 * * *', checkOverdueBooks);

module.exports = { checkOverdueBooks };