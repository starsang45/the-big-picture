//quoteController.cjs

const quotes = require('../quotes.cjs'); // import from quotes.cjs 

const getQuotes = (req, res, next) => {
  res.locals.quotes = quotes;
  return next();
};

module.exports = { getQuotes };
