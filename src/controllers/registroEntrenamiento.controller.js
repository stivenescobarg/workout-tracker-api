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

const createRegistro = (req, res) => {
  const {
    id_usuario,
    id_sesion,
    fecha_ejecucion,
    items_registrados,
    duracion_total,
    calorias_quemadas,
    valoracion
  } = req.body;

  if (!id_usuario || !id_sesion || !fecha_ejecucion || !items_registrados || !duracion_total) {
    return res.status(400).json({ 
      error: 'ID usuario, ID sesión, fecha ejecución, items registrados y duración total son requeridos' 
    });
  }

  // Validar estructura de items_registrados
  if (!Array.isArray(items_registrados) || items_registrados.length === 0) {
    return res.status(400).json({ 
      error: 'Items registrados debe ser un array con al menos un elemento' 
    });
  }

  for (let item of items_registrados) {
    if (!item.id_ejercicio || !item.series_realizadas || !item.repeticiones_totales) {
      return res.status(400).json({ 
        error: 'Cada item debe tener id_ejercicio, series_realizadas y repeticiones_totales' 
      });
    }
  }

  const newRegistro = {
    id_registro: `${Date.now()}`,
    id_usuario,
    id_sesion,
    fecha_ejecucion,
    items_registrados: items_registrados.map(item => ({
      id_ejercicio: item.id_ejercicio,
      series_realizadas: parseInt(item.series_realizadas),
      repeticiones_totales: parseInt(item.repeticiones_totales),
      peso_usado: item.peso_usado || null
    })),
    duracion_total: parseInt(duracion_total),
    calorias_quemadas: calorias_quemadas || null,
    valoracion: valoracion || null,
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString()
  };

  registrosEntrenamiento.push(newRegistro);
  return res.status(201).json(newRegistro);
};

const updateRegistro = (req, res) => {
  const { id } = req.params;
  const {
    fecha_ejecucion,
    items_registrados,
    duracion_total,
    calorias_quemadas,
    valoracion
  } = req.body;

  const index = registrosEntrenamiento.findIndex(r => r.id_registro === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Registro de entrenamiento no encontrado' });
  }

  if (!fecha_ejecucion || !items_registrados || !duracion_total) {
    return res.status(400).json({ 
      error: 'Fecha ejecución, items registrados y duración total son requeridos' 
    });
  }

  // Validar estructura de items_registrados
  if (!Array.isArray(items_registrados) || items_registrados.length === 0) {
    return res.status(400).json({ 
      error: 'Items registrados debe ser un array con al menos un elemento' 
    });
  }

  for (let item of items_registrados) {
    if (!item.id_ejercicio || !item.series_realizadas || !item.repeticiones_totales) {
      return res.status(400).json({ 
        error: 'Cada item debe tener id_ejercicio, series_realizadas y repeticiones_totales' 
      });
    }
  }

  registrosEntrenamiento[index] = {
    ...registrosEntrenamiento[index],
    fecha_ejecucion,
    items_registrados: items_registrados.map(item => ({
      id_ejercicio: item.id_ejercicio,
      series_realizadas: parseInt(item.series_realizadas),
      repeticiones_totales: parseInt(item.repeticiones_totales),
      peso_usado: item.peso_usado || registrosEntrenamiento[index].items_registrados
        .find(i => i.id_ejercicio === item.id_ejercicio)?.peso_usado || null
    })),
    duracion_total: parseInt(duracion_total),
    calorias_quemadas: calorias_quemadas !== undefined ? calorias_quemadas : registrosEntrenamiento[index].calorias_quemadas,
    valoracion: valoracion !== undefined ? valoracion : registrosEntrenamiento[index].valoracion,
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(registrosEntrenamiento[index]);
};

