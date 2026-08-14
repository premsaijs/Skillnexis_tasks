// User model is mocked so tests run without a real MongoDB connection.
// bcrypt and JWT are NOT mocked - hashing and token logic is tested for real.

process.env.JWT_SECRET = 'test_secret_for_jest_only';
process.env.JWT_EXPIRES_IN = '1h';

jest.mock('../models/User');
const User = require('../models/User');
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

afterEach(() => jest.clearAllMocks());

describe('POST /api/auth/register', () => {
  it('rejects missing fields with 400', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'a@a.com' });
    expect(res.status).toBe(400);
  });

  it('rejects short passwords with 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'A', email: 'a@a.com', password: '123' });
    expect(res.status).toBe(400);
  });

  it('rejects duplicate email with 409', async () => {
    User.findOne.mockResolvedValue({ email: 'dupe@a.com' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'A', email: 'dupe@a.com', password: 'password123' });
    expect(res.status).toBe(409);
  });

  it('registers a new user, hashes password, and returns a JWT', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockImplementation(async (data) => ({ _id: 'u1', ...data }));

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.data.email).toBe('alice@example.com');
    // Password must never be echoed back
    expect(res.body.data.password).toBeUndefined();

    // Confirm the password that was persisted is actually bcrypt-hashed, not plaintext
    const createdArg = User.create.mock.calls[0][0];
    expect(createdArg.password).not.toBe('password123');
    const isHashValid = await bcrypt.compare('password123', createdArg.password);
    expect(isHashValid).toBe(true);

    // Confirm the returned token is a valid, verifiable JWT
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded.id).toBe('u1');
  });
});

describe('POST /api/auth/login', () => {
  it('rejects missing fields with 400', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });

  it('rejects unknown email with 401', async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });
    const res = await request(app).post('/api/auth/login').send({ email: 'x@a.com', password: 'password123' });
    expect(res.status).toBe(401);
  });

  it('rejects wrong password with 401', async () => {
    const hashed = await bcrypt.hash('correctpassword', 10);
    User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: 'u1', email: 'x@a.com', password: hashed })
    });
    const res = await request(app).post('/api/auth/login').send({ email: 'x@a.com', password: 'wrongpassword' });
    expect(res.status).toBe(401);
  });

  it('logs in successfully and returns a valid JWT', async () => {
    const hashed = await bcrypt.hash('correctpassword', 10);
    User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: 'u1', name: 'Alice', email: 'x@a.com', password: hashed })
    });
    const res = await request(app).post('/api/auth/login').send({ email: 'x@a.com', password: 'correctpassword' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded.id).toBe('u1');
  });
});

describe('GET /api/auth/profile (protected)', () => {
  it('rejects requests with no token (401)', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  it('rejects requests with an invalid token (401)', async () => {
    const res = await request(app).get('/api/auth/profile').set('Authorization', 'Bearer not-a-real-token');
    expect(res.status).toBe(401);
  });

  it('rejects requests with an expired token (401)', async () => {
    const expiredToken = jwt.sign({ id: 'u1' }, process.env.JWT_SECRET, { expiresIn: -10 });
    const res = await request(app).get('/api/auth/profile').set('Authorization', `Bearer ${expiredToken}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/expired/i);
  });

  it('allows access with a valid token', async () => {
    const validToken = jwt.sign({ id: 'u1' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    User.findById.mockResolvedValue({ _id: 'u1', name: 'Alice', email: 'x@a.com' });
    const res = await request(app).get('/api/auth/profile').set('Authorization', `Bearer ${validToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('x@a.com');
  });
});
