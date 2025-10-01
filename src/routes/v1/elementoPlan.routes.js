const express = require('express');
const router = express.Router();

// Importar el controlador de elementos del plan
const elementoPlanController = require('../../controllers/elementoPlan.controller');

router.get('/', elementoPlanController.getAllElementos);
router.get('/:id', elementoPlanController.getElementoById);
router.post('/', elementoPlanController.createElemento);
router.put('/:id', elementoPlanController.updateElemento);
router.delete('/:id', elementoPlanController.deleteElemento);

module.exports = router;