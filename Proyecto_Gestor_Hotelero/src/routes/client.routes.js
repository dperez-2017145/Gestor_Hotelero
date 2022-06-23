'use strict'

const express = require('express');
const api = express.Router();
const clientController = require('../controllers/client.controller');
const middleware = require('../services/middleware');

api.get('/testClientController', clientController.testClientController);
api.post('/register', clientController.register);
api.put('/updateClient/:idLoged', [middleware.isLoged, middleware.isClient], clientController.updateClient);
api.post('/reservation/:idClient/:idHotel');

module.exports = api;

