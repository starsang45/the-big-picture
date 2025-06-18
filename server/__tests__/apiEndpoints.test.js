const request = require('supertest');
const app = require('../server.cjs'); // Import the Express app (make sure it's exported from server.cjs)

describe('API Endpoint Tests', () => {
  // Allow longer timeout for NASA API responses
  jest.setTimeout(10000);

  // Test: GET /api/apod/one should return today's APOD
  test('GET /api/apod/one - should return today\'s APOD', async () => {
    const res = await request(app).get('/api/apod/one');

    // Check for success response and expected fields
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('url');
  });

  // Test: GET /api/apod/prev should return a list of previous APODs
  test('GET /api/apod/prev - should return last 10 days of APODs', async () => {
    const res = await request(app).get('/api/apod/prev');

    // Validate response structure and content
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('date');
  });

  // Test: GET /api/quote should return 15 quotes
  test('GET /api/quote - should return 15 quotes', async () => {
    const res = await request(app).get('/api/quote');

    // Ensure quotes array is correct
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(15);
    expect(res.body.data[0]).toHaveProperty('quote');
    expect(res.body.data[0]).toHaveProperty('author');
  });
});
