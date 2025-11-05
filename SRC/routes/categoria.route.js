const controller = require('../controllers/categoria.controller');
const express = require('express');
const router = express.Router();

router.post('/crear', controller.crearCategoria); // Endpoint para crear una nueva categoria
router.get('/listar', controller.obtenerCategorias); // Endpoint para obtener todas las categorias

module.exports = router;