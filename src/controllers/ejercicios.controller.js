let ejercicios = [
  {
    id: "1",
    nombre: "Sentadilla con barra",
    descripcion: "Ejercicio de fuerza para trabajar piernas y glúteos",
    categoría: "fuerza",
    grupo_muscular: "piernas",
    nivel_dificultad: "intermedio",
    equipo_necesario: "barra olímpica",
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18"
  }
];

const getAllEjercicios = (req, res) => {
  const { categoria, grupo_muscular, nivel_dificultad, search } = req.query;
  let result = ejercicios;

  if (categoria) {
    result = result.filter(e => e.categoría === categoria);
  }
  if (grupo_muscular) {
    result = result.filter(e => e.grupo_muscular === grupo_muscular);
  }
  if (nivel_dificultad) {
    result = result.filter(e => e.nivel_dificultad === nivel_dificultad);
  }
  if (search) {
    result = result.filter(e =>
      e.nombre.toLowerCase().includes(search.toLowerCase()) ||
      e.descripcion.toLowerCase().includes(search.toLowerCase())
    );
  }

  return res.status(200).json(result);
};

const getEjercicioById = (req, res) => {
  const { id } = req.params;
  const ejercicio = ejercicios.find(e => e.id === id);
  if (!ejercicio) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }
  return res.status(200).json(ejercicio);
};

const createEjercicio = (req, res) => {
  const {
    nombre,
    descripcion,
    categoría,
    grupo_muscular,
    nivel_dificultad,
    equipo_necesario
  } = req.body;

  if (!nombre || !descripcion || !categoría || !grupo_muscular) {
    return res.status(400).json({ 
      error: 'Nombre, descripción, categoría y grupo muscular son requeridos' 
    });
  }

  const newEjercicio = {
    id: `${Date.now()}`,
    nombre,
    descripcion,
    categoría,
    grupo_muscular,
    nivel_dificultad: nivel_dificultad || 'intermedio',
    equipo_necesario: equipo_necesario || null,
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString()
  };

  ejercicios.push(newEjercicio);
  return res.status(201).json(newEjercicio);
};

const updateEjercicio = (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    categoría,
    grupo_muscular,
    nivel_dificultad,
    equipo_necesario
  } = req.body;

  const index = ejercicios.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  if (!nombre || !descripcion || !categoría || !grupo_muscular) {
    return res.status(400).json({ 
      error: 'Nombre, descripción, categoría y grupo muscular son requeridos' 
    });
  }

  ejercicios[index] = {
    ...ejercicios[index],
    nombre,
    descripcion,
    categoría,
    grupo_muscular,
    nivel_dificultad: nivel_dificultad || ejercicios[index].nivel_dificultad,
    equipo_necesario: equipo_necesario || ejercicios[index].equipo_necesario,
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(ejercicios[index]);
};

const deleteEjercicio = (req, res) => {
  const { id } = req.params;
  const index = ejercicios.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }
  const deleted = ejercicios.splice(index, 1);
  return res.status(200).json({ deleted: deleted[0].id });
};

