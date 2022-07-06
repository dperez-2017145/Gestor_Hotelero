"use strict"

const managerController = require("../controllers/manager.controller");
const middleware = require("../services/middleware");
const express = require('express');
const api = express.Router();

//ROOMS
api.get("/getRooms/:idHotel", middleware.isLoged, managerController.getRooms);
api.get("/getRoom/:idRoom", middleware.isLoged, managerController.getRoom);
api.post("/createRoom/:idHotel", [middleware.isLoged, middleware.isManager], managerController.createRoom);
api.put("/updateRoom/:idRoom", [middleware.isLoged, middleware.isManager], managerController.updateRoom);
api.delete("/deleteRoom/:idRoom", [middleware.isLoged, middleware.isManager], managerController.deleteRoom);

//EVENTS
api.post("/createEvent/:idHotel", [middleware.isLoged, middleware.isManager], managerController.createEvent);
api.put("/updateEvent/:idEvent", [middleware.isLoged, middleware.isManager], managerController.updateEvent);
api.delete("/deleteEvent/:idEvent", [middleware.isLoged, middleware.isManager], managerController.deleteEvent);

//SERVICES
api.post('/createService/:idHotel', [middleware.isLoged, middleware.isManager], managerController.createService);
api.put('/updateService/:idService', [middleware.isLoged, middleware.isManager], managerController.updateService);
api.delete('/deleteService/:idService', [middleware.isLoged, middleware.isManager], managerController.deleteService);

api.get('/getHotelByManager/:idManager', [middleware.isLoged, middleware.isManager], managerController.getHotelByManager);
api.get("/getReservationsByHotel/:idHotel", middleware.isLoged, managerController.getReservationsByHotel);
api.post("/generateBill/:idReservation", middleware.isLoged, managerController.generateBill);
api.get("/getReservationsHotel/:idHotel", middleware.isLoged, managerController.getReservationsHotel);

api.get("/getPeople/:idManager", [middleware.isLoged, middleware.isManager], managerController.getPeople);

module.exports = api;