# API REST Node.js

Este proyecto es una API REST construida con **Node.js**, **Express** y **Sequelize** para interactuar con una base de datos **MySQL**. Proporciona endpoints para la gestión de productos y categorías.

## 📋 Tabla de Contenidos
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
  - [Productos](#productos)
  - [Categorías](#categorías)

## 🚀 Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js (MySQL).
- **MySQL2**: Cliente MySQL para Node.js.
- **Dotenv**: Carga de variables de entorno.
- **Nodemon**: Utilidad para el desarrollo (reinicio automático).

## 🔧 Instalación

1.  Clona el repositorio o descarga los archivos.
2.  Abre una terminal en la carpeta raíz del proyecto.
3.  Instala las dependencias ejecutando:

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como guía) y configura las variables de entorno necesarias, por ejemplo:

```env
PORT=3000
DB_NAME=nombre_base_datos
DB_USER=usuario
DB_PASS=contraseña
DB_HOST=localhost
```
*(Asegúrate de tener una base de datos MySQL corriendo y accesible)*

## ▶️ Uso

Para iniciar el servidor en modo producción:
```bash
npm start
```

Para iniciar el servidor en modo desarrollo (con Nodemon):
```bash
npm run dev
```

El servidor se iniciará (por defecto en el puerto especificado en `.env` o 3000) y conectará a la base de datos.

## 📚 Documentación API (Swagger)

El proyecto cuenta con documentación automática generada con Swagger.
Una vez iniciado el servidor, puedes acceder a la interfaz gráfica en:

`http://localhost:3000/api-docs`

Para regenerar la documentación si agregas nuevos endpoints, ejecuta:
```bash
npm run swagger
```

## 📡 API Endpoints

### Productos
Ruta base: `/api/productos`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/crear` | Crea un nuevo producto. |
| **GET** | `/listar` | Obtiene la lista de todos los productos. |
| **PUT** | `/actualizar/:id` | Actualiza un producto existente por su ID. |
| **DELETE** | `/borrar/:id` | Elimina un producto por su ID. |

### Categorías
Ruta base: `/api/categorias`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/crear` | Crea una nueva categoría. |
| **GET** | `/listar` | Obtiene la lista de todas las categorías. |
| **PUT** | `/actualizar/:id` | Actualiza una categoría existente por su ID. |
| **DELETE** | `/borrar/:id` | Elimina una categoría por su ID. |

---
**Nota**: El código fuente también incluye archivos para autenticación (`login.route.js`), pero actualmente no están activos en el archivo principal `app.js`.
