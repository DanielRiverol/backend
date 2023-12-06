// models/Bag.js
const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model('Bag', bagSchema);
