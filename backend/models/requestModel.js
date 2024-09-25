// DATA SCHEMA
// requestModel.js
// Import necessary modules
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, required: true, unique:true , ref: "Client"},
    Approved: {type: Boolean, required: true},
    date: {type: Date, required: true, default: new Date()},
    trainerId: {type: String, required: true},
    note: {type: String},
}, {timestamps: true});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;