// DATA SCHEMA
// workoutModel.js
// Imort necessary modules
const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    trainerId: {type: String, required: true, unique: true},
    workoutName: {type: String, required: true},
    workoutCategory: {type: String, required: true},
    workoutDescription: {type: String, required: true},
    workoutPicture: {type: String, required: true},
    workoutVideoLink: {type: String},
    workoutDuration: {type: String, required: true},
    workoutSteps: {type: String, required: true},
    equipmentRequired: {type: Boolean, required: true},
    equipmentList: {type: Array}
}, {timestamps: true})

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;