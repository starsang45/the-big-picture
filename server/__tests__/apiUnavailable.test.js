//if api is unavailble
const request = require('supertest');
const express = require('express');

describe('API Unavailable Tests', () => {
  // Create a mock app without any routes
  const app = express(); // empty server(for test)

  // Test: Requesting a nonexistent route
  test('GET /nonexistent - should return 404 Not Found', async () => {
    const res = await request(app).get('/nonexistent');

    // Check that the status is 404
    expect(res.statusCode).toBe(404);
    
  });
  });