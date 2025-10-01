let registrosEntrenamiento = [
  {
    id_registro: "300",
    id_usuario: "1",
    id_sesion: "20",
    fecha_ejecucion: "2025-09-20T08:45:00",
    items_registrados: [
      {
        id_ejercicio: "10",
        series_realizadas: 4,
        repeticiones_totales: 48,
        peso_usado: 80
      }
    ],
    duracion_total: 70,
    calorias_quemadas: 520,
    valoracion: 5,
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18"
  }
];

const getAllRegistros = (req, res) => {
  const { id_usuario, id_sesion, fecha_ejecucion, valoracion } = req.query;
  let result = registrosEntrenamiento;

  if (id_usuario) {
    result = result.filter(r => r.id_usuario === id_usuario);
  }
  if (id_sesion) {
    result = result.filter(r => r.id_sesion === id_sesion);
  }
  if (fecha_ejecucion) {
    result = result.filter(r => r.fecha_ejecucion.includes(fecha_ejecucion));
  }
  if (valoracion) {
    result = result.filter(r => r.valoracion === parseInt(valoracion));
  }

  return res.status(200).json(result);
};

const getRegistroById = (req, res) => {
  const { id } = req.params;
  const registro = registrosEntrenamiento.find(r => r.id_registro === id);
  if (!registro) {
    return res.status(404).json({ error: 'Registro de entrenamiento no encontrado' });
  }
  return res.status(200).json(registro);
};

