'use strict'

const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    nameHotel: String,
    direction: String,
    phone: String,
    email: String,
    request: Number,
    idManager: {type: mongoose.Schema.ObjectId, ref: 'Manager'}
});

module.exports = mongoose.model('Hotel', hotelSchema);