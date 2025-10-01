const express = require("express");
const router = express.Router();

// Importar las rutas de usuarios
const usersRoutes = require('./users.routes');
const ejerciciosRoutes = require('./ejercicios.routes');
const planEntrenamientoRoutes = require('./planEntrenamiento.routes');
const elementoPlanRoutes = require('./elementoPlan.routes');
const sesionProgramadaRoutes = require('./sesionProgramada.routes');
const registroEntrenamientoRoutes = require('./registroEntrenamiento.routers');
const reporteRoutes = require('./reporte.routes');

//Configurar las rutas

router.use('/users', usersRoutes);
router.use('/ejercicios', ejerciciosRoutes);
router.use('/plan-entrenamiento', planEntrenamientoRoutes);
router.use('/elemento-plan', elementoPlanRoutes);
router.use('/sesion-programada', sesionProgramadaRoutes);
router.use('/registro-entrenamiento', registroEntrenamientoRoutes);
router.use('/reportes', reporteRoutes);

module.exports = router;