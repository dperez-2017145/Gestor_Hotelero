'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');
const middleware = require("../services/middleware");

api.post('/login', adminController.login);
api.post("/createAdmin", [middleware.isLoged, middleware.isAdmin], adminController.createAdmin);
api.post("/createHotel", [middleware.isLoged, middleware.isAdmin], adminController.createHotel);
api.get("/getHotels", middleware.isLoged, adminController.getHotels);
api.get("/getManagersAndClients", [middleware.isLoged, middleware.isAdmin], adminController.getManagersAndClients);
api.put("/updateHotel/:idHotel", [middleware.isLoged, middleware.isAdmin], adminController.updateHotel);
api.put("/updateManager/:idManager", [middleware.isLoged, middleware.isAdmin], adminController.updateManager);

module.exports = api;