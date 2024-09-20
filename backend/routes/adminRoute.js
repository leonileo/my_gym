// API ROUTE and FUNCTION
// adminRoute.js
// Import necessary modules
const express = require('express');
const { protectAdmin, admin } = require('../middleware/authMiddleware.js');
const { dashboard, getClients, getTrainers, getChat, addChat, getProfile, updateProfile } = require('../controllers/adminController.js');

const router = express.Router();

router.get('/dashboard', protectAdmin, admin, dashboard)
router.get('/clients', protectAdmin, admin, getClients)
router.get('/trainers', protectAdmin, admin, getTrainers)
router.get('/chat', protectAdmin, admin, getChat)
router.route('/chat/:id')
.get(protectAdmin, admin, getChat)
.post(protectAdmin, admin, addChat)
router.route('/profile')
.get( protectAdmin, admin, getProfile)
.put( protectAdmin, admin, updateProfile)

module.exports = router;