// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const secret= process.env.JWT_SECRET || "tu_secreto"
// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType || 'comerciante',
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {

  try {
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Contraseña incorrecta');
    }
    // Generar token JWT
    const token = jwt.sign({ _id: user._id }, secret);
    
    //res.header('Authorization', `Bearer ${token}`).send(token);
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

// Cambiar la contraseña
router.post('/change-password', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).send('Contraseña anterior incorrecta');
    }

    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedNewPassword;
    
    await user.save();
    res.status(200).send('Contraseña modificada exitosamente');
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
