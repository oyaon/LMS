jest.mock('../middleware/auth', () => (roles) => (req, res, next) => {
  req.user = { id: '507f1f77bcf86cd799439011', role: roles[0] || 'member' };
  next();
});

const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

describe('Transaction API', () => {
  let bookId;

  beforeAll(async () => {
    // Create a book to borrow
    const book = new Book({
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
      status: 'available'
    });
    const savedBook = await book.save();
    bookId = savedBook._id.toString();
  });

  afterAll(async () => {
    await Book.deleteMany({});
    await Transaction.deleteMany({});
    await mongoose.connection.close();
  });

  it('should borrow a book successfully', async () => {
    const res = await request(app)
      .post('/api/transactions/borrow')
      .send({ bookId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('bookId', bookId);
    expect(res.body).toHaveProperty('userId');
  });

  it('should fail to borrow a non-available book', async () => {
    // Borrow the book first time
    await request(app).post('/api/transactions/borrow').send({ bookId });

    // Try borrowing again
    const res = await request(app)
      .post('/api/transactions/borrow')
      .send({ bookId });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Book not available');
  });

  it('should return a borrowed book successfully', async () => {
    // Borrow a new book
    const book = new Book({
      title: 'Return Test Book',
      author: 'Return Author',
      isbn: '0987654321',
      status: 'available'
    });
    const savedBook = await book.save();

    // Borrow it
    const borrowRes = await request(app)
      .post('/api/transactions/borrow')
      .send({ bookId: savedBook._id.toString() });

    const transactionId = borrowRes.body._id;

    // Return it
    const returnRes = await request(app)
      .post(`/api/transactions/return/${transactionId}`);

    expect(returnRes.statusCode).toBe(200);
    expect(returnRes.body).toHaveProperty('status');
    expect(['returned', 'overdue']).toContain(returnRes.body.status);
  });

  it('should get user transactions', async () => {
    const res = await request(app).get('/api/transactions/user');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
