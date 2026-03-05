// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tu_basededatos";

// Configuración de middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173", // Cambia a tu URL de frontend
    credentials: true,
  })
);

// Configuración de rutas
const authRoutes = require("./src/routes/auth");
const storeRoutes = require("./src/routes/stores");
const userRoutes = require("./src/routes/users");
const bagRoutes = require("./src/routes/bags");
// ... otras rutas

// Conexión a la base de datos MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

// Rutas
app.use("/auth", authRoutes);
app.use("/stores", storeRoutes);
app.use("/user", userRoutes);
// ... otras rutas

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Estado del servidor: OK")
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
