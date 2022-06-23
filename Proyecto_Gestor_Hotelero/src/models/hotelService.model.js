'use strict'

const mongoose = require('mongoose');

const hotelServiceSchema = mongoose.Schema({
    name: String,
    price: Number,
    idHotel: {type: mongoose.Schema.ObjectId, ref: 'Hotel'}
});

module.exports = mongoose.model('HotelService', hotelServiceSchema);