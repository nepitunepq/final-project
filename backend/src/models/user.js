const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 }, // Track user scores
});

module.exports = mongoose.model('User', userSchema);
