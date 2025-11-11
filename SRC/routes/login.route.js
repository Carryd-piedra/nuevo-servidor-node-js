const controller = require('../controllers/categoria.controller');
const express = require('express');
const router = express.Router();

router.post('/login', controller.login); // Endpoint para login de usuario
router.post('/register', controller.registrarUsuario); // Endpoint para registro de usuario
router.get('/refresh', controller.refreshToken); // Endpoint para refrescar el token
router.get('/logout', controller.logout); // Endpoint para cerrar sesión


module.exports = router;