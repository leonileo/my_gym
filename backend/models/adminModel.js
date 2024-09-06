// DATA SCHEMA
// adminModel.js
// Imort necessary modules
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    fatherName: {type: String, required: true},
    picture: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: Number, required: true},
    isAdmin: {type: Boolean, default: true},
    isTrainer: {type: Boolean, default: false},
    isClient: {type: Boolean, default: false},
}, {timestamps: true})

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;