const express = require('express');
const router = express.Router();

// Importar el controlador de planes de entrenamiento
const planEntrenamientoController = require('../../controllers/planEntrenamiento.controller');

router.get('/', planEntrenamientoController.getAllPlanes);
router.get('/:id', planEntrenamientoController.getPlanById);
router.post('/', planEntrenamientoController.createPlan);
router.put('/:id', planEntrenamientoController.updatePlan);
router.patch('/:id', planEntrenamientoController.patchPlan);
router.delete('/:id', planEntrenamientoController.deletePlan);

module.exports = router;