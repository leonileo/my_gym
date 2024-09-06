// DATA SCHEMA
// progressModel.js
// Import necessary modules
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    date: {type: Date, required: true, unique: true},
    clientId: {type: String, required: true},
    clientPicture: {type: String, required: true},
    weightInPicture: {type: String, required: true},
    weightInNumber: {type: Number, required: true},
}, {timestamps: true});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;