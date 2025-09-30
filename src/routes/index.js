const express = require('express');
const router = express.Router();

// importar versiones de rutas
const v1Routes = require('./v1');

// Ruta base para información de la API
router.get('/', (req, res) => {
  res.json({ 
    message: 'Workout Tracker API',
    version: ['v1'],
    endpoints: {
        v1: '/api/v1'
    }
  });
});

router.use('/v1', v1Routes);

module.exports = router;