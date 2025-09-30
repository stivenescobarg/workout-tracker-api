const express = require('express');
const router = express.Router();

// Estado de memoria (simulación de base de datos)
let users = [
  {
    id: "1",
    nombre: "stiven Escobar",
    email: "stivenescobar240208@gmail.com",
    contraseña_hash: "123456SEG",
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18",
    estatura_cm: 175,
    peso_kg: 72,
    fecha_nacimient:"2008-02-24",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

// GET /api/v1/users
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);
});

module.exports = router;

