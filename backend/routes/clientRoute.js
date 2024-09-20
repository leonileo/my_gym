// API ROUTE and FUNCTION
// clientRoute.js
// Import necessary modules
const express = require('express');
const { protectClient, client } = require('../middleware/authMiddleware.js');
const { dashboard, getWorkouts, updateWorkout, addTrainer, getChats, getSpecificChat, addChat, getProfile, updateProfile } = require('../controllers/clientController.js');

const router = express.Router();

router.get('/dashboard', protectClient, client, dashboard);
router.get('/workout', protectClient, client, getWorkouts);
router.put('/workout/:id',
    //  protectClient, client, 
     updateWorkout);
router.post('/addtrainer', protectClient, client, addTrainer);
router.get('/chat', protectClient, client, getChats);
router.route('/chat/:id')
.get(protectClient, client, getSpecificChat)
.post(protectClient, client, addChat)
router.route('/profile')
.get(protectClient, client, getProfile)
.put(protectClient, client, updateProfile)

module.exports = router;