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
