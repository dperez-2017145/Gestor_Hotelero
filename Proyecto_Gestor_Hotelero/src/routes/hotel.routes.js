'use strict'

const hotelController = require('../controllers/hotel.controller');
const middleware = require('../services/middleware');
const express = require('express');
const api = express.Router();

api.get("/getRooms/:idHotel", middleware.isLoged, hotelController.getRooms);
api.get("/getAvaibleRooms/:idHotel", middleware.isLoged, hotelController.getAvaibleRooms);
api.get('/getEvents/:idHotel', middleware.isLoged, hotelController.getEvents);
api.get('/getEvent/:idEvent', middleware.isLoged, hotelController.getEvent);
api.get('/getServices/:idHotel', middleware.isLoged, hotelController.getServices);
api.get('/getService/:idService', middleware.isLoged, hotelController.getService);

module.exports = api;