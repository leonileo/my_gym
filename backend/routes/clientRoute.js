// API ROUTE and FUNCTION
// clientRoute.js
// Import necessary modules
const express = require('express');
const { protect, client } = require('../middleware/authMiddleware.js');
const { dashboard, getWorkouts, updateWorkout, addTrainer, getChats, getSpecificChat, addChat, getProfile, updateProfile } = require('../controllers/clientController.js');

const router = express.Router();

router.get('/dashboard', protect, client, dashboard);
router.get('/workout', protect, client, getWorkouts);
router.get('/workout/:id', protect, client, updateWorkout);
router.post('/addtrainer', protect, client, addTrainer);
router.get('/chat', protect, client, getChats);
router.route('/chat/:id')
.get(protect, client, getSpecificChat)
.post(protect, client, addChat)
router.route('/profile')
.get(protect, client, getProfile)
.put(protect, client, updateProfile)

module.exports = router;