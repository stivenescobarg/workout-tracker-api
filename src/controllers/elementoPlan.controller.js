let elementosPlan = [
  {
    id_item: "101",
    id_plan: "5",
    id_ejercicio: "10",
    series: 4,
    repeticiones: 12,
    peso_kg: 80,
    descanso_segundos: 90,
    orden: 1,
    fecha_creacion: "2025-09-18",
    fecha_actualizacion: "2025-09-18"
  }
];

const getAllElementos = (req, res) => {
  const { id_plan, id_ejercicio, orden, search } = req.query;
  let result = elementosPlan;

  if (id_plan) {
    result = result.filter(e => e.id_plan === id_plan);
  }
  if (id_ejercicio) {
    result = result.filter(e => e.id_ejercicio === id_ejercicio);
  }
  if (orden) {
    result = result.filter(e => e.orden === parseInt(orden));
  }

  return res.status(200).json(result);
};

const getElementoById = (req, res) => {
  const { id } = req.params;
  const elemento = elementosPlan.find(e => e.id_item === id);
  if (!elemento) {
    return res.status(404).json({ error: 'Elemento del plan no encontrado' });
  }
  return res.status(200).json(elemento);
};

const createElemento = (req, res) => {
  const {
    id_plan,
    id_ejercicio,
    series,
    repeticiones,
    peso_kg,
    descanso_segundos,
    orden
  } = req.body;

  if (!id_plan || !id_ejercicio || !series || !repeticiones || !orden) {
    return res.status(400).json({ 
      error: 'ID plan, ID ejercicio, series, repeticiones y orden son requeridos' 
    });
  }

  const newElemento = {
    id_item: `${Date.now()}`,
    id_plan,
    id_ejercicio,
    series: parseInt(series),
    repeticiones: parseInt(repeticiones),
    peso_kg: peso_kg || null,
    descanso_segundos: descanso_segundos || 60,
    orden: parseInt(orden),
    fecha_creacion: new Date().toISOString(),
    fecha_actualizacion: new Date().toISOString()
  };

  elementosPlan.push(newElemento);
  return res.status(201).json(newElemento);
};

const updateElemento = (req, res) => {
  const { id } = req.params;
  const {
    series,
    repeticiones,
    peso_kg,
    descanso_segundos,
    orden
  } = req.body;

  const index = elementosPlan.findIndex(e => e.id_item === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Elemento del plan no encontrado' });
  }

  if (!series || !repeticiones || !orden) {
    return res.status(400).json({ 
      error: 'Series, repeticiones y orden son requeridos' 
    });
  }

  elementosPlan[index] = {
    ...elementosPlan[index],
    series: parseInt(series),
    repeticiones: parseInt(repeticiones),
    peso_kg: peso_kg !== undefined ? peso_kg : elementosPlan[index].peso_kg,
    descanso_segundos: descanso_segundos || elementosPlan[index].descanso_segundos,
    orden: parseInt(orden),
    fecha_actualizacion: new Date().toISOString()
  };

  return res.status(200).json(elementosPlan[index]);
};

const deleteElemento = (req, res) => {
  const { id } = req.params;
  const index = elementosPlan.findIndex(e => e.id_item === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Elemento del plan no encontrado' });
  }
  const deleted = elementosPlan.splice(index, 1);
  return res.status(200).json({ deleted: deleted[0].id_item });
};
module.exports = {
  getAllElementos,
  getElementoById,
  createElemento,
  updateElemento,
  deleteElemento
};