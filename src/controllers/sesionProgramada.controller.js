let sesionesProgramadas = [
  {
    id_sesion: "20",
    id_usuario: "1",
    id_plan: "5",
    fecha_hora_programada: "2025-09-20T08:30:00",
    duracion_minutos: 75,
    estado: "pendiente",
    ubicacion: "Gimnasio Central",
    notas: "Llevar cinturón de levantamiento",
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18"
  }
];

const getAllSesiones = (req, res) => {
  const { id_usuario, id_plan, estado, search } = req.query;
  let result = sesionesProgramadas;

  if (id_usuario) {
    result = result.filter(s => s.id_usuario === id_usuario);
  }
  if (id_plan) {
    result = result.filter(s => s.id_plan === id_plan);
  }
  if (estado) {
    result = result.filter(s => s.estado === estado);
  }
  if (search) {
    result = result.filter(s =>
      s.ubicacion.toLowerCase().includes(search.toLowerCase()) ||
      s.notas.toLowerCase().includes(search.toLowerCase())
    );
  }

  return res.status(200).json(result);
};

const getSesionById = (req, res) => {
  const { id } = req.params;
  const sesion = sesionesProgramadas.find(s => s.id_sesion === id);
  if (!sesion) {
    return res.status(404).json({ error: 'Sesión programada no encontrada' });
  }
  return res.status(200).json(sesion);
};
const createSesion = (req, res) => {
  const {
    id_usuario,
    id_plan,
    fecha_hora_programada,
    duracion_minutos,
    estado,
    ubicacion,
    notas
  } = req.body;

  if (!id_usuario || !id_plan || !fecha_hora_programada || !duracion_minutos) {
    return res.status(400).json({ 
      error: 'ID usuario, ID plan, fecha/hora programada y duración son requeridos' 
    });
  }

  const newSesion = {
    id_sesion: `${Date.now()}`,
    id_usuario,
    id_plan,
    fecha_hora_programada,
    duracion_minutos: parseInt(duracion_minutos),
    estado: estado || 'pendiente',
    ubicacion: ubicacion || null,
    notas: notas || null,
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString()
  };

  sesionesProgramadas.push(newSesion);
  return res.status(201).json(newSesion);
};

const updateSesion = (req, res) => {
  const { id } = req.params;
  const {
    fecha_hora_programada,
    duracion_minutos,
    estado,
    ubicacion,
    notas
  } = req.body;

  const index = sesionesProgramadas.findIndex(s => s.id_sesion === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Sesión programada no encontrada' });
  }

  if (!fecha_hora_programada || !duracion_minutos) {
    return res.status(400).json({ 
      error: 'Fecha/hora programada y duración son requeridos' 
    });
  }

  sesionesProgramadas[index] = {
    ...sesionesProgramadas[index],
    fecha_hora_programada,
    duracion_minutos: parseInt(duracion_minutos),
    estado: estado || sesionesProgramadas[index].estado,
    ubicacion: ubicacion || sesionesProgramadas[index].ubicacion,
    notas: notas || sesionesProgramadas[index].notas,
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(sesionesProgramadas[index]);
};
const deleteSesion = (req, res) => {
  const { id } = req.params;
  const index = sesionesProgramadas.findIndex(s => s.id_sesion === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Sesión programada no encontrada' });
  }
  const deleted = sesionesProgramadas.splice(index, 1);
  return res.status(200).json({ deleted: deleted[0].id_sesion });
};

module.exports = {
  getAllSesiones,
  getSesionById,
  createSesion,
  updateSesion,
  deleteSesion
};