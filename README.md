# Solución al Error de Filtro en `users.routes.js`

El problema se generaba porque existían **dos rutas GET duplicadas en `/`**, lo que hacía que Express siempre ejecutara la primera (que devolvía todos los usuarios) e ignorara la segunda (que contenía la lógica de filtrado). Además, en el filtro de búsqueda se estaba utilizando el campo `name`, cuando en el modelo de usuario realmente se usa `nombre`.  

La solución consistió en **unificar ambas rutas en una sola** que admite tanto el listado completo como filtros dinámicos a través de parámetros de consulta (`role` y `search`). De esta forma, si no se envían parámetros, retorna todos los usuarios, pero si se incluyen, aplica los filtros correctamente. Esto elimina la duplicación, asegura consistencia en la API y facilita su mantenimiento.

## ENDPOINTS users

POST /usuarios/registro → Crear un nuevo usuario. → 201 created
GET/usuarios → Listar todos los usuarios → 200 OK
GET/usuarios/id → Listar usuarios con un ID especifico → 200 OK
PUT/usuarios/id →  Actualizar un usuario con ID → 200 OK
DELETE/usuarios/id → Eliminar un usuario por Id especifico → 200 OK