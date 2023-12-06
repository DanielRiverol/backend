// routes/bags.js
const express = require('express');
const router = express.Router();
const Bag = require('../models/Bag');

// Obtener todas las bolsas
router.get('/', async (req, res) => {
  try {
    const bags = await Bag.find();
    res.json(bags);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener una bolsa específica por ID
router.get('/:id', async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);
    if (!bag) {
      return res.status(404).send('Bolsa no encontrada');
    }
    res.json(bag);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Crear una nueva bolsa
router.post('/', async (req, res) => {
  try {
    const newBag = new Bag(req.body);
    await newBag.save();
    res.status(201).json(newBag);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una bolsa por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBag = await Bag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBag) {
      return res.status(404).send('Bolsa no encontrada');
    }
    res.json(updatedBag);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Eliminar una bolsa por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBag = await Bag.findByIdAndDelete(req.params.id);
    if (!deletedBag) {
      return res.status(404).send('Bolsa no encontrada');
    }
    res.json(deletedBag);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
