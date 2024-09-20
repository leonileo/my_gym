// DATA SCHEMA
// clientModel.js
// Imort necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const clientSchema = new mongoose.Schema({    
    clientId: {type: String, unique: true},
    firstName: {type: String, required: true},
    fatherName: {type: String, required: true},
    sex: {type: String, required: true},
    DOB: {type: Date, required: true}, // format yyyy-mm-dd
    trainerId: {type: String, default: null},
    picture: {type: String},
    progressId: {type: String, unique: true},
    weightBeforeTraining: {type: String, default: "0 Killo"},
    currentWeight: {type: String, default: "0 Killo"},
    plannedWeight: {type: String, default: "0 Killo"},
    email: {type: String, unique: true},
    phoneNo: {type: Number, unique: true, default: null},
    password: {type: String},
    workoutsAssignedForMe: [{
        workout: {type: mongoose.Schema.Types.ObjectId, required: true, unique:true , ref: "Workout"},
    }],
    isAccountFrozen: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isTrainer: {type: Boolean, default: false},
    isClient: {type: Boolean, default: true},
}, {timestamps: true})

clientSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Client = mongoose.model("Client", clientSchema);
module.exports = Client