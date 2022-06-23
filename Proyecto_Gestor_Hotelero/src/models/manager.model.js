'use strict'
const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model('Manager', managerSchema);