# Proyecto Integrador

## 1. embebido o referenciado

En mi codigo decidi usar referencias entre documentos en lugar de embebidos.

* **Usuarios – Artículos – Comentarios**

  * Los artículos tienen un campo "author" que referencia a "User".
  * Los comentarios tienen "author"(User) y "article" como referencias.
  * Ventaja: con esto puedo escalar y consultar datos relacionados sin duplicacion. Si un usuario cambia su nombre, no hace falta actualizar todos sus artículos y comentarios.
  * Desventaja: mucho uso de "populate" si se carga demaciado

* **Artículos – Tags**

  * Relación de muchos a muchos: los artículos guardan un array de referencias a "Tag".
  * Ventaja: flexibilidad para reutilizar etiquetas en múltiples artículos.
  * Desventaja: es mas dificil al consultar, ya que hay que hacer joins virtuales (populate).

No use el embebido porque los artículos y comentarios pueden aumentar mucho y deberian ser como colecciones independientes.

---

## 2. Endpoints de la API

Todas las rutas están bajo el prefijo "/api". Se usa middleware "auth" para autenticación y validadores para asegurar los datos.

### Usuarios

* **POST** `/api/register` -> Registro de usuario.
* **POST** `/api/login` -> Inicio de sesión.
* **GET** `/api/user` -> Obtener todos los usuarios.
* **GET** `/api/user/:id` -> Obtener un usuario por ID.
* **POST** `/api/user` -> Crear un usuario.
* **PUT** `/api/user/:id` -> Actualizar un usuario.
* **DELETE** `/api/user/:id` -> Eliminar (soft delete) un usuario.

*Ejemplo request*:

```json
POST /api/register
{
  "username": "benru",
  "email": "benru@gmail.com",
  "password": "123456",
  "profile": {
    "firstName": "Benru",
    "lastName": "Ruiz Diaz"
  }
}
```

### Artículos

* **GET** `/api/article` -> Obtener todos los artículos.
* **GET** `/api/article/:id` -> Obtener un artículo por ID.
* **POST** `/api/article` -> Crear un artículo.
* **PUT** `/api/article/:id` -> Actualizar un artículo.
* **DELETE** `/api/article/:id` -> Eliminar un artículo (soft delete).
* **POST** `/api/articles/:id/tags` -> Asignar un tag a un artículo.
* **DELETE** `/api/articles/:id/tags/:tagId` -> Quitar un tag de un artículo.

*Ejemplo request*:

```json
POST /api/article
{
  "title": "Titulo ingenioso",
  "content": "Contenido con 50 caracteres",
  "author": "<userId>",
  "tags": ["<tagId>"]
}
```

### Comentarios

* **GET** `/api/comment` -> Obtener todos los comentarios.
* **GET** `/api/comment/:id` -> Obtener un comentario por ID.
* **POST** `/api/comment` -> Crear un comentario.
* **PUT** `/api/comment/:id` -> Actualizar un comentario.
* **DELETE** `/api/comment/:id` -> Eliminar un comentario (soft delete).

*Ejemplo request*:

```json
POST /api/comment
{
  "content": "Una locura tu articulo amigo",
  "author": "<userId>",
  "article": "<articleId>"
}
```

### Tags

* **GET** `/api/tag` -> Obtener todos los tags.
* **GET** `/api/tag/:id` -> Obtener un tag por ID.
* **POST** `/api/tag` -> Crear un tag.
* **PUT** `/api/tag/:id` -> Actualizar un tag.
* **DELETE** `/api/tag/:id` -> Eliminar un tag.

*Ejemplo request*:

```json
POST /api/tag
{
  "name": "Tag de benru",
  "description": "Articulos de benru"
}
```

---

## 3. Instrucciones de instalacion y configuracion

1. Instalar dependencias:

```consola
npm i
```

2. Crear archivo ".env" en el proyecto:

```env
PORT=1212
MONGODB_URI=mongodb://localhost:27017/basededatos
```

3. Iniciar servidor:

```consola
npm run dev
```

El servidor se inciaria en "http://localhost:1212/api".

---

## 4. Validaciones personalizadas

Se implementaron validaciones directamente en los **Schemas de Mongoose**:

Además, se implementaron **middlewares de eliminación lógica (soft delete)**:

* En User: al marcar como eliminado un usuario, también se marcan como eliminados sus artículos y comentarios.
* En Article: al eliminar un artículo, también se eliminan en cascada sus comentarios.

---

No use validaciones personalizadas mas alla de las importantes en mis middlewares
