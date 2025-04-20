const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
];

const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// Controller to fetch all books
exports.getBooks = async (req, res) => {
  const { search, genre } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ]
    };
  }

  if (genre) {
    query.genre = genre;
  }

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to search books
async function searchBooks(req, res) {
    try {
        const { query } = req.query;
        const books = await Book.find({ title: { $regex: query, $options: 'i' } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error searching books' });
    }
}

// Function to add a book
async function addBook(req, res) {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
}

// Function to update a book
async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
}

// Function to delete a book
async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
}

module.exports = { searchBooks, addBook, updateBook, deleteBook };

exports.addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, isbn, genre, publicationDate } = req.body;

  try {
    let book = await Book.findOne({ isbn });
    if (book) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    book = new Book({ title, author, isbn, genre, publicationDate });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, isbn, genre, publicationDate, status } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, isbn, genre, publicationDate, status },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// filepath: src/routes/bookRoutes.js
const express = require('express');
const { getBooks } = require('../controllers/bookcontroller'); // Updated to match actual file casing); // Updated to consistent casing
const router = express.Router();

router.get('/', getBooks);

module.exports = router;

// filepath: src/seed.js
const mongoose = require('mongoose');
const Book = require('./models/Book');
const { getBooks } = require('../routes/books');

mongoose
  .connect('mongodb://localhost:27017/lms', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Book.deleteMany(); // Clear existing data
    await Book.insertMany([
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ]);
    console.log('Database seeded');
    mongoose.connection.close();
  })
  .catch((err) => console.error('Failed to seed database', err));