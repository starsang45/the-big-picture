const express = require('express');
const path = require('path');
const nasaController = require('./nasaController.cjs');
const quoteController = require('./quoteController.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. one
app.get('/api/apod/one', nasaController.getImageOfDay, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Today\'s NASA APOD fetched successfully',
    data: res.locals.nasaData
  });
});

// 2. prev
app.get('/api/apod/prev', nasaController.getApodLast10Days, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Last 10 days of NASA APODs fetched successfully',
    data: res.locals.apodArray
  });
});

// 3. quote
app.get('/api/quote', quoteController.getQuotes, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Quotes fetched successfully',
    data: res.locals.quotes
  });
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
module.exports = app;
