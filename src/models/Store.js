// models/Store.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  img: String, // Puedes cambiar el tipo de dato según tus necesidades (por ejemplo, Buffer para imágenes)
  horario: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bag' }],
});

module.exports = mongoose.model('Store', storeSchema);
