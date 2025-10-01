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
