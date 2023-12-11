const express = require("express");
const User = require("../models/User");
const Store = require("../models/Store");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Buscar el usuario por ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Si el usuario tiene un store asociado, obtener la información del store
    let store = null;
    if (user.store) {
      store = await Store.findById(user.store);
      if (!store) {
        return res.status(404).send("Store no encontrado para este usuario");
      }
    }

    // Devolver el usuario y el store si está presente
    res.json({ user, store });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
