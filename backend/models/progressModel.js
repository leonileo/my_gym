// DATA SCHEMA
// progressModel.js
// Import necessary modules
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    progressId: {type: String, required: true, unique: true},
    clientId: {type: String, required: true, unique: true},
    progress: [{
        workout: {type: mongoose.Schema.Types.ObjectId, ref: "Workout"},
        clientPicture: {type: String},
        weightInPicture: {type: String},
        weightInNumber: {type: Number},
        isWorkoutDone: {type: Boolean, default: false},
        progressDate: {type: Date},
        notes: {type: String}
    }]
}, {timestamps: true});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;

// tariner add workout for client 
// client id ena progress C-Id-2500 
// grab progress id from client keza
// workout-3 assign biyarglt ke progress lay yanen workout mechrsun check yedrgal keza
// workoutid, clientid, 

// find progress data with the client p id
// then filter the progress section by today,
// 