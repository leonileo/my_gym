// API ROUTE and FUNCTION
// adminRoute.js
// Import necessary modules
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware.js');
const { dashboard, getClients, getTrainers, getChat, addChat, getProfile, updateProfile } = require('../controllers/adminController.js');

const router = express.Router();

router.get('/dashboard', protect, admin, dashboard)
router.get('/clients', protect, admin, getClients)
router.get('/trainers', protect, admin, getTrainers)
router.get('/chat', protect, admin, getChat)
router.route('/chat/:id')
.get(protect, admin, getChat)
.post(protect, admin, addChat)
router.route('/profile')
.get( protect, admin, getProfile)
.put( protect, admin, updateProfile)

module.exports = router;