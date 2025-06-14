const path = require('path');
const express = require('express');
const checknController = require('./controllers/checknController.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('./dist'));
app.use(express.json());