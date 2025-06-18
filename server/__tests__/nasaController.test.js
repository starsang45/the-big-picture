const request = require('supertest');       // Import Supertest for HTTP request testing
const app = require('../server.cjs');       // Import the Express app from your server

// Group of tests for the NASA APOD endpoint
describe('NASA APOD API', () => {

  // Individual test for the /api/nasa/one route
  it('GET /api/nasa/one ➜ should return status 200 and include expected fields', async () => {

    // Send GET request to the correct NASA route
    const res = await request(app).get('/api/nasa/one');

    // Expect status code to be 200 (OK)
    expect(res.statusCode).toBe(200);

    // Expect response to have a `data` object with NASA APOD fields
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('url');
    expect(res.body.data).toHaveProperty('explanation');
  });

});
