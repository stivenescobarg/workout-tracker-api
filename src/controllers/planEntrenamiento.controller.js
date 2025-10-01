let planesEntrenamiento = [
  {
    id_plan: "5",
    id_usuario: "1",
    titulo: "Plan de hipertrofia 8 semanas",
    descripcion: "Programa de entrenamiento para aumentar masa muscular",
    activo: true,
    nivel_dificultad: "avanzado",
    total_semanas: 8,
    dias_por_semana: 5,
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18"
  }
];

const getAllPlanes = (req, res) => {
  const { id_usuario, activo, nivel_dificultad, search } = req.query;
  let result = planesEntrenamiento;

  if (id_usuario) {
    result = result.filter(p => p.id_usuario === id_usuario);
  }
  if (activo) {
    result = result.filter(p => p.activo === (activo === 'true'));
  }
  if (nivel_dificultad) {
    result = result.filter(p => p.nivel_dificultad === nivel_dificultad);
  }
  if (search) {
    result = result.filter(p =>
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(search.toLowerCase())
    );
  }

  return res.status(200).json(result);
};

const getPlanById = (req, res) => {
  const { id } = req.params;
  const plan = planesEntrenamiento.find(p => p.id_plan === id);
  if (!plan) {
    return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
  }
  return res.status(200).json(plan);
};
