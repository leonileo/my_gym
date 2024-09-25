// API ROUTE and FUNCTION
// clientRoute.js
// Import necessary modules
const express = require('express');
const { protectClient, client } = require('../middleware/authMiddleware.js');
const { dashboard, getWorkouts, updateWorkout, addTrainer, getProfile, updateProfile, GetProgress, updateWeightInfo, removeTrainer } = require('../controllers/clientController.js');

const router = express.Router();

router.get('/dashboard', protectClient, client, dashboard);
router.route('/workout')
.get(protectClient, client, getWorkouts)
.put(protectClient, client, updateWorkout)
router.post('/progress', protectClient, client, GetProgress);
router.post('/add-trainer', protectClient, client, addTrainer);
router.put('/remove-trainer', protectClient, client, removeTrainer);
router.route('/profile')
.get(protectClient, client, getProfile)
.put(protectClient, client, updateProfile)
router.put('/update-weight-info', protectClient, client, updateWeightInfo)
module.exports = router;