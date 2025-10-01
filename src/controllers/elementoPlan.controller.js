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
