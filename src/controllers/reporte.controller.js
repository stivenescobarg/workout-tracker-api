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
const createReporte = (req, res) => {
  const {
    id_usuario,
    tipo_reporte,
    fecha_inicio,
    fecha_fin,
    metricas,
    conclusiones
  } = req.body;

  if (!id_usuario || !tipo_reporte || !fecha_inicio || !fecha_fin || !metricas) {
    return res.status(400).json({ 
      error: 'ID usuario, tipo reporte, fecha inicio, fecha fin y métricas son requeridos' 
    });
  }

  // Validar estructura de métricas
  if (typeof metricas !== 'object' || metricas === null) {
    return res.status(400).json({ 
      error: 'Métricas debe ser un objeto válido' 
    });
  }

  const newReporte = {
    id_reporte: `${Date.now()}`,
    id_usuario,
    tipo_reporte,
    fecha_inicio,
    fecha_fin,
    metricas: {
      sesiones_completadas: metricas.sesiones_completadas || 0,
      peso_total_levantado_kg: metricas.peso_total_levantado_kg || 0,
      calorias_quemadas: metricas.calorias_quemadas || 0
    },
    conclusiones: conclusiones || null,
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString()
  };

  reportes.push(newReporte);
  return res.status(201).json(newReporte);
};

const updateReporte = (req, res) => {
  const { id } = req.params;
  const {
    tipo_reporte,
    fecha_inicio,
    fecha_fin,
    metricas,
    conclusiones
  } = req.body;

  const index = reportes.findIndex(r => r.id_reporte === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  if (!tipo_reporte || !fecha_inicio || !fecha_fin || !metricas) {
    return res.status(400).json({ 
      error: 'Tipo reporte, fecha inicio, fecha fin y métricas son requeridos' 
    });
  }

  // Validar estructura de métricas
  if (typeof metricas !== 'object' || metricas === null) {
    return res.status(400).json({ 
      error: 'Métricas debe ser un objeto válido' 
    });
  }

  reportes[index] = {
    ...reportes[index],
    tipo_reporte,
    fecha_inicio,
    fecha_fin,
    metricas: {
      sesiones_completadas: metricas.sesiones_completadas !== undefined ? 
        metricas.sesiones_completadas : reportes[index].metricas.sesiones_completadas,
      peso_total_levantado_kg: metricas.peso_total_levantado_kg !== undefined ? 
        metricas.peso_total_levantado_kg : reportes[index].metricas.peso_total_levantado_kg,
      calorias_quemadas: metricas.calorias_quemadas !== undefined ? 
        metricas.calorias_quemadas : reportes[index].metricas.calorias_quemadas
    },
    conclusiones: conclusiones !== undefined ? conclusiones : reportes[index].conclusiones,
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(reportes[index]);
};
const deleteReporte = (req, res) => {
  const { id } = req.params;
  const index = reportes.findIndex(r => r.id_reporte === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }
  const deleted = reportes.splice(index, 1);
  return res.status(200).json({ deleted: deleted[0].id_reporte });
};
