// adminController.js
// Import necessary modules
const asyncHandler = require("../middleware/asyncHandler.js");
const Admin = require('../models/adminModel.js');

// @desc    Return the contents on dashboard 
// @route   GET /apiv1/admin/dashboard
// @access  Private
const dashboard = asyncHandler( async(req, res) => {
    res.json("Dashboard")
})

// @desc    Return all clients  
// @route   GET /apiv1/admin/clients
// @access  Private
const getClients = asyncHandler( async(req, res) => {
    res.json("Get clients")
})

// @desc    Return all trainers  
// @route   GET /apiv1/admin/trainers
// @access  Private
const getTrainers = asyncHandler( async(req, res) => {
    res.json("Get trainers")
})

// @desc    Return the support chat page
// @route   GET /apiv1/admin/chat
// @access  Private
const getChat = asyncHandler( async(req, res) => {
    res.json("Chats")
})

// @desc    Return a specific chat
// @route   GET /apiv1/admin/chat/:id
// @access  Private
const getSpecificChat = asyncHandler( async(req, res) => {
    res.json("Specific chat")
})

// @desc    Send a text to a specific chat
// @route   POST /apiv1/admin/chat/:id
// @access  Private
const addChat = asyncHandler( async(req, res) => {
    res.json("POST")
})

// @desc    Return the admin profile
// @route   GET /apiv1/admin/profile
// @access  Private
const getProfile = asyncHandler( async(req, res) => {
    res.json("Profile");
})

// @desc    Update the admin profile
// @route   PUT /apiv1/admin/profile
// @access  Private
const updateProfile = asyncHandler( async(req, res) => {
    res.json("Update profile");
})

module.exports = {
    dashboard,
    getClients,
    getTrainers,
    getChat,
    getSpecificChat,
    addChat,
    getProfile,
    updateProfile
}