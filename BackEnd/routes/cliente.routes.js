const clienteController = require('../controllers/cliente.controller');
const express = require('express');

const clienteRoutes = express.Router();

clienteRoutes.post('/cliente', clienteController.criarCliente);
clienteRoutes.get('/cliente', clienteController.listarClientes);


module.exports = clienteRoutes;
