// server/__tests__/favorites.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server.cjs'); // Express app
const Favorite = require('../favoriteModel.cjs');

describe('Test Server basic test', () => {
  beforeAll(async () => {
    // Connect to the MongoDB test database
    // await mongoose.connect('mongodb://localhost:27017/nasatest');
    // Clean up favorites before each run
    await Favorite.deleteMany({});
  });

  afterAll(async () => {
    // Close the DB connection after all tests
    await mongoose.connection.close();
  });

  it('should run this dummy test', async () => {
    expect(true).toBe(true);
  });

  it('should save a favorite and return 201 with data', async () => {
    const response = await request(app)
      .post('/api/nasa/favorites')
      .send({
        title: 'Sample Image',
        url: 'https://example.com/image.jpg',
        explanation: 'A sample NASA image',
        date: '2023-01-01',
        media_type: 'image',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Sample Image');
  });
});
