// adminController.js
// Import necessary modules
const asyncHandler = require("../middleware/asyncHandler.js");
const Admin = require('../models/adminModel.js');
const Client = require("../models/clientModel.js");
const Service = require("../models/serviceModel.js");
const Trainer = require("../models/trainerModel.js");
const Workout = require("../models/workoutModel.js");

// @desc    Return the contents on dashboard 
// @route   GET /apiv1/admin/dashboard
// @access  Private
const dashboard = asyncHandler( async(req, res) => {
    // display the number of clients, trainers, workouts, and services
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const clients = await Client.find({})
        const clientsLength = clients.length
        const trainers = (await Trainer.find({})).length
        const services = (await Service.find({})).length
        const workouts = await Workout.find({}).sort({_id: -1})
        const workoutsLength = workouts.length
        
        res.json({clients, clientsLength, trainers, services, workouts, workoutsLength})
    } else {
        throw new Error('Admin not found.')
    }

})

// @desc    Return all clients  
// @route   GET /apiv1/admin/clients
// @access  Private
const getClients = asyncHandler( async(req, res) => {
    // display the clients list.
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const clients = await Client.find({}).select('-password')
        const trainers = await Trainer.find({}).select('-password')

        res.json({clients, trainers})
    } else {
        throw new Error('Admin not found.')
    }
})

// @desc    Return all trainers  
// @route   GET /apiv1/admin/trainers
// @access  Private
const getTrainers = asyncHandler( async(req, res) => {
    // display the trainers list.
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const trainers = await Trainer.find({}).select('-password')

        res.json(trainers)
    } else {
        throw new Error('Admin not found.')
    }
})

// @desc    Return the admin profile
// @route   GET /apiv1/admin/profile
// @access  Private
const getProfile = asyncHandler( async(req, res) => {
    const admin = await Admin.findOne({_id: req.admin._id}).select('-password')

    res.json(admin)
})

// @desc    Update the admin profile
// @route   PUT /apiv1/admin/profile
// @access  Private
const updateProfile = asyncHandler( async(req, res) => {
    const admin = await Admin.findOne({_id: req.admin._id}).select('-password')

    const { email, phoneNo, firstName, fatherName, picture } = req.body;

    if (admin) {
        admin.email = email ? email : admin.email;
        admin.phoneNo = phoneNo ? phoneNo : admin.phoneNo;
        admin.firstName = firstName ? firstName : admin.firstName;
        admin.fatherName = fatherName ? fatherName : admin.fatherName;
        admin.picture = picture ? picture : admin.picture
        
        if (req.body.password) {
            admin.password = req.body.password !== "" && req.body.password;
        }

        const updatedAdmin = await admin.save();

        res.status(200).json({
            _id: updatedAdmin._id,
            email: admin.email,
            phoneNo: admin.phoneNo,
            firstName: admin.firstName,
            fatherName: admin.fatherName,
            isAdmin: admin.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
})

// @desc    Suspend client account
// @route   PUT /apiv1/admin/suspend-client-account
// @access  Private
const suspendClientAccount = asyncHandler( async(req, res) => {
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const { clientId } = req.body;
        await Client.findOneAndUpdate({clientId: clientId}, {isAccountFrozen: true})
     
        res.status(200).json({message: "SUCCESS"})
    } else {
        throw new Error('Admin not found.')
    }
})

// @desc    Activate client account
// @route   PUT /apiv1/admin/activate-client-account
// @access  Private
const activateClientAccount = asyncHandler( async(req, res) => {
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const { clientId } = req.body;
        await Client.findOneAndUpdate({clientId: clientId}, {isAccountFrozen: false})
     
        res.status(200).json({message: "SUCCESS"})
    } else {
        throw new Error('Admin not found.')
    }
})

// @desc    Suspend trainer account
// @route   PUT /apiv1/admin/suspend-trainer-account
// @access  Private
const suspendTrainerAccount = asyncHandler( async(req, res) => {
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const { trainerId } = req.body;
        await Trainer.findOneAndUpdate({trainerId: trainerId}, {isAccountFrozen: true})
     
        res.status(200).json({message: "SUCCESS"})
    } else {
        throw new Error('Admin not found.')
    }
})

// @desc    Activate client account
// @route   PUT /apiv1/admin/activate-client-account
// @access  Private
const activateTrainerAccount = asyncHandler( async(req, res) => {
    // checking admin account if exist
    const admin = await Admin.findOne({_id: req.admin._id})

    if (admin) {
        const { trainerId } = req.body;
        await Trainer.findOneAndUpdate({trainerId: trainerId}, {isAccountFrozen: false})
     
        res.status(200).json({message: "SUCCESS"})
    } else {
        throw new Error('Admin not found.')
    }
})

module.exports = {
    dashboard,
    getClients,
    getTrainers,
    getProfile,
    updateProfile,
    suspendClientAccount,
    activateClientAccount,
    suspendTrainerAccount,
    activateTrainerAccount
}