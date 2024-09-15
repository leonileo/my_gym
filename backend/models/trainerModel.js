// DATA SCHEMA
// trainerModel.js
// Imort necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const trainerSchema = new mongoose.Schema({
    trainerId: {type: String, unique: true}, // format T-Id-0
    firstName: {type: String},
    fatherName: {type: String, unique: true},
    sex: {type: String},
    clients: {type: Array},
    picture: {type: String},
    verifiedTrainer: {type: Boolean},
    description: {type: String},
    serviceList: [{
        servicePicture: {type: String},
        serviceName: {type: String},
        serviceDescription: {type: String}
    }],
    email: {type: String, unique: true},
    phoneNo: {type: Number, unique: true},
    password: {type: String},
    myWorkouts: {type: Array},
    isAccountFrozen: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isTrainer: {type: Boolean, default: true},
    isClient: {type: Boolean, default: false},
}, {timestamps: true})

trainerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

trainerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer