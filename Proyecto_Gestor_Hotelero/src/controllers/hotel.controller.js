'use strict'

const {dataObligatory} = require('../utils/validate');
const Room = require("../models/room.model");
const Event = require("../models/event.model");

//FUNCIÓN PARA OBTENER TODAS LAS HABITACIONS DE UN HOTEL
exports.getRooms = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const roomsHotel = await Room.find({idHotel: idHotel});
        if(roomsHotel){
            return res.status(200).send({roomsHotel});
        }else{
            return res.status(400).send({message: "There is not rooms to show."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA OBTENER LAS HABITACIONES DISPONIBLES DE UN HOTEL
exports.getAvaibleRooms = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const avaibleRooms = await Room.find({idHotel: idHotel, status: true});
        if(avaibleRooms){
            return res.status(200).send({avaibleRooms});
        }else{
            return res.status(400).send({message: "There is not avaible rooms."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA VER TODOS LOS EVENTOS DE UN HOTEL
exports.getEvents = async(req, res)=>{
    try{
        const idHotel = req.params.idHotel;
        const eventsFound = await Event.find({idHotel: idHotel});
        if(!eventsFound){
            return res.status(404).send({message: 'Events not available.'});
        }else{
            return res.status(200).send({eventsFound});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA VER UN EVENTO DE UN HOTEL
exports.getEvent = async(req, res)=>{
    try{
        const idEvent = req.params.idEvent;
        const eventFound = await Event.findOne({_id: idEvent});
        if(!eventFound){
            return res.status(404).send({message: 'Event not available.'});
        }else{
            return res.status(200).send({eventFound});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}