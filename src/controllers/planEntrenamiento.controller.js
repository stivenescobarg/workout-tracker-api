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

const createPlan = (req, res) => {
  const {
    id_usuario,
    titulo,
    descripcion,
    activo,
    nivel_dificultad,
    total_semanas,
    dias_por_semana
  } = req.body;

  if (!id_usuario || !titulo || !descripcion) {
    return res.status(400).json({ 
      error: 'ID usuario, título y descripción son requeridos' 
    });
  }

  const newPlan = {
    id_plan: `${Date.now()}`,
    id_usuario,
    titulo,
    descripcion,
    activo: activo !== undefined ? activo : true,
    nivel_dificultad: nivel_dificultad || 'intermedio',
    total_semanas: total_semanas || 4,
    dias_por_semana: dias_por_semana || 3,
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString()
  };

  planesEntrenamiento.push(newPlan);
  return res.status(201).json(newPlan);
};

const updatePlan = (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    activo,
    nivel_dificultad,
    total_semanas,
    dias_por_semana
  } = req.body;

  const index = planesEntrenamiento.findIndex(p => p.id_plan === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
  }

  if (!titulo || !descripcion) {
    return res.status(400).json({ 
      error: 'Título y descripción son requeridos' 
    });
  }

  planesEntrenamiento[index] = {
    ...planesEntrenamiento[index],
    titulo,
    descripcion,
    activo: activo !== undefined ? activo : planesEntrenamiento[index].activo,
    nivel_dificultad: nivel_dificultad || planesEntrenamiento[index].nivel_dificultad,
    total_semanas: total_semanas || planesEntrenamiento[index].total_semanas,
    dias_por_semana: dias_por_semana || planesEntrenamiento[index].dias_por_semana,
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(planesEntrenamiento[index]);
};

const deletePlan = (req, res) => {
  const { id } = req.params;
  const index = planesEntrenamiento.findIndex(p => p.id_plan === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
  }
  const deleted = planesEntrenamiento.splice(index, 1);
  return res.status(200).json({ deleted: deleted[0].id_plan });
};
