jest.mock('../middleware/auth', () => (roles) => (req, res, next) => {
  req.user = { role: roles[0] || 'admin' };
  next();
});

const request = require('supertest');
const app = require('../index');

describe('Report API', () => {
  it('should get most borrowed books', async () => {
    const res = await request(app)
      .get('/api/reports/most-borrowed')
      .set('Authorization', 'Bearer faketoken');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get overdue books', async () => {
    const res = await request(app)
      .get('/api/reports/overdue')
      .set('Authorization', 'Bearer faketoken');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
