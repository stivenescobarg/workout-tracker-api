const express = require('express');
const router = express.Router();

// Importar el controlador de registros de entrenamiento
const registroEntrenamientoController = require('../../controllers/registroEntrenamiento.controller');

router.get('/', registroEntrenamientoController.getAllRegistros);
router.get('/:id', registroEntrenamientoController.getRegistroById);
router.post('/', registroEntrenamientoController.createRegistro);
router.put('/:id', registroEntrenamientoController.updateRegistro);
router.delete('/:id', registroEntrenamientoController.deleteRegistro);

module.exports = router;