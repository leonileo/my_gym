// API ROUTE and FUNCTION
// authRoute.js
// Import necessary modules
const express = require('express');
const {
    signinAdmin,
    signinTrainer,
    signinClient,
    signupAdmin,
    signupTrainer,
    signupClient,
    signout
} = require('../controllers/authController');
const router = express.Router()

router.post('/signin/admin', signinAdmin);
router.post('/signin/trainer', signinTrainer);
router.post('/signin/client', signinClient);

router.post('/signup/admin', signupAdmin);
router.post('/signup/trainer', signupTrainer);
router.post('/signup/client', signupClient);

router.post('/signout', signout)

module.exports = router;