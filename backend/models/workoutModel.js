// DATA SCHEMA
// workoutModel.js
// Imort necessary modules
const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    trainerId: {type: String, required: true},
    workoutName: {type: String, required: true, unique: true},
    workoutCategory: {type: String, required: true},
    workoutDescription: {type: String, required: true, unique: true},
    workoutPicture: {type: String},
    workoutVideoLink: {type: String},
    workoutDuration: {type: String, required: true},
    workoutSteps: {type: String},
    equipmentRequired: {type: Boolean, required: true},
    equipmentList: {type: Array}
}, {timestamps: true})

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;