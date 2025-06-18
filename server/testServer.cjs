// server/testServer.cjs

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const nasaController = require('./nasaController.cjs');
const authController = require('./authController.cjs');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to test DB
mongoose.connect('mongodb://localhost:27017/test', {
  dbName: 'test',
});

app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// Protected route middleware
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

app.post('/api/nasa/favorites', requireAuth, nasaController.saveFavorites);

describe('Test Server basic test', () => {
  it('should run this dummy test', () => {
    expect(1).toBe(1);
  });
});

module.exports = app;
