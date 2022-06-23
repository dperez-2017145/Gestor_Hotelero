'use strict'

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    type: String,
    description: String,
    idHotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'}
});

module.exports = mongoose.model('Event', eventSchema);