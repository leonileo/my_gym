// DATA SCHEMA
// clientModel.js
// Imort necessary modules
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({    
    clientId: {type: String, unique: true},
    firstName: {type: String, required: true},
    fatherName: {type: String, required: true},
    sex: {type: String, required: true},
    DOB: {type: Date, required: true},
    trainerId: {type: String, default: null},
    picture: {type: String, required: true},
    progressId: {type: String},
    weightBeforeTraining: {type: String},
    currentWeight: {type: String},
    plannedWeight: {type: String},
    email: {type: String},
    phoneNo: {type: Number},
    password: {type: String},
    workoutsAssignedForMe: {type: Array},
    isAccountFrozen: {type: Boolean},
    isAdmin: {type: Boolean, default: false},
    isTrainer: {type: Boolean, default: false},
    isClient: {type: Boolean, default: true},
}, {timestamps: true})

const Client = mongoose.model("Client", clientSchema);
module.exports = Client