const mongoose = require("mongoose");

const showsSchema = new mongoose.Schema({
  movie_id: { type: String, required: true },
  theatre_id: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seatsavail: { type: Number, required: true },
  seatsbooked: { type: Number, default: 0 },
});

module.exports = mongoose.model("Show", showsSchema);
