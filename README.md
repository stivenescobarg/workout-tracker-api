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

## 📊 Tabla de Endpoints

### 👥 Módulo: Users (`/api/v1/users`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/users` | Listar todos los usuarios | `200`, `400` |
| `GET` | `/users/:id` | Obtener usuario por ID | `200`, `404` |
| `POST` | `/users` | Crear nuevo usuario | `201`, `400` |
| `PUT` | `/users/:id` | Actualizar usuario | `200`, `400`, `404` |
| `DELETE` | `/users/:id` | Eliminar usuario | `200`, `404` |

### 🏋️ Módulo: Ejercicios (`/api/v1/ejercicios`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/ejercicios` | Listar ejercicios | `200`, `400` |
| `GET` | `/ejercicios/:id` | Obtener ejercicio por ID | `200`, `404` |
| `POST` | `/ejercicios` | Crear nuevo ejercicio | `201`, `400` |
| `PUT` | `/ejercicios/:id` | Actualizar ejercicio | `200`, `400`, `404` |
| `DELETE` | `/ejercicios/:id` | Eliminar ejercicio | `200`, `404` |

### 📅 Módulo: Plan Entrenamiento (`/api/v1/plan-entrenamiento`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/plan-entrenamiento` | Listar planes | `200`, `400` |
| `GET` | `/plan-entrenamiento/:id` | Obtener plan por ID | `200`, `404` |
| `POST` | `/plan-entrenamiento` | Crear nuevo plan | `201`, `400` |
| `PUT` | `/plan-entrenamiento/:id` | Actualizar plan | `200`, `400`, `404` |
| `DELETE` | `/plan-entrenamiento/:id` | Eliminar plan | `200`, `404` |

### 🎯 Módulo: Elemento Plan (`/api/v1/elemento-plan`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/elemento-plan` | Listar elementos | `200`, `400` |
| `GET` | `/elemento-plan/:id` | Obtener elemento por ID | `200`, `404` |
| `POST` | `/elemento-plan` | Crear nuevo elemento | `201`, `400` |
| `PUT` | `/elemento-plan/:id` | Actualizar elemento | `200`, `400`, `404` |
| `DELETE` | `/elemento-plan/:id` | Eliminar elemento | `200`, `404` |

### 🗓️ Módulo: Sesión Programada (`/api/v1/sesion-programada`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/sesion-programada` | Listar sesiones | `200`, `400` |
| `GET` | `/sesion-programada/:id` | Obtener sesión por ID | `200`, `404` |
| `POST` | `/sesion-programada` | Crear nueva sesión | `201`, `400` |
| `PUT` | `/sesion-programada/:id` | Actualizar sesión | `200`, `400`, `404` |
| `DELETE` | `/sesion-programada/:id` | Eliminar sesión | `200`, `404` |

### 📝 Módulo: Registro Entrenamiento (`/api/v1/registro-entrenamiento`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/registro-entrenamiento` | Listar registros | `200`, `400` |
| `GET` | `/registro-entrenamiento/:id` | Obtener registro por ID | `200`, `404` |
| `POST` | `/registro-entrenamiento` | Crear nuevo registro | `201`, `400` |
| `PUT` | `/registro-entrenamiento/:id` | Actualizar registro | `200`, `400`, `404` |
| `DELETE` | `/registro-entrenamiento/:id` | Eliminar registro | `200`, `404` |

### 📊 Módulo: Reportes (`/api/v1/reportes`)

| Método | Endpoint | Descripción | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/reportes` | Listar reportes | `200`, `400` |
| `GET` | `/reportes/:id` | Obtener reporte por ID | `200`, `404` |
| `POST` | `/reportes` | Crear nuevo reporte | `201`, `400` |
| `PUT` | `/reportes/:id` | Actualizar reporte | `200`, `400`, `404` |
| `DELETE` | `/reportes/:id` | Eliminar reporte | `200`, `404` |

---

## 📨 Ejemplos de Request/Response

### 👤 **USERS - Crear Usuario**

**Request:**

POST /api/v1/users
Content-Type: application/json

{
  "nombre": "Stiven",
  "email": "stiven@email.com",
  "contraseña_hash": "123seg",
  "estatura_cm": 165,
  "peso_kg": 58,
  "fecha_nacimiento": "2008-24-02",
  "role": "user"
}
Response: 201 Created

json
{
  "id": "1737225600000",
  "nombre": "stiven",
  "email": "stiven.garcia@email.com",
  "contraseña_hash": "123Sseg",
  "fecha_creacion": "2025-01-18T10:45:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:45:00.000Z",
  "estatura_cm": 165,
  "peso_kg": 58,
  "fecha_nacimiento": "2008-24-02",
  "role": "user",
  "createdAt": "2025-01-18T10:45:00.000Z"
}

🏋️ EJERCICIOS - Crear Ejercicio
Request:
POST /api/v1/ejercicios
Content-Type: application/json

{
  "nombre": "Press de banca",
  "descripcion": "Ejercicio para desarrollo de pectorales",
  "categoría": "fuerza",
  "grupo_muscular": "pecho",
  "nivel_dificultad": "intermedio",
  "equipo_necesario": "banco plano y barra"
}
Response: 201 Created

json
{
  "id": "1737225600001",
  "nombre": "Press de banca",
  "descripcion": "Ejercicio para desarrollo de pectorales",
  "categoría": "fuerza",
  "grupo_muscular": "pecho",
  "nivel_dificultad": "intermedio",
  "equipo_necesario": "banco plano y barra",
  "fecha_creacion": "2025-01-18T10:46:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:46:00.000Z"
}

📅 PLAN ENTRENAMIENTO - Crear Plan
Request:
POST /api/v1/plan-entrenamiento
Content-Type: application/json

{
  "id_usuario": "1737225600000",
  "titulo": "Plan Hipertrofia Avanzado",
  "descripcion": "Programa de 8 semanas para ganancia muscular",
  "activo": true,
  "nivel_dificultad": "avanzado",
  "total_semanas": 8,
  "dias_por_semana": 5
}
Response: 201 Created

json
{
  "id_plan": "1737225600002",
  "id_usuario": "1737225600000",
  "titulo": "Plan Hipertrofia Avanzado",
  "descripcion": "Programa de 8 semanas para ganancia muscular",
  "activo": true,
  "nivel_dificultad": "avanzado",
  "total_semanas": 8,
  "dias_por_semana": 5,
  "fecha_creacion": "2025-01-18T10:47:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:47:00.000Z"
}

🎯 ELEMENTO PLAN - Crear Elemento
Request:
POST /api/v1/elemento-plan
Content-Type: application/json

{
  "id_plan": "1737225600002",
  "id_ejercicio": "1737225600001",
  "series": 4,
  "repeticiones": 10,
  "peso_kg": 80,
  "descanso_segundos": 90,
  "orden": 1
}
Response: 201 Created

json
{
  "id_item": "1737225600003",
  "id_plan": "1737225600002",
  "id_ejercicio": "1737225600001",
  "series": 4,
  "repeticiones": 10,
  "peso_kg": 80,
  "descanso_segundos": 90,
  "orden": 1,
  "fecha_creacion": "2025-01-18T10:48:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:48:00.000Z"
}

🗓️ SESIÓN PROGRAMADA - Crear Sesión
Request:
POST /api/v1/sesion-programada
Content-Type: application/json

{
  "id_usuario": "1737225600000",
  "id_plan": "1737225600002",
  "fecha_hora_programada": "2025-01-20T08:30:00",
  "duracion_minutos": 75,
  "estado": "pendiente",
  "ubicacion": "Gimnasio Central",
  "notas": "Llevar cinturón de levantamiento"
}
Response: 201 Created

json
{
  "id_sesion": "1737225600004",
  "id_usuario": "1737225600000",
  "id_plan": "1737225600002",
  "fecha_hora_programada": "2025-01-20T08:30:00",
  "duracion_minutos": 75,
  "estado": "pendiente",
  "ubicacion": "Gimnasio Central",
  "notas": "Llevar cinturón de levantamiento",
  "fecha_creacion": "2025-01-18T10:49:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:49:00.000Z"
}

📝 REGISTRO ENTRENAMIENTO - Crear Registro
Request:
POST /api/v1/registro-entrenamiento
Content-Type: application/json

{
  "id_usuario": "1737225600000",
  "id_sesion": "1737225600004",
  "fecha_ejecucion": "2025-01-20T08:45:00",
  "items_registrados": [
    {
      "id_ejercicio": "1737225600001",
      "series_realizadas": 4,
      "repeticiones_totales": 40,
      "peso_usado": 80
    }
  ],
  "duracion_total": 70,
  "calorias_quemadas": 520,
  "valoracion": 5
}
Response: 201 Created

json
{
  "id_registro": "1737225600005",
  "id_usuario": "1737225600000",
  "id_sesion": "1737225600004",
  "fecha_ejecucion": "2025-01-20T08:45:00",
  "items_registrados": [
    {
      "id_ejercicio": "1737225600001",
      "series_realizadas": 4,
      "repeticiones_totales": 40,
      "peso_usado": 80
    }
  ],
  "duracion_total": 70,
  "calorias_quemadas": 520,
  "valoracion": 5,
  "fecha_creacion": "2025-01-18T10:50:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:50:00.000Z"
}

📊 REPORTES - Crear Reporte
Request:
POST /api/v1/reportes
Content-Type: application/json

{
  "id_usuario": "1737225600000",
  "tipo_reporte": "mensual",
  "fecha_inicio": "2025-01-01",
  "fecha_fin": "2025-01-31",
  "metricas": {
    "sesiones_completadas": 15,
    "peso_total_levantado_kg": 12500,
    "calorias_quemadas": 7800
  },
  "conclusiones": "Incremento del 10% en fuerza de tren inferior. Se recomienda aumentar carga en sentadillas."
}
Response: 201 Created

json
{
  "id_reporte": "1737225600006",
  "id_usuario": "1737225600000",
  "tipo_reporte": "mensual",
  "fecha_inicio": "2025-01-01",
  "fecha_fin": "2025-01-31",
  "metricas": {
    "sesiones_completadas": 15,
    "peso_total_levantado_kg": 12500,
    "calorias_quemadas": 7800
  },
  "conclusiones": "Incremento del 10% en fuerza de tren inferior. Se recomienda aumentar carga en sentadillas.",
  "fecha_creacion": "2025-01-18T10:51:00.000Z",
  "fecha_actualizacion": "2025-01-18T10:51:00.000Z"
}

⚡ Ejemplos de Filtros
🔍 Filtrar Usuarios por Rol
GET /api/v1/users?role=admin

🔍 Buscar Ejercicios por Grupo Muscular
GET /api/v1/ejercicios?grupo_muscular=piernas&nivel_dificultad=intermedio

🔍 Filtrar Sesiones por Estado
GET /api/v1/sesion-programada?estado=completada&id_usuario=1737225600000

🔍 Buscar en Múltiples Campos
GET /api/v1/ejercicios?search=press&categoria=fuerza

📋 Códigos de Estado HTTP
Código	Descripción	Casos de Uso
200	OK	Operación exitosa (GET, PUT, DELETE)
201	Created	Recurso creado exitosamente (POST)
400	Bad Request	Datos inválidos o faltantes
404	Not Found	Recurso no encontrado
500	Internal Server Error	Error interno del servidor

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

```bash

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
 
Acceder a la API en:
👉 http://localhost:8000/api/v1/
 

🔄 Flujo de Datos
👤 Usuario se registra en el sistema

📝 Crea/Selecciona un Plan de Entrenamiento

🏋️ El plan contiene elementos (ejercicios específicos)

📅 Programa sesiones de entrenamiento

✅ Ejecuta y registra entrenamientos

📊 Genera reportes de progreso