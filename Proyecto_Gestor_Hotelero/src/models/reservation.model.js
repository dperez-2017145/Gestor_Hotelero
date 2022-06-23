'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    startDate: Date,
    finishDate: Date,
    idClient: {type: mongoose.Schema.ObjectId, ref:'Client'},
    idHotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'},
    rooms: [{
        room:{
            idRoom: {type: mongoose.Schema.ObjectId, ref: 'Room'},
            name: String,
            price: Number,
            subTotal: Number
        }
    }],
    services: [{
        service: {
            idService: {type: mongoose.Schema.ObjectId, ref: "HotelService"},
            name: String,
            price: Number,
            subTotal: Number
        }
    }],
    status: Boolean,
    total: Number
});

module.exports = mongoose.model('Reservation', reservationSchema);