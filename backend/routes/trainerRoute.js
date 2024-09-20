// API ROUTE and FUNCTION
// trainerRoute.js
// Import necessary modules
const express = require('express');
const { protectTrainer, trainer } = require('../middleware/authMiddleware.js');
const { dashboard, getClients, getService, getWorkout, createWorkout, getClientRequest, updateClientRequest, updateWorkout, deleteWorkout, getChats, getSpecificChat, addChat, getProfile, updateProfile, createService, updateService, deleteService, getClientProgress, assignWorkout, removeAssignedWorkout } = require('../controllers/trainerController.js')

const router = express.Router();

router.get('/dashboard', protectTrainer, trainer, dashboard)
router.get('/my-clients',  protectTrainer, trainer, getClients)
router.route('/service-list')
.get( protectTrainer, trainer, getService)
.post( protectTrainer, trainer, createService)
router.route('/service-list/:id')
.put( protectTrainer, trainer, updateService)
.delete( protectTrainer, trainer, deleteService)

router.route('/workout')
.get( protectTrainer, trainer, getWorkout)
.post( protectTrainer, trainer, createWorkout)

router.route('/client-request')
.get( protectTrainer, trainer, getClientRequest)
router.route('/client-progress/')
.post( protectTrainer, trainer, getClientProgress)
router.route('/assign-workout')
.put( protectTrainer, trainer, assignWorkout)
router.route('/remove-assigned-workout')
.put( protectTrainer, trainer, removeAssignedWorkout)
router.route('/client-request/:id')
.put( protectTrainer, trainer, updateClientRequest)

router.route('/workout/:id')
.put( protectTrainer, trainer, updateWorkout)
.delete( protectTrainer, trainer, deleteWorkout)

router.get('/chat',  protectTrainer, trainer, getChats)
router.route('/chat/:id')
.get( protectTrainer, trainer, getSpecificChat)
.post( protectTrainer, trainer, addChat)
router.route('/profile')
.get( protectTrainer, trainer, getProfile)
.put( protectTrainer, trainer, updateProfile)


module.exports = router;