const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Issue = require('../models/Issue');

beforeAll(async () => {
  const mongoURI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/bugtracker_test';
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Issue.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Bug Tracker API', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/issues')
      .send({ title: 'Bug 1', description: 'First bug' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Bug 1');
    expect(res.body.status).toBe('open');
  });

  it('should fetch list of bugs (empty at start)', async () => {
    const res = await request(app).get('/api/issues');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  // more tests: update status, delete, error cases, invalid input, etc.
});
