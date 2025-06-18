//if api is unavailble
const request = require('supertest');
const express = require('express');

describe('API Unavailable Tests', () => {
  // Create a mock app without any routes
  const app = express(); // 빈 서버로 구성 (에러 테스트용)

  // Test: Requesting a nonexistent route
  test('GET /nonexistent - should return 404 Not Found', async () => {
    const res = await request(app).get('/nonexistent');

    // Check that the status is 404
    expect(res.statusCode).toBe(404);
    
  });
  });