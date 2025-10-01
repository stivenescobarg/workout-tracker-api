const express = require('express');
const router = express.Router();

// Importar el controlador de sesiones programadas
const sesionProgramadaController = require('../../controllers/sesionProgramada.controller');

router.get('/', sesionProgramadaController.getAllSesiones);
router.get('/:id', sesionProgramadaController.getSesionById);
router.post('/', sesionProgramadaController.createSesion);
router.put('/:id', sesionProgramadaController.updateSesion);
router.delete('/:id', sesionProgramadaController.deleteSesion);

module.exports = router;