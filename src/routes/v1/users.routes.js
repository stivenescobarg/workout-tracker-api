// src/routes/v1/users.routes.js
const express = require('express');
const router = express.Router();
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/users.controller');
// Importar el controlador de usuarios
const usersController = require('../../controllers/users.controller');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;

