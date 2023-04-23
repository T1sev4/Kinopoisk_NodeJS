const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FilmSchema = new mongoose.Schema({
  titleRus: String,
  titleEng: String,
  year: Number,
  time: String,
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  image: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('film', FilmSchema);
