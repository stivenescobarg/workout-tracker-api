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
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// GET /api/v1/users/:id

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);
});

// POST /api/v1/users

router.post('/', (req, res) => {
  const { nombre, email, contraseña_hash, fecha_creacion,fecha_actualizacion, estatura_cm, peso_kg, fecha_nacimient, role } = req.body;   // 1

  if (!nombre || !email) {   // 2
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  const newUser = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    nombre,
    email,
    contraseña_hash: contraseña_hash || null,
    fecha_creacion: fecha_creacion || new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString(),
    estatura_cm: estatura_cm || null,
    peso_kg: peso_kg || null,
    fecha_nacimient: fecha_nacimient || null,
    role: role || 'user',  // valor por defecto si no envían rol
    createdAt: new Date().toISOString()
  };

  users.push(newUser);   // 4

  res.status(201).json(newUser);   // 5
});

// PUT /users/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;              // 1
  const { nombre, email, role, peso_kg } = req.body; // 2

  const index = users.findIndex(u => u.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (!nombre || !email) {                  // 5
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  users[index] = {                        // 6
    ...users[index], // conserva los datos previos
    nombre,
    email,
    fecha_actualizacion: new Date().toISOString(),
    peso_kg: peso_kg || users[index].peso_kg, // solo actualiza si envían peso
    role
  };

  res.status(200).json(users[index]);     // 7
});



module.exports = router;

