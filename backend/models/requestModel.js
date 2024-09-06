// DATA SCHEMA
// requestModel.js
// Import necessary modules
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    clientId: {type: String, required: true},
    Approved: {type: Boolean, required: true},
    date: {type: Date, required: true},
    trainerId: {type: String, required: true},
    note: {type: String},
}, {timestamps: true});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;