// server/favoriteModel.cjs
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  title: String,
  url: String,
  hdurl: String,
  explanation: String,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NasaAuth',
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
