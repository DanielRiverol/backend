// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userType: { type: String, enum: ['cliente', 'comerciante'], default: 'cliente' },
});

module.exports = mongoose.model('User', userSchema);
