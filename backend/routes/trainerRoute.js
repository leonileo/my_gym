// API ROUTE and FUNCTION
// trainerRoute.js
// Import necessary modules
const express = require('express');
const { protect, trainer } = require('../middleware/authMiddleware.js');
const { dashboard, getClients, getService, getWorkout, createWorkout, getClientRequest, updateClientRequest, updateWorkout, getSpecificWorkout, deleteWorkout, getChats, getSpecificChat, addChat, getProfile, updateProfile } = require('../controllers/trainerController.js')

const router = express.Router();

router.get('/dashboard', protect, trainer, dashboard)
router.get('/my-clients', protect, trainer, getClients)
router.get('/service-list', protect, trainer, getService)
router.route('/workout')
.get(protect, trainer, getWorkout)
.post(protect, trainer, createWorkout)

router.route('/client-request')
.get(protect, trainer, getClientRequest)
.put(protect, trainer, updateClientRequest)

router.route('/workout/:id')
.get(protect, trainer, getSpecificWorkout)
.put(protect, trainer, updateWorkout)
.delete(protect, trainer, deleteWorkout)

router.get('/chat', protect, trainer, getChats)
router.route('/chat/:id')
.get(protect, trainer, getSpecificChat)
.post(protect, trainer, addChat)
router.route('/profile')
.get(protect, trainer, getProfile)
.put(protect, trainer, updateProfile)


module.exports = router;