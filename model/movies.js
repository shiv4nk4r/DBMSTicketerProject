const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  releasedate: {
    type: Date,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  descritpion: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movies", movieSchema);
