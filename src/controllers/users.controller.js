// src/controllers/users.controller.js
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
    fecha_nacimient: "2008-02-24",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

const getAllUsers = (req, res) => {
  const { role, search } = req.query;
  let result = users;

  if (role) {
    result = result.filter(u => u.role === role);
  }
  if (search) {
    result = result.filter(u =>
      u.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  return res.status(200).json(result);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  return res.status(200).json(user);
};

const createUser = (req, res) => {
  const {
    nombre,
    email,
    contraseña_hash,
    estatura_cm,
    peso_kg,
    fecha_nacimient,
    role
  } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  const newUser = {
    id: `${Date.now()}`,
    nombre,
    email,
    contraseña_hash: contraseña_hash || null,
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString(),
    estatura_cm: estatura_cm || null,
    peso_kg: peso_kg || null,
    fecha_nacimient: fecha_nacimient || null,
    role: role || 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, email, role, peso_kg } = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  users[index] = {
    ...users[index],
    nombre,
    email,
    role,
    peso_kg: peso_kg || users[index].peso_kg,
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(users[index]);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const deleted = users.splice(index, 1);
  return res.status(200).json({ deleted: deleted[0].id });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
