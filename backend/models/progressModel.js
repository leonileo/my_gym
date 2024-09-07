// DATA SCHEMA
// progressModel.js
// Import necessary modules
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    progressId: {type: String, required: true, unique: true},
    clientId: {type: String, required: true, unique: true},
    clientPicture: {type: String},
    weightInPicture: {type: String},
    weightInNumber: {type: Number},
}, {timestamps: true});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;