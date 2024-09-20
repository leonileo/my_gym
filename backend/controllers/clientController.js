// clientContorller.js
// Import necessary modules
const asyncHandler = require("../middleware/asyncHandler.js");
const Client = require('../models/clientModel.js');
const Progress = require("../models/progressModel.js");

// @desc    Return the client dashboard
// @route   GET /apiv1/client/dashboard
// @access  Private
const dashboard = asyncHandler( async(req, res) => {
    res.json("Client dashboard")
})

// @desc    Return the workouts for client
// @route   GET /apiv1/client/workout
// @access  Private
const getWorkouts = asyncHandler( async(req, res) => {
    res.json("Client - Get workouts")
})

// @desc    Update a workout
// @route   PUT /apiv1/client/workout/:id
// @access  Private
const updateWorkout = asyncHandler( async(req, res) => {
    const { workoutId } = req.body;

    const pr = await Progress.findOne({progressId: req.params.id}).populate("progress.workout", "workoutName")
    const workoutIndex = pr.progress.findIndex(workout => 
        workout.workout && workout.workout._id.toString() === workoutId
    )

    if (workoutIndex !== -1) {
        pr.progress[workoutIndex] 
        = {
            workout: req.body.workout || pr.progress[workoutIndex].workout,
            clientPicture: req.body.clientPicture || pr.progress[workoutIndex].clientPicture,
            weightInPicture: req.body.weightInPicture || pr.progress[workoutIndex].weightInPicture,
            weightInNumber: req.body.weightInNumber || pr.progress[workoutIndex].weightInNumber,
            isWorkoutDone: req.body.isWorkoutDone || pr.progress[workoutIndex].isWorkoutDone,
            progressDate: req.body.progressDate || pr.progress[workoutIndex].progressDate,
            notes: req.body.notes || pr.progress[workoutIndex].notes
        };
    await pr.save().then(res => console.log(res));

    } else {
        throw new Error('Workout not found');
    }

})

// @desc    Return chat for a clients
// @route   GET /apiv1/client/chat
// @access  Private
const getChats = asyncHandler( async(req, res) => {
    res.json("Client chats")
})

// @desc    Return the specific chat
// @route   GET /apiv1/client/chat/:id
// @access  Private
const getSpecificChat = asyncHandler( async(req, res) => {
    res.json("Client specific chat")
})

// @desc    Send a text to a specific chat
// @route   POST /apiv1/client/chat/:id
// @access  Private
const addChat = asyncHandler( async(req, res) => {
    res.json("Client - add chat")
})

// @desc    Return client profile
// @route   GET /apiv1/client/profile
// @access  Private
const getProfile = asyncHandler( async(req, res) => {
    res.json("Client - Profile")
})

// @desc    Update the client profile
// @route   PUT /apiv1/client/profile
// @access  Private
const updateProfile = asyncHandler( async(req, res) => {
    res.json("Client - Update profile")
})

// @desc    Return the support chat page
// @route   GET /apiv1/admin/chat
// @access  Private
const addTrainer = asyncHandler( async(req, res) => {
    res.json("Client - add trainers")
})

module.exports = {
    dashboard,
    getWorkouts,
    updateWorkout,
    getChats,
    getSpecificChat,
    addChat,
    getProfile,
    updateProfile,
    addTrainer
}