'use strict'

const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    idClient: {type: mongoose.Schema.ObjectId, ref:'Client'},
    idHotel: {type:mongoose.Schema.ObjectId, ref:'Hotel'},
    idReservation: {type: mongoose.Schema.ObjectId, ref:'Reservation'},
    date: Date,
    totalPrice: Number,
    totalDays: Number
});

module.exports = mongoose.model('Bill', billSchema);