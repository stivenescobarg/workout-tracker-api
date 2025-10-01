# 🛠️ Workout Tracker API

API RESTful para el seguimiento de entrenamientos y ejercicios.  
Desarrollada en **Node.js** con **Express**.

---

## ✅ Solución al Error en `users.routes.js`

El problema se generaba porque existían **dos rutas GET duplicadas en `/`**, lo que hacía que Express siempre ejecutara la primera (que devolvía todos los usuarios) e ignorara la segunda (que contenía la lógica de filtrado).  

Además, en el filtro de búsqueda se estaba utilizando el campo `name`, cuando en el modelo de usuario realmente se usa `nombre`.  

🔧 **Solución:**  
Se unificaron ambas rutas en **una sola**, que admite tanto el listado completo como filtros dinámicos (`role` y `search`).  
De esta forma:
- Si no se envían parámetros → retorna todos los usuarios.  
- Si se incluyen filtros → aplica la búsqueda correctamente.  

Esto elimina duplicaciones, asegura consistencia y mejora el mantenimiento de la API. 🚀  

---

## 👤 Endpoints de Usuarios

| Método | Endpoint              | Descripción                             | Código |
|--------|-----------------------|-----------------------------------------|--------|
| POST   | `/usuarios/registro`  | Crear un nuevo usuario                  | 201    |
| GET    | `/usuarios`           | Listar todos los usuarios               | 200    |
| GET    | `/usuarios/:id`       | Obtener usuario por ID                  | 200    |
| PUT    | `/usuarios/:id`       | Actualizar usuario con ID               | 200    |
| DELETE | `/usuarios/:id`       | Eliminar usuario con ID específico      | 200    |

---

## 🏗️ Estructura del Proyecto

```bash
src/
├── controllers/                # Lógica de negocio
│   ├── users.controller.js
│   ├── ejercicios.controller.js
│   ├── planEntrenamiento.controller.js
│   ├── elementoPlan.controller.js
│   ├── sesionProgramada.controller.js
│   ├── registroEntrenamiento.controller.js
│   └── reporte.controller.js
├── routes/                     # Definición de rutas
│   └── v1/
│       ├── index.js
│       ├── users.routes.js
│       ├── ejercicios.routes.js
│       ├── planEntrenamiento.routes.js
│       ├── elementoPlan.routes.js
│       ├── sesionProgramada.routes.js
│       ├── registroEntrenamiento.routes.js
│       └── reporte.routes.js
└── app.js                      # Servidor principal

📋 Módulos Implementados
1. Users (/api/v1/users)
Gestión de usuarios del sistema.

GET / → Listar usuarios (filtros: role, search)

GET /:id → Obtener usuario por ID

POST / → Crear usuario

PUT /:id → Actualizar usuario

DELETE /:id → Eliminar usuario

Campos principales: id, nombre, email, role, estatura, peso, fecha_nacimiento

2. Ejercicios (/api/v1/ejercicios)
Catálogo de ejercicios disponibles.

GET / → Listar ejercicios (filtros: categoria, grupo_muscular, nivel_dificultad, search)

GET /:id → Obtener ejercicio por ID

POST / → Crear ejercicio

PUT /:id → Actualizar ejercicio

DELETE /:id → Eliminar ejercicio

Campos principales: id, nombre, descripcion, categoría, grupo_muscular, nivel_dificultad, equipo_necesario

3. Plan Entrenamiento (/api/v1/plan-entrenamiento)
Planes de entrenamiento personalizados.
(... y así sucesivamente con el resto de módulos, igual que lo tenías, pero con formato más limpio).

🔄 Métodos Comunes en Controladores
getAll[Entidad] → Listar con filtros opcionales

get[Entidad]ById → Obtener por ID

create[Entidad] → Crear registro

update[Entidad] → Actualizar registro

delete[Entidad] → Eliminar registro

🌟 Características Comunes
✔️ Validaciones de campos requeridos
✔️ Filtros de búsqueda por query params
✔️ Manejo de errores con status HTTP claros (400, 404, 201, 200)
✔️ Generación automática de campos (id, fecha_creacion, fecha_actualizacion)

🚀 Instalación y Uso

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
Acceder a la API en:
👉 http://localhost:8000/api/v1/

📡 Ejemplos de Uso

Crear un usuario
POST /api/v1/users
Content-Type: application/json

{
  "nombre": "Stiven Escobar",
  "email": "stiven@email.com",
  "estatura_cm": 175,
  "peso_kg": 70
}

Listar ejercicios de piernas:
GET /api/v1/ejercicios?grupo_muscular=piernas

Crear un plan de entrenamiento:
POST /api/v1/plan-entrenamiento
Content-Type: application/json

{
  "id_usuario": "1",
  "titulo": "Plan Principiante",
  "descripcion": "Rutina de inicio",
  "nivel_dificultad": "principiante",
  "total_semanas": 4,
  "dias_por_semana": 3
}

🔄 Flujo de Datos
👤 Usuario se registra en el sistema

📝 Crea/Selecciona un Plan de Entrenamiento

🏋️ El plan contiene elementos (ejercicios específicos)

📅 Programa sesiones de entrenamiento

✅ Ejecuta y registra entrenamientos

📊 Genera reportes de progreso