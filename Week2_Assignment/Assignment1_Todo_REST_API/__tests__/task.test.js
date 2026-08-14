// Task model is mocked here so these tests can run without a real MongoDB connection.
// They check routes, status codes and validation - not actual DB persistence.

jest.mock('../models/Task');
const Task = require('../models/Task');
const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/taskRoutes');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const fakeId = '507f1f77bcf86cd799439011';

afterEach(() => jest.clearAllMocks());

describe('POST /api/tasks', () => {
  it('creates a task and returns 201', async () => {
    Task.create.mockResolvedValue({ _id: fakeId, title: 'Buy milk', description: '', completed: false });
    const res = await request(app).post('/api/tasks').send({ title: 'Buy milk' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Buy milk');
  });

  it('rejects missing title with 400', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/tasks', () => {
  it('returns list of tasks', async () => {
    Task.find.mockReturnValue({ sort: jest.fn().mockResolvedValue([{ title: 'A' }, { title: 'B' }]) });
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns 400 for invalid id', async () => {
    const res = await request(app).get('/api/tasks/not-an-id');
    expect(res.status).toBe(400);
  });

  it('returns 404 when task not found', async () => {
    Task.findById.mockResolvedValue(null);
    const res = await request(app).get(`/api/tasks/${fakeId}`);
    expect(res.status).toBe(404);
  });

  it('returns 200 when task found', async () => {
    Task.findById.mockResolvedValue({ _id: fakeId, title: 'Found' });
    const res = await request(app).get(`/api/tasks/${fakeId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Found');
  });
});

describe('PUT /api/tasks/:id', () => {
  it('returns 400 for invalid id', async () => {
    const res = await request(app).put('/api/tasks/bad-id').send({ title: 'x' });
    expect(res.status).toBe(400);
  });

  it('returns 404 when task not found', async () => {
    Task.findByIdAndUpdate.mockResolvedValue(null);
    const res = await request(app).put(`/api/tasks/${fakeId}`).send({ title: 'Updated' });
    expect(res.status).toBe(404);
  });

  it('updates and returns 200', async () => {
    Task.findByIdAndUpdate.mockResolvedValue({ _id: fakeId, title: 'Updated' });
    const res = await request(app).put(`/api/tasks/${fakeId}`).send({ title: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated');
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('returns 400 for invalid id', async () => {
    const res = await request(app).delete('/api/tasks/bad-id');
    expect(res.status).toBe(400);
  });

  it('returns 404 when task not found', async () => {
    Task.findByIdAndDelete.mockResolvedValue(null);
    const res = await request(app).delete(`/api/tasks/${fakeId}`);
    expect(res.status).toBe(404);
  });

  it('deletes and returns 200', async () => {
    Task.findByIdAndDelete.mockResolvedValue({ _id: fakeId });
    const res = await request(app).delete(`/api/tasks/${fakeId}`);
    expect(res.status).toBe(200);
  });
});
