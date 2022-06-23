'use strict'
const {dataObligatory} = require("../utils/validate");
const Room = require("../models/room.model");
const Event = require("../models/event.model");
const Service = require('../models/hotelService.model');

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
            return res.send(msg);
        }else{
            if(event.name != data.name){
                const eventFound = await Event.findOne({idHotel: event.idHotel ,name: params.name.toUpperCase()});
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