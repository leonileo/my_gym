// authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler.js');
const Admin = require('../models/adminModel.js');
const Trainer = require('../models/trainerModel.js');
const Client = require('../models/clientModel.js');


// Protected admin routes
const protectAdmin = asyncHandler( async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.adminId).select('-password')

            next();
        } catch(error){
            res.status(401);
            throw new Error ("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error ("Not authorized, no token");
    }

} )

// Protected trainer routes
const protectTrainer = asyncHandler( async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.trainer = await Trainer.findById(decoded.trainerId).select('-password')

            next();
        } catch(error){
            res.status(401);
            throw new Error ("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error ("Not authorized, no token");
    }

} )

// Protected client routes
const protectClient = asyncHandler( async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.client = await Client.findById(decoded.clientId).select('-password');

            next();
        } catch(error){
            res.status(401);
            throw new Error ("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error ("Not authorized, no token");
    }

} )

// Client middleware
const client = (req, res, next) => {
    if (req.client && req.client.isClient) {
        next();
    } else {
        res.status(401);
        throw new Error ("Not authorized as client!");
    }
}

// Trainer middleware
const trainer = (req, res, next) => {
    if (req.trainer && req.trainer.isTrainer) {
        next();
    } else {
        res.status(401);
        throw new Error ("Not authorized as trainer!");
    }
}
// Admin middleware
const admin = (req, res, next) => {
    if (req.admin && req.admin.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error ("Not authorized as admin");
    }
}

module.exports = { protectAdmin, protectTrainer, protectClient, admin, client, trainer };