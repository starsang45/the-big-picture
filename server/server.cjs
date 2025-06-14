const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const nasaController = require('./nasaController.cjs');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));
app.use(express.json());



console.log('nasaController:', nasaController);
console.log('getImageOfDay:', typeof nasaController.getImageOfDay);

app.get('/api/nasa/apod', nasaController.getImageOfDay, (req, res) =>
  res.status(200).json({
    log:'Nasa data fetch succesfully',
    data: res.locals.nasaData
  })
);





//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
