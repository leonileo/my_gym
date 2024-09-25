// API ROUTE and FUNCTION
// adminRoute.js
// Import necessary modules
const express = require('express');
const { protectAdmin, admin } = require('../middleware/authMiddleware.js');
const { dashboard, getClients, getTrainers, getProfile, updateProfile, suspendClientAccount, suspendTrainerAccount, activateClientAccount, activateTrainerAccount } = require('../controllers/adminController.js');

const router = express.Router();

router.get('/dashboard', protectAdmin, admin, dashboard)
router.get('/clients', protectAdmin, admin, getClients)
router.get('/trainers', protectAdmin, admin, getTrainers)
router.route('/profile')
.get( protectAdmin, admin, getProfile)
.put( protectAdmin, admin, updateProfile)
router.put('/suspend-client-account', protectAdmin, admin, suspendClientAccount)
router.put('/activate-client-account', protectAdmin, admin, activateClientAccount);

router.put('/suspend-trainer-account', protectAdmin, admin, suspendTrainerAccount)
router.put('/activate-trainer-account', protectAdmin, admin, activateTrainerAccount);

module.exports = router;