'use strict'
const {dataObligatory} = require("../utils/validate");
const Room = require("../models/room.model");
const Event = require("../models/event.model");
const Service = require('../models/hotelService.model');
const Hotel = require("../models/hotel.model");
const Reservation = require("../models/reservation.model");
const Bill = require("../models/bill.model");
const Client = require("../models/client.model");

//FUNCIÓN PARA CREAR UNA HABITACIÓN ASIGNADA A UN HOTEL.
exports.createRoom = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            type: params.type,
            price: params.price,
            status: true,
            idHotel: idHotel
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send({msg});
        }else{
            const nameRoom = await Room.findOne({name: data.name, idHotel: idHotel});
            if(nameRoom){
                return res.status(400).send({message: "The name room already exist."});
            }else{
                let room = new Room(data);
                await room.save();
                return res.status(200).send({message: "Room created succesfully."});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.updateRoom = async (req, res) =>{
    try {
        const params = req.body;
        const idRoom = req.params.idRoom;
        const data = {
            name: params.name.toUpperCase(),
            type: params.type,
            price: params.price,
            status: params.status
        }
        const room = await Room.findOne({_id: idRoom});
        const msg = dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            if(room.name != params.name.toUpperCase()){
                const roomFound = await Room.findOne({name: params.name.toUpperCase()});
                if(roomFound){
                    return res.status(400).send({message: 'This room already exist.'})
                }else{
                    const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, data, {new:true});
                    return res.status(200).send({message: 'Room updated successfully.', roomUpdated});
                }
            }else{
                    const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, data, {new:true});
                    return res.status(200).send({message: 'Room updated successfully.', roomUpdated});
            }
        }
    } catch (err) {
        console.log(err);
        return err
    }
}

exports.deleteRoom = async (req, res) =>{
    try{
        const idRoom = req.params.idRoom;
        const room = await Room.findOne({_id: idRoom});
        if(room){
            const roomDeleted = await Room.findOneAndDelete({_id: idRoom});
            return res.status(200).send({message: "Room deleted successfully.", roomDeleted});
        }else{
            res.status(404).send({message:'Room not found'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Obtener habitaciones de un hotel
exports.getRooms = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const rooms = await Room.find({idHotel: idHotel});
        if(rooms){
            return res.status(200).send({rooms});
        }else{
            return res.status(404).send({message: "There is not rooms to show."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.getRoom = async (req, res) =>{
    try {
        const idRoom = req.params.idRoom;
        const roomFound = await Room.findOne({_id: idRoom});
        if(roomFound){
            return res.status(200).send({roomFound});
        }else{
            return res.status(404).send({message: 'Room not found.'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}



//FUNCIÓN PARA CREAR UN EVENTO A UN HOTEL
exports.createEvent = async (req, res) => {
    try {
        const params = req.body;
        const idHotel = req.params.idHotel;
        const data = {
            name: params.name.toUpperCase(),
            type: params.type,
            description: params.description,
            idHotel: idHotel
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send({msg});
        }else{
            const nameEvent = await Event.findOne({name: data.name, idHotel: idHotel});
            if(nameEvent){
                return res.status(400).send({message: "The name of event already exist."});
            }else{
                let event = new Event(data);
                await event.save();
                return res.status(200).send({message: "Event created succesfully."});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//Función para actualizar un evento
exports.updateEvent = async(req, res) =>{
    try {
        const params = req.body;
        const idEvent = req.params.idEvent
        const data = {
            name: params.name.toUpperCase(),
            type: params.type,
            description: params.description,
        }
        const event = await Event.findOne({_id: idEvent});
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            if(event.name != data.name){
                const eventFound = await Event.findOne({idHotel: event.idHotel, name: params.name.toUpperCase()});
                if(eventFound){
                    return res.status(400).send({message:'Event name already exists'});
                }else{
                    const eventUpdated = await Event.findOneAndUpdate({_id: idEvent}, data, {new:true});
                    return res.status(200).send({message:'Event updated', eventUpdated});
                }
            }else{
                const eventUpdated = await Event.findOneAndUpdate({_id: idEvent}, data, {new:true});
                return res.status(200).send({message:'Event updated', eventUpdated});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para eliminar un usuario
exports.deleteEvent = async(req, res)=>{
    try{
        const idEvent = req.params.idEvent;
        const event = await Event.findOne({_id: idEvent});
        if(event){
            const eventDeleted = await Event.findOneAndDelete({_id: idEvent});
            return res.status(200).send({message: "Event deleted successfully.", eventDeleted});
        }else{
            res.status(404).send({message:'Event not found'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA CREAR UN SERVICIO DE UN HOTEL
exports.createService = async(req, res)=>{
    try{
        const idHotel = req.params.idHotel;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            price: params.price,
            idHotel: idHotel
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const nameService = await Service.findOne({name: data.name, idHotel: data.idHotel});
            if(nameService){
                return res.status(400).send({message: "The name of service already exist."});
            }else{
                let service = new Service(data);
                await service.save();
                return res.status(200).send({message: "Service created succesfully."});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA EDITAR EL SERVICIO DE UN HOTEL
exports.updateService = async(req, res)=>{
    try{
        const idService = req.params.idService;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            price: params.price,
        }
        const service = await Service.findOne({_id: idService});
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            if(service.name != data.name){
                const nameService = await Service.findOne({name: data.name, idHotel: service.idHotel});
                if(nameService){
                    return res.status(400).send({message: "The name of service already exist."});
                }else{
                    const serviceUpdated = await Service.findOneAndUpdate({_id: idService}, data, {new:true});
                    return res.status(200).send({message: 'Service updated succesfully.'});
                }
            }else{
                const serviceUpdated = await Service.findOneAndUpdate({_id: idService}, data, {new:true});
                return res.status(200).send({message: 'Service updated succesfully.'});
            }   
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA ELIMINAR EL SERVICIO DE UN HOTEL
exports.deleteService = async(req, res)=>{
    try{
        const idService = req.params.idService;
        const serviceFound = await Service.findOne({_id: idService});
        if(!serviceFound){
            return res.status(404).send({message: 'This service does not exist.'});
        }else{
            const serviceDeleted = await Service.findOneAndDelete({_id: idService});
            return res.status(200).send({message: 'Service deleted.'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//FUNCION PARA OBTENER UN HOTEL A TRAVES DEL ID DEL MANAGER
exports.getHotelByManager = async(req, res)=>{
    try {
        const idManager = req.params.idManager;
        const hotelFound = await Hotel.findOne({idManager: idManager});
        if(!hotelFound){
            res.status(404).send({message:'Hotel not found'});
        }else{
            res.status(200).send({hotelFound});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCION PARA OBTENER TODAS LAS RESERVACIONES QUE TIENE UN HOTEL   
exports.getReservationsByHotel = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const reservations = await Reservation.find({idHotel: idHotel});
        return res.status(200).send({reservations});
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.generateBill = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation}).populate('idClient').populate('idHotel').populate('room');
        const data = {
            dateBill: new Date(),
            startDate: reservation.startDate,
            finishDate: reservation.finishDate,
            clientName: reservation.idClient.name + " " + reservation.idClient.lastname,
            hotelName: reservation.idHotel.nameHotel,
            room: reservation.room.name,
            services: reservation.services,
            total: reservation.total,
            days: reservation.days
        }
        let bill = new Bill(data);
        await bill.save();
        const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {status: true}, {new: true});
        return res.status(200).send({bill, message: "Bill generated."});
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.getReservationsHotel = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const reservations = await Reservation.find({idHotel: idHotel, status: false}).populate('idClient').populate('idHotel').populate('room');
        return res.status(200).send({reservations});
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.getPeople = async (req, res) => {
    try {
        const idManager = req.params.idManager;
        let arrayUsers = [];
        const hotel = await Hotel.findOne({idManager: idManager});
        //Se almacenan las reservaciones del hotel capturado arriba
        const reservations = await Reservation.find({idHotel: hotel._id});
        for(let i = 0; i < reservations.length; i++){
            const user = await Client.findOne({_id: reservations[i].idClient});
            if(!arrayUsers.includes(user.username)){
                const user = await Client.findOne({_id: reservations[i].idClient});
                arrayUsers.push(user.username);
            }
        }
        return res.status(200).send({arrayUsers});
    } catch (err) {
        console.log(err);
        return err;
    }
}