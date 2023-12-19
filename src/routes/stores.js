const express = require("express");
const session = require("express-session");
const router = express.Router();
const Store = require("../models/Store");
const User = require("../models/User");

// Configura express-session
router.use(
  session({
    secret: process.env.JWT_SECRET || "tu_secreto_aqui",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambia a true si estás usando HTTPS
  })
);


router.post("/", async (req, res) => {
  try {
    const userId = req.session.userId;
console.log(userId);
    // Crear el nuevo store
    const newStore = new Store({
      ...req.body,
      user: userId,
    });

    // Asociar el store con el usuario
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { store: newStore._id } },
      { new: true }
    );

    // Guardar el store y el usuario actualizado
    await newStore.save();

    res.status(201).json(newStore);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Otras rutas para obtener todos los stores, etc.
router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.localidad) {
      query.localidad = { $regex: new RegExp(req.query.localidad, "i") };
    }

    const stores = await Store.find(query);
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Obtener todos los comercios con opción de filtrar por zona y/o tipo de bolsa
router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.zone) {
      query.address = { $regex: new RegExp(req.query.zone, "i") };
    }

    if (req.query.bagType) {
      query["bags.bagType"] = req.query.bagType;
    }

    const stores = await Store.find(query);
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Obtener un comercio específico por ID con opción de filtrar por nombre de producto
router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).send("Comercio no encontrado");
    }

    if (req.query.bagType) {
      const bags = store.bags.filter(
        (bag) => bag.bagType === req.query.bagType
      );
      return res.json({ store, bags });
    }

    res.json(store);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Actualizar un comercio por ID
router.put("/:id", async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStore) {
      return res.status(404).send("Comercio no encontrado");
    }
    res.json(updatedStore);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Eliminar un comercio por ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) {
      return res.status(404).send("Comercio no encontrado");
    }
    res.json(deletedStore);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
