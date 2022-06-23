'use strict'

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String, 
    role: String
});

module.exports = mongoose.model('Admin', adminSchema);