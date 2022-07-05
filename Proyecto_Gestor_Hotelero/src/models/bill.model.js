'use strict'

const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    dateBill: Date,
    startDate: Date,
    finishDate: Date,
    clientName: String,
    hotelName: String,
    room: String,
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

module.exports = mongoose.model('Bill', billSchema);