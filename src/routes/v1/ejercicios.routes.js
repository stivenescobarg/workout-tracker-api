const express = require('express');
const router = express.Router();
const{
    getAllEjercicios,
    getEjercicioById,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio
} = require('../../controllers/ejercicios.controller');
// Importar el controlador de ejercicios    
const ejerciciosController = require('../../controllers/ejercicios.controller');

router.get('/', ejerciciosController.getAllEjercicios);
router.get('/:id', ejerciciosController.getEjercicioById);
router.post('/', ejerciciosController.createEjercicio);
router.put('/:id', ejerciciosController.updateEjercicio);
router.delete('/:id', ejerciciosController.deleteEjercicio);

module.exports = router;
