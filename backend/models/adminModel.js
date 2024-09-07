// DATA SCHEMA
// adminModel.js
// Imort necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    fatherName: {type: String, required: true},
    picture: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: true},
    isTrainer: {type: Boolean, default: false},
    isClient: {type: Boolean, default: false},
}, {timestamps: true})

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;