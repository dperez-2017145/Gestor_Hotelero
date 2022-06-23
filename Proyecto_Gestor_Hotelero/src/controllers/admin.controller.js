'use strict'

const Admin = require('../models/admin.model');
const Manager = require('../models/manager.model');
const Client = require('../models/client.model');
const Hotel = require('../models/hotel.model');
const jwt = require('../services/jwt');
const {dataObligatory, dencryptPassword, encryptPassword} = require('../utils/validate');

//FUNCIÓN PARA LOGEARSE
exports.login = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send({msg});
        }else{
            let admin = await Admin.findOne({username: params.username});
            let manager = await Manager.findOne({username: params.username});
            let client = await Client.findOne({username: params.username}); 
            if(admin && await dencryptPassword(params.password, admin.password)){
                const token = await jwt.createToken(admin);
                return res.status(200).send({token, admin, message: 'Entering the system...'});
            }else if(manager && await dencryptPassword(params.password, manager.password)){
                const token = await jwt.createToken(manager);
                return res.status(200).send({token, manager, message: 'Entering the system...'});
            }else if(client && await dencryptPassword(params.password, client.password)){
                const token = await jwt.createToken(client);
                return res.status(200).send({token, client, message: 'Entering the system...'});
            }else{
                return res.status(403).send({message: 'Incorrect username or password.'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA CREAR UN ADMINISTRADOR
exports.createAdmin = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: "ADMIN"
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send({msg});
        }else{
            const username = await Admin.findOne({username: params.username});
            if(username){
                return res.status(400).send({message: "This username already exist."});
            }else{
                data.password = await encryptPassword(data.password);
                let admin = new Admin(data);
                await admin.save();
                return res.status(200).send({message: "Admin created succesfully."});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA CREAR UN HOTEL Y MANAGER DEL HOTEL
exports.createHotel = async (req, res) => {
    try {
        const params = req.body;
        const dataManager = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: "MANAGER"
        }
        const dataHotel = {
            nameHotel: params.nameHotel.toUpperCase(),
            direction: params.direction,
            phone: params.phone,
            email: params.email,
            request: 0
        }
        const msgManager = await dataObligatory(dataManager);
        const msgHotel = await dataObligatory(dataHotel);
        if(msgManager || msgHotel){
            return res.status(400).send(`${msgManager} \n ${msgHotel}`);
        }else{
            const usernameManager = await Manager.findOne({username: params.username});
            const nameHotel = await Hotel.findOne({nameHotel: dataHotel.nameHotel});
            if(usernameManager || nameHotel){
                return res.status(400).send({message: "The username of manager or hotel already exist."});
            }else{
                dataManager.password = await encryptPassword(dataManager.password);
                let manager = new Manager(dataManager);
                await manager.save();
                //Parte dos de creación del hotel
                dataHotel.idManager = manager._id;
                let hotel = new Hotel(dataHotel);
                await hotel.save();
                return res.status(200).send({message: "Hotel and Manager created succesfully."});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA OBTENER TODOS LOS MANAGERS Y CLIENTS
exports.getManagersAndClients = async (req, res) => {
    try {
        const managers = await Manager.find();
        const clients = await Client.find();
        if(managers || clients){
            return res.status(200).send({managers, clients});
        }else{
            return res.status(404).send({message: "Users not found."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA OBTENER TODOS LOS HOTELES DE LA APLICACIÓN
exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        if(hotels){
            return res.status(200).send({hotels});
        }else{
            return res.status(400).send({message: "There is not hotels to show."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA EDITAR UN HOTEL
exports.updateHotel = async (req, res) => {
    try {
        const params = req.body;
        const idHotel = req.params.idHotel;
        const data = {
            nameHotel: params.nameHotel.toUpperCase(),
            direction: params.direction,
            phone: params.phone,
            email: params.email
        }
        const hotelFound = await Hotel.findOne({_id: idHotel});
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            if(hotelFound.nameHotel != data.nameHotel){
                const nameHotel = await Hotel.findOne({nameHotel: data.nameHotel});
                if(nameHotel){
                    return res.status(400).send({message: "The name of this hotel already exist."});
                }else{
                    const hotelUpdated = await Hotel.findOneAndUpdate({_id: idHotel}, data, {new: true});
                    return res.status(200).send({message: "Hotel updated succesfully.", hotelUpdated});
                }
            }else{
                const hotelUpdated = await Hotel.findOneAndUpdate({_id: idHotel}, data, {new: true});
                return res.status(200).send({message: "Hotel updated succesfully.", hotelUpdated});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA EDITAR UN MANAGER
exports.updateManager = async (req, res) => {
    try {
        const params = req.body;
        const idManager = req.params.idManager;
        const data = {
            name: params.name,
            username: params.username
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const manager = await Manager.findOne({_id: idManager});
            if(manager.username === data.username){
                const managerUpdated = await Manager.findOneAndUpdate({_id: idManager}, data, {new: true});
                return res.status(200).send({message: "Manager updated successfully.", managerUpdated});
            }else{
                const userManager = await Manager.findOne({username: data.username});
                if(userManager){
                    return res.status(400).send({message: "This username already exist."});
                }else{
                    const managerUpdated = await Manager.findOneAndUpdate({_id: idManager}, data, {new: true});
                    return res.status(200).send({message: "Manager updated successfully.", managerUpdated});
                }
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
