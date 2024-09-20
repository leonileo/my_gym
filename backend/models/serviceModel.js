// DATA SCHEMA
// serviceModel.js
// Imort necessary modules
const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    trainerId: {type: String, required: true},
    serviceName: {type: String, required: true, unique: true},
    serviceDescription: {type: String, required: true, unique: true},
    servicePicture: {type: String},
}, {timestamps: true})

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;