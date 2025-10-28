const controller = require('../controllers/producto.controller');
const express = require('express');
const router = express.Router();

router.post('/api/producto', controller.crearProducto);
router.get('/api/producto', controller.obtenerProductos);

module.exports = router;