'use strict'

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    status: Boolean,
    dates: [{
        date: {
            startDate: Date,
            finishDate: Date
        }
    }],
    idHotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'}
});

module.exports = mongoose.model('Room', roomSchema);