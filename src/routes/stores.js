// routes/stores.js
const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
//const Product = require('../models/Product');

// Obtener todos los comercios con opción de filtrar por nombre de producto y/o zona
router.get('/', async (req, res) => {
  try {
    let query = {};

    if (req.query.product) {
      const product = await Product.findOne({ name: req.query.product });
      if (product) {
        query._id = product.storeId;
      } else {
        return res.status(404).send('Producto no encontrado');
      }
    }

    if (req.query.zone) {
      query.zone = req.query.zone;
    }

    const stores = await Store.find(query);
    res.json(stores);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener un comercio específico por ID con opción de filtrar por nombre de producto
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).send('Comercio no encontrado');
    }

    if (req.query.product) {
      const product = await Product.findOne({ name: req.query.product, storeId: store._id });
      if (product) {
        return res.json({ store, product });
      } else {
        return res.status(404).send('Producto no encontrado en este comercio');
      }
    }

    res.json(store);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Crear un nuevo comercio
router.post('/', async (req, res) => {
  try {
    const newStore = new Store(req.body);
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un comercio por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStore) {
      return res.status(404).send('Comercio no encontrado');
    }
    res.json(updatedStore);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Eliminar un comercio por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) {
      return res.status(404).send('Comercio no encontrado');
    }
    res.json(deletedStore);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
