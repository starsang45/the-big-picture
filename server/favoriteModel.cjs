// server/favoriteModel.cjs
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  title: String,
  url: String,
  hdurl: String,
  explanation: String,
  date: String,
    /* 
     The user field is now OPTIONAL.
     If a user is logged in, we store the user’s ObjectId.
     If no user is logged in (demo / public save), this can be null or undefined.
  */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NasaAuth',
    // required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,          // timestamp of when the favorite was saved
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
