'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');
const middleware = require("../services/middleware");

api.post('/login', adminController.login);
api.post("/createAdmin", [middleware.isLoged, middleware.isAdmin], adminController.createAdmin);
api.post("/createHotel", [middleware.isLoged, middleware.isAdmin], adminController.createHotel);
api.get("/getHotels", middleware.isLoged, adminController.getHotels);
api.get("/getHotel/:idHotel", middleware.isLoged, adminController.getHotel);
api.get("/getManagersAndClients", [middleware.isLoged, middleware.isAdmin], adminController.getManagersAndClients);
api.put("/updateHotel/:idHotel", [middleware.isLoged, middleware.isAdmin], adminController.updateHotel);
api.get("/getManager/:idManager", [middleware.isLoged, middleware.isAdmin], adminController.getManager); 
api.put("/updateManager/:idManager", [middleware.isLoged, middleware.isAdmin], adminController.updateManager);
api.delete("/deleteHotel/:idHotel", [middleware.isLoged, middleware.isAdmin], adminController.deleteHotel);

module.exports = api;