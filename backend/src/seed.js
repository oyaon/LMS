const mongoose = require('mongoose');
const Book = require('./models/Book');

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/lms')
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany();
    console.log('Existing books cleared');

    // Insert sample data
    await Book.insertMany([
      { title: 'Book 1', author: 'Author 1', isbn: '978-3-16-148410-0' },
      { title: 'Book 2', author: 'Author 2', isbn: '978-1-23-456789-7' },
      { title: 'Book 3', author: 'Author 3', isbn: '978-0-12-345678-9' },
    ]);
    console.log('Sample books added');

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  })
  .catch((err) => {
    console.error('Failed to seed database', err);
    mongoose.connection.close();
  });