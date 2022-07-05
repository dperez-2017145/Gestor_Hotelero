'use strict'

const express = require('express');
const api = express.Router();
const clientController = require('../controllers/client.controller');
const middleware = require('../services/middleware');

api.get('/testClientController', clientController.testClientController);
api.get('/getClient/:idClient', [middleware.isLoged, middleware.isClient], clientController.getClient);
api.post('/register', clientController.register);
api.put('/updateClient/:idLoged', [middleware.isLoged, middleware.isClient], clientController.updateClient);
api.get("/getReservation/:idReservation", middleware.isLoged, clientController.getReservation);
api.post('/createReservation/:idClient/:idHotel', [middleware.isLoged, middleware.isClient], clientController.createReservation);
api.put("/updateRoom/:idReservation", [middleware.isLoged, middleware.isClient], clientController.updateRoom);
api.put("/pushDate/:idReservation/:idRoom", [middleware.isLoged, middleware.isClient], clientController.pushDate);
api.put("/pushServices/:idReservation", [middleware.isLoged, middleware.isClient], clientController.pushServices);
api.put("/confirmateReservation/:idReservation", [middleware.isLoged, middleware.isClient], clientController.confirmateReservation);
api.put("/cancelReservation/:idReservation", [middleware.isLoged, middleware.isClient], clientController.cancelReservation);
api.get("/getReservations/:idClient", middleware.isLoged, clientController.getReservations);
api.get("/getDates/:idRoom", middleware.isLoged, clientController.getDates);

module.exports = api;