"use strict"

const managerController = require("../controllers/manager.controller");
const middleware = require("../services/middleware");
const express = require('express');
const api = express.Router();

api.post("/createRoom/:idHotel", [middleware.isLoged, middleware.isManager], managerController.createRoom);
api.post("/createEvent/:idHotel", [middleware.isLoged, middleware.isManager], managerController.createEvent);
api.put("/updateEvent/:idEvent", [middleware.isLoged, middleware.isManager], managerController.updateEvent);
api.delete("/deleteEvent/:idEvent", [middleware.isLoged, middleware.isManager], managerController.deleteEvent);
api.post('/createService/:idHotel', [middleware.isLoged, middleware.isManager], managerController.createService);
api.put('/updateService/:idService', [middleware.isLoged, middleware.isManager], managerController.updateService);
api.delete('/deleteService/:idService', [middleware.isLoged, middleware.isManager], managerController.deleteService);

module.exports = api;