const express = require("express");
const router = express.Router();

// Importar las rutas de usuarios
const usersRoutes = require('./users.routes');
const ejerciciosRoutes = require('./ejercicios.routes');

//Configurar las rutas

router.use('/users', usersRoutes);
router.use('/ejercicios', ejerciciosRoutes);
module.exports = router;