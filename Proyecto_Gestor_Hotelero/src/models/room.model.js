'use strict'

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    status: Boolean,
    idHotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'}
});

module.exports = mongoose.model('Room', roomSchema);