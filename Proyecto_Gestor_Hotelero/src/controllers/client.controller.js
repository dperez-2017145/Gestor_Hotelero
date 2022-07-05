'use strict'

const Client = require('../models/client.model');
const {dataObligatory, encryptPassword, getRange} = require('../utils/validate');
const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');
const moment = require("moment");
const HotelService = require("../models/hotelService.model");
const Hotel = require("../models/hotel.model");

exports.testClientController = (req, res)=>{
    return res.send({message: 'The function test client controller is running.'});
}

//Función para que un cliente se pueda registrar dentro de la aplicación.
exports.register = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            lastname: params.lastname,
            email: params.email, 
            phone: params.phone,
            username: params.username,
            password: params.password,
            role: 'CLIENT'
        }

        const msg = await dataObligatory(data);
        
        if(msg){
            return res.status(400).send({msg});
        }else{
            const usernameFound = await Client.findOne({username: params.username});
            if(usernameFound){
                return res.send({message: 'This username already exist.'});
            }else{
                data.password = await encryptPassword(params.password);
                let client = new Client(data);
                await client.save();
                return res.status(200).send({message: 'Account created successfully'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getClient = async(req, res)=>{
    try {
        const idClient = req.params.idClient;
        const clientFound = await Client.findOne({_id: idClient});
        return res.status(200).send({clientFound});
    } catch (err) {
        console.log(err);
        return err;
    }
}

//Función para actualizar a un cliente
exports.updateClient = async(req, res)=>{
    try {
        const idClient = req.params.idLoged;
        const params = req.body;
        const data = {
            name: params.name,
            lastname: params.lastname,
            email: params.email,
            phone: params.phone,
            username: params.username
        }
        const client = await Client.findOne({_id: idClient});
        const msg = await dataObligatory(data);
        if(msg){
            return res.send(msg);
        }else{
            if(client.username != data.username){
                const clientFound = await Client.findOne({username: params.username}) 
                if(clientFound){
                    return res.status(400).send({message: 'This username already exist.'});
                }else{
                    const clientUpdated = await Client.findOneAndUpdate({_id: idClient}, data, {new:true});
                    return res.status(200).send({message:'User updated', clientUpdated});
                }
            }else{
                const clientUpdated = await Client.findOneAndUpdate({_id: idClient}, data, {new:true});
                return res.status(200).send({message:'User updated', clientUpdated});

            }
        }
    }catch (err) {
        console.log(err);
        return err;   
    }
}

//FUNCIÓN PARA CREAR UNA RESERVACIÓN CON SUS CAMPOS VACIOS
exports.createReservation = async (req, res) => {
    try {
        const idClient = req.params.idClient;
        const idHotel = req.params.idHotel;
        const data = {
            startDate: "",
            finishDate: "",
            idClient: idClient,
            idHotel: idHotel,
            services: [],
            total:0,
            status: false
        }
        let reservation = new Reservation(data);
        await reservation.save();
        return res.status(200).send({message: "Reservation created successfully.", reservation});
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCION PARA OBTENER UNA RESERVACION POR MEDIO DEL ID
exports.getReservation = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation});
        return res.status(200).send({reservation});
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA ACTUALIZAR LA HABITACIÓN DE UNA RESERVACION
exports.updateRoom = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const params = req.body;
        const data = {
            room: params.room
        } 
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, data, {new: true});
            return res.status(200).send({reservationUpdated, message: "Reservation updated."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA ASIGNAR LA FECHA QUE DESEO RESERVAR
exports.pushDate = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const idRoom = req.params.idRoom;
        const params = req.body;
        const data = {
            startDate: params.startDate,
            finishDate: params.finishDate
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            var startDate = new Date(data.startDate);
            var finishDate = new Date(data.finishDate);
            const room = await Room.findOne({_id: idRoom});
            //Aquí se almacena el arreglo de fechas de la habitacion encontrada
            const arrayDates = Object.values(room.dates);
            //Aqui se realiza la reservacion sin búsqueda ya que no hay ninguna fecha en el arreglo 
            if(arrayDates.length === 0){
                const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, {
                    $push: {
                        dates: [{
                            date:{
                                startDate: startDate,
                                finishDate: finishDate
                            }
                        }]
                    }
                }, {new: true});
                const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {startDate: startDate, finishDate: finishDate}, {new: true});
                return res.status(200).send({message: "Reservation created successfully."});
            }
            //Aqui se realiza la reservacion con búsqueda ya que ya hay fechas y se necesita comparar. 
            else{
                var arrayResults = [];
                arrayDates.forEach((item) => {
                    //ESTOS VIENEN DE LA DB
                    var start = item.date.startDate;
                    var final = item.date.finishDate;
                    //Verifico los rangos de fechas
                    let rangoFechasInicio = getRange(start, final, startDate);   
                    let rangoFechasFinal = getRange(start, final, finishDate);     
                    //ARRAY que almacena el resultado de cada vuelta
                    arrayResults.push(rangoFechasInicio);
                    arrayResults.push(rangoFechasFinal); 
                });
                console.log(arrayResults);
                if(arrayResults.includes(true)){
                    return res.status(400).send({message: "This room cannot be reserve on this date."});
                }else{
                    const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, {
                        $push: {
                            dates: [{
                                date:{
                                    startDate: startDate,
                                    finishDate: finishDate
                                }
                            }]
                        }
                    }, {new: true});
                    const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {startDate: startDate, finishDate: finishDate}, {new: true});
                    return res.status(200).send({message: "Room added succesffuly on date selected."});
                }
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA PUSHEAR SERVICIOS AL ARREGLO DE LA FUNCION
exports.pushServices = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const params = req.body;
        const data = {
            idService: params.idService
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const service = await HotelService.findOne({_id: data.idService});
            const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {
                $push: {
                    services: [{
                        service: {
                            idService: service._id,
                            name: service.name,
                            price: service.price
                        }
                    }]
                }
            }, {new: true});
            return res.status(200).send({message: "Service added successfully."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA CONFIRMAR RESERVACIÓN
exports.confirmateReservation = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation});
        //Calculamos el número de días que se estará en el hotel
        let date1 = reservation.startDate;
        let date2 = reservation.finishDate;
        let difference = Math.abs(date2-date1);

        //DIAS
        let days = difference/(1000 * 3600 * 24);
        
        //PRICE
        const room = await Room.findOne({_id: reservation.room});
        let priceRoom = room.price;

        //SE CALCULA EL HOSPEDAJE
        let totalHospedaje = days*priceRoom;

        //ARREGLO DE SERVICIOS
        const arrayService = Object.values(reservation.services);
        
        //Total de servicios
        let totalServices = 0;
        arrayService.forEach((item) => {
            totalServices += item.service.price;
        });
        const hotel = await Hotel.findOne({_id: reservation.idHotel});
        let request = hotel.request;
        const hotelUpdated = await Hotel.findOneAndUpdate({_id: reservation.idHotel}, {request: request + 1}, {new: true});
        const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {total: totalHospedaje+totalServices, days: days}, {new: true});
        return res.status(200).send({message: "Reservation made."});
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA CANCELAR UNA RESERVACION 
exports.cancelReservation = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation});
        const idRoom = reservation.room;
        const room = await Room.findOne({_id: idRoom});
        const arrayDates = Object.values(room.dates);
        
        
        
        //const reservationDeleted = await Reservation.findOneAndDelete({_id: idReservation});
        return res.status(200).send({message: "Reservation canceled!"});
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCION PARA OBTENER TODAS LAS RESERVACION QUE HA HECHO UN CLIENTE
exports.getReservations = async (req, res) => {
    try {
        const idClient = req.params.idClient;
        const reservations = await Reservation.find({idClient: idClient}).populate('room').populate('services').populate('idHotel');
        return res.status(200).send({reservations});
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.getDates = async (req, res) => {
    try {
        const idRoom = req.params.idRoom;
        const room = await Room.findOne({_id: idRoom});
        return res.status(200).send({room});
    } catch (err) {
        console.log(err);
        return err;
    }
}