const tatuadorController = require('../controllers/tatuador.controller');
const express = require('express');

const tatuadorRoutes = express.Router();

tatuadorRoutes.post('/tatuador', tatuadorController.addTatuador);
tatuadorRoutes.get('/tatuador', tatuadorController.listarTatuadores);

module.exports = tatuadorRoutes;
