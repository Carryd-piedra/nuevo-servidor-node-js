const controller = require('../controllers/producto.controller');
const express = require('express');
const router = express.Router();

router.post('/crear', controller.crearProducto); // Endpoint para crear un nuevo producto
router.get('/listar', controller.obtenerProductos); // Endpoint para obtener todos los productos
router.put('/actualizar/:id', controller.actualizarProducto); // Endpoint para actualizar un producto existente
router.delete('/borrar/:id', controller.eliminarProducto); // Nuevo endpoint para eliminar un producto

module.exports = router;

