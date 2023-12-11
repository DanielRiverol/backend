// models/Store.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  localidad: String, // Nuevo campo para localidad
  phone: String,
  img: String,
  horario: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bag' }],
});

module.exports = mongoose.model('Store', storeSchema);
