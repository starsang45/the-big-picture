// server/__tests__/favorites.test.js
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../testServer.cjs'); // Import the test server
const Favorite = require('../favoriteModel.cjs');
const NasaAuth = require('../nasaModel.cjs').NasaAuth;

let agent;
let testUserId;

// Clean and set up the test environment before running tests
beforeAll(async () => {
  await mongoose.connection.dropDatabase();

  agent = request.agent(app);

  // Register a new user
  const registerResponse = await agent.post('/register').send({
    username: 'testuser1',
    password: 'testpass',
  });

  // Optional: check if registration succeeded
  if (registerResponse.statusCode !== 200 && registerResponse.statusCode !== 201) {
    throw new Error(`Registration failed with status: ${registerResponse.statusCode}`);
  }

  // Wait briefly to ensure the user is saved in DB
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Find the newly registered user
  const user = await NasaAuth.findOne({ username: 'testuser1' });
  if (!user) {
    throw new Error('Test user not found in DB after registration');
  }

  testUserId = user._id;
});


// Close MongoDB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});


describe('POST /api/nasa/favorites', () => {
  it('should save a favorite and return 201 with data', async () => {
    // Sample favorite data including the user field
    const favoriteData = {
      title: 'Test Title',
      url: 'http://example.com/image.jpg',
      hdurl: 'http://example.com/hd.jpg',
      explanation: 'This is a test explanation',
      date: '2025-06-17',
      media_type: 'image',
      user: testUserId,
    };

    // Send POST request using the same session
    const res = await agent.post('/api/nasa/favorites').send(favoriteData);

    // Assertions
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', favoriteData.title);
    expect(res.body.data).toHaveProperty('url', favoriteData.url);
    expect(res.body.data).toHaveProperty('user', testUserId.toString());
  });
});
