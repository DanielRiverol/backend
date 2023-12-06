// models/Store.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  userType: { type: String, enum: ['comerciante'], default: 'comerciante' },
});

module.exports = mongoose.model('Store', storeSchema);
