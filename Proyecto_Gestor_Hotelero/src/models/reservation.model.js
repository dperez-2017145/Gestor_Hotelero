'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    startDate: Date,
    finishDate: Date,
    idClient: {type: mongoose.Schema.ObjectId, ref:'Client'},
    idHotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'},
    room: {type: mongoose.Schema.ObjectId, ref:'Room'},
    services: [{
        service: {
            idService: {type: mongoose.Schema.ObjectId, ref: "HotelService"},
            name: String,
            price: Number
        }
    }],
    days: Number,
    total: Number
});

module.exports = mongoose.model('Reservation', reservationSchema);