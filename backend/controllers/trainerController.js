// trainerContorller.js
// Import necessary modules
const asyncHandler = require("../middleware/asyncHandler.js");
const Trainer = require('../models/trainerModel.js');

// @desc    Return the trainer dashboard
// @route   GET /apiv1/trainer/dashboard
// @access  Private
const dashboard = asyncHandler( async(req, res) => {
    res.json("TrainerDashboard")
})

// @desc    Return the clients of a trainer 
// @route   GET /apiv1/trainer/my-clients
// @access  Private
const getClients = asyncHandler( async(req, res) => {
    res.json("Trainer - clients")
})

// @desc    Return the trainer service list
// @route   GET /apiv1/trainer/service-list
// @access  Private
const getService = asyncHandler( async(req, res) => {
    res.json("Trainer - service");
})

// @desc    Return the trainer workouts
// @route   GET /apiv1/trainer/workout
// @access  Private
const getWorkout = asyncHandler( async(req, res) => {
    res.json("Trainer - workout")
})

// @desc    Creates a workout 
// @route   POST /apiv1/trainer/workout
// @access  Private
const createWorkout = asyncHandler( async(req, res) => {
    res.json("Trainer - create workout")
})

// @desc    Update a workout 
// @route   PUT /apiv1/trainer/workout
// @access  Private
const updateWorkout = asyncHandler( async(req, res) => {
    res.json("Trainer - update workout")
})

// @desc    get a specific workout
// @route   GET /apiv1/trainer/workout/:id
// @access  Private
const getSpecificWorkout = asyncHandler( async(req, res) => {
    res.json("Trainer - specific workout")
})

// @desc    Delete a workout
// @route   DELETE /apiv1/trainer/workout/:id
// @access  Private
const deleteWorkout = asyncHandler( async(req, res) => {
    res.json("Trainer - delete workout")
})

// @desc    Return the clients requests
// @route   GET /apiv1/trainer/client-request
// @access  Private
const getClientRequest = asyncHandler( async(req, res) => {
    res.json("Trainer - client request")
})

// @desc    Update a client request
// @route   PUT /apiv1/trainer/client-request/:id
// @access  Private
const updateClientRequest = asyncHandler( async(req, res) => {
    res.json("Trainer - update request")
})

// @desc    Return chats for trainers
// @route   GET /apiv1/trainer/chat
// @access  Private
const getChats = asyncHandler( async(req, res) => {
    res.json("Trainer - get chats")
})

// @desc    Return specific chat
// @route   GET /apiv1/trainer/chat/:id
// @access  Private
const getSpecificChat = asyncHandler( async(req, res) => {
    res.json("Trainer - get specific chats")
})

// @desc    Add a text to a chat
// @route   POST /apiv1/trainer/chat/:id
// @access  Private
const addChat = asyncHandler( async(req, res) => {
    res.json("Trainer - add chat")
})

// @desc    Return trainers profile
// @route   GET /apiv1/trainer/profile
// @access  Private
const getProfile = asyncHandler( async(req, res) => {
    res.json("Trainer - profile")
})

// @desc    Update trainer profile
// @route   PUTT /apiv1/trainer/profile
// @access  Private
const updateProfile = asyncHandler( async(req, res) => {
    res.json("Trainer - update profile")
})



module.exports = {
    dashboard,
    getClients,
    getService,
    getWorkout,
    createWorkout,
    updateWorkout,
    getSpecificWorkout,
    deleteWorkout,
    getClientRequest,
    updateClientRequest,
    getChats,
    getSpecificChat,
    addChat,
    getProfile,
    updateProfile
}