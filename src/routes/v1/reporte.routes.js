const express = require('express');
const router = express.Router();

// Importar el controlador de reportes
const reporteController = require('../../controllers/reporte.controller');

router.get('/', reporteController.getAllReportes);
router.get('/:id', reporteController.getReporteById);
router.post('/', reporteController.createReporte);
router.put('/:id', reporteController.updateReporte);
router.delete('/:id', reporteController.deleteReporte);

module.exports = router;