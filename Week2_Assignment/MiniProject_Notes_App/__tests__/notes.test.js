// Models are mocked so tests run without a real MongoDB connection.
// JWT is real, so auth checks and per-user note ownership are actually tested.

process.env.JWT_SECRET = 'test_secret_for_jest_only';
process.env.JWT_EXPIRES_IN = '1h';

jest.mock('../models/Note');
jest.mock('../models/User');
const Note = require('../models/Note');
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const noteRoutes = require('../routes/noteRoutes');

const app = express();
app.use(express.json());
app.use('/api/notes', noteRoutes);

const userAToken = jwt.sign({ id: 'userA' }, process.env.JWT_SECRET, { expiresIn: '1h' });
const userBToken = jwt.sign({ id: 'userB' }, process.env.JWT_SECRET, { expiresIn: '1h' });
const noteId = '507f1f77bcf86cd799439011';

afterEach(() => jest.clearAllMocks());

describe('Auth protection on /api/notes', () => {
  it('rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.status).toBe(401);
  });
});

describe('POST /api/notes', () => {
  it('creates a note owned by the authenticated user', async () => {
    Note.create.mockImplementation(async (data) => ({ _id: noteId, ...data }));
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'My note', content: 'hello' });
    expect(res.status).toBe(201);
    expect(Note.create).toHaveBeenCalledWith(expect.objectContaining({ user: 'userA' }));
  });
});

describe('GET /api/notes/:id — ownership isolation', () => {
  it('allows the owner to access their note', async () => {
    Note.findById.mockResolvedValue({ _id: noteId, title: 'Mine', user: { toString: () => 'userA' } });
    const res = await request(app).get(`/api/notes/${noteId}`).set('Authorization', `Bearer ${userAToken}`);
    expect(res.status).toBe(200);
  });

  it('blocks a different user from accessing the note (403)', async () => {
    Note.findById.mockResolvedValue({ _id: noteId, title: 'Mine', user: { toString: () => 'userA' } });
    const res = await request(app).get(`/api/notes/${noteId}`).set('Authorization', `Bearer ${userBToken}`);
    expect(res.status).toBe(403);
  });

  it('returns 404 for a nonexistent note', async () => {
    Note.findById.mockResolvedValue(null);
    const res = await request(app).get(`/api/notes/${noteId}`).set('Authorization', `Bearer ${userAToken}`);
    expect(res.status).toBe(404);
  });
});

describe('PUT /api/notes/:id — ownership isolation', () => {
  it('blocks a different user from updating the note (403)', async () => {
    Note.findById.mockResolvedValue({ _id: noteId, title: 'Mine', user: { toString: () => 'userA' } });
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${userBToken}`)
      .send({ title: 'Hacked' });
    expect(res.status).toBe(403);
  });
});

describe('DELETE /api/notes/:id — ownership isolation', () => {
  it('blocks a different user from deleting the note (403)', async () => {
    Note.findById.mockResolvedValue({
      _id: noteId,
      title: 'Mine',
      user: { toString: () => 'userA' },
      deleteOne: jest.fn()
    });
    const res = await request(app).delete(`/api/notes/${noteId}`).set('Authorization', `Bearer ${userBToken}`);
    expect(res.status).toBe(403);
  });

  it('allows the owner to delete the note', async () => {
    const deleteOne = jest.fn().mockResolvedValue({});
    Note.findById.mockResolvedValue({ _id: noteId, title: 'Mine', user: { toString: () => 'userA' }, deleteOne });
    const res = await request(app).delete(`/api/notes/${noteId}`).set('Authorization', `Bearer ${userAToken}`);
    expect(res.status).toBe(200);
    expect(deleteOne).toHaveBeenCalled();
  });
});
