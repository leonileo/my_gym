// DATA SCHEMA
// trainerModel.js
// Imort necessary modules
const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    trainerId: {type: String, unique: true},
    firstName: {type: String},
    fatherName: {type: String, unique: true},
    sex: {type: String},
    clients: {type: Array},
    picture: {type: String},
    verifiedTrainer: {type: Boolean},
    description: {type: String},
    serviceList: {type: Array},
    email: {type: String},
    phoneNo: {type: Number},
    myWorkouts: {type: Array},
    isAccountFrozen: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isTrainer: {type: Boolean, default: true},
    isClient: {type: Boolean, default: false},
}, {timestamps: true})

const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer