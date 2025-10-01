let reportes = [
  {
    id_reporte: "12",
    id_usuario: "1",
    tipo_reporte: "mensual",
    fecha_inicio: "2025-09-01",
    fecha_fin: "2025-09-30",
    metricas: {
      sesiones_completadas: 15,
      peso_total_levantado_kg: 12500,
      calorias_quemadas: 7800
    },
    conclusiones: "Incremento del 10% en fuerza de tren inferior. Se recomienda aumentar carga en sentadillas.",
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18"
  }
];

const getAllReportes = (req, res) => {
  const { id_usuario, tipo_reporte, fecha_inicio, fecha_fin } = req.query;
  let result = reportes;

  if (id_usuario) {
    result = result.filter(r => r.id_usuario === id_usuario);
  }
  if (tipo_reporte) {
    result = result.filter(r => r.tipo_reporte === tipo_reporte);
  }
  if (fecha_inicio) {
    result = result.filter(r => r.fecha_inicio >= fecha_inicio);
  }
  if (fecha_fin) {
    result = result.filter(r => r.fecha_fin <= fecha_fin);
  }

  return res.status(200).json(result);
};

const getReporteById = (req, res) => {
  const { id } = req.params;
  const reporte = reportes.find(r => r.id_reporte === id);
  if (!reporte) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }
  return res.status(200).json(reporte);
};
