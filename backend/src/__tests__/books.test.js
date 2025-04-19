// jest.mock must be the very first line to ensure the mock is in effect before any imports
jest.mock('../middleware/auth', () => (roles) => (req, res, next) => {
  req.user = { role: roles[0] || 'admin' };
  next();
});

const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

describe('Books API', () => {
  let token;

  beforeAll(async () => {
    // Register an admin user and get token
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });

    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should add a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890',
        genre: 'Fiction'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Book');
  });

  it('should get all books', async () => {
    await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Another Book',
        author: 'Another Author',
        isbn: '0987654321'
      });

    const res = await request(app).get('/api/books');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});