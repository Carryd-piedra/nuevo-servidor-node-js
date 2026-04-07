const controller = require('../controllers/categoria.controller');
const express = require('express');
const router = express.Router();

router.post('/crear', controller.crearCategoria); // Endpoint para crear una nueva categoria
router.get('/', controller.obtenerCategorias); // Endpoint raiz para obtener todas las categorias
router.get('/listar', controller.obtenerCategorias); // Endpoint para obtener todas las categorias
router.put('/actualizar/:id', controller.actualizarCategoria); // Endpoint para actualizar una categoria existente
router.delete('/borrar/:id', controller.eliminarCategoria); // Nuevo endpoint para eliminar una categoria
module.exports = router;

