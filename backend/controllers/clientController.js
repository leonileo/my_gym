// clientContorller.js
// Import necessary modules
const asyncHandler = require("../middleware/asyncHandler.js");
const Client = require('../models/clientModel.js');
const Progress = require("../models/progressModel.js");
const Trainer = require("../models/trainerModel.js");
const Request = require('../models/requestModel.js')


// @desc    Return the client dashboard
// @route   GET /apiv1/client/dashboard
// @access  Private
const dashboard = asyncHandler( async(req, res) => {
    // production
    const client = await Client.findOne({_id: req.client._id});
    // development
    // const { email } = req.body;
    // const client = await Client.findOne({email: email});
    
    // checking if the account is not suspended
    if (client) {
        if (client.isAccountFrozen) {
            res.status(501);
            throw new Error('Access denied!');
        } else {
            const newClient =await Client.findOne({clientId: client.clientId}).select('-password')

            const myRequest = await Request.findOne({ client: client._id })

            const myProgress = await Progress.findOne({clientId: client.clientId})
            .populate('progress.workout', 'workoutName workoutCategory workoutPicture workoutDuration equipmentRequired')
            
            const myTrainer = newClient.trainerId !== null ? await Trainer.findOne({ trainerId: newClient.trainerId }).select('-password -clients')
            .populate('serviceList.service', 'serviceName')
            : null;

            const progress = await Progress.findOne({ progressId: client.progressId})
            .populate('progress.workout', 'workoutName workoutCategory workoutDescription workoutPicture workoutVideoLink workoutDuration workoutSteps equipmentRequired equipmentList')

            const today = new Date();

            const todaysWorkouts = progress.progress.filter(workout => {
                if (!workout.assignedDate) {
                    return false; // Skip workouts without assignedDate
                }
                const assignedDate = new Date(workout.assignedDate);
                return assignedDate.toDateString() === today.toDateString();
            });

            res.json({ myRequest, todaysWorkouts, myProgress: myProgress.progress , weightInfo: {WBF: newClient.weightBeforeTraining, WC: newClient.currentWeight, PW: newClient.plannedWeight}, myTrainer})
        }
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
})

// @desc    Return the workouts for client
// @route   GET /apiv1/client/workout
// @access  Private
const getWorkouts = asyncHandler( async(req, res) => {
    // production
    const client = await Client.findOne({_id: req.client._id});
    // development
    // const { email } = req.body;
    // const client = await Client.findOne({email: email});
     
    // checking if the account is not suspended
    if (client) {
        if (client.isAccountFrozen) {
            res.status(501);
            throw new Error('Access denied!');
        } else {
            const newClient =await Client.findOne({clientId: client.clientId}).select('-password')
            .populate('workoutsAssignedForMe.workout', 'workoutName workoutCategory workoutDescription workoutPicture workoutVideoLink workoutDuration workoutSteps equipmentRequired equipmentList')
            
            const progress = await Progress.findOne({ progressId: client.progressId})
            .populate('progress.workout', 'workoutName workoutCategory workoutDescription workoutPicture workoutVideoLink workoutDuration workoutSteps equipmentRequired equipmentList')

            const today = new Date();

            const todaysWorkouts = progress.progress.filter(workout => {
                if (!workout.assignedDate) {
                    return false; // Skip workouts without assignedDate
                }
                const assignedDate = new Date(workout.assignedDate);
                return assignedDate.toDateString() === today.toDateString();
            });

            res.json({workouts: newClient.workoutsAssignedForMe, trainer: client.trainerId, todaysWorkouts})
       }
    } else {
        res.status(404);
        throw new Error('Client not found');
}})

// @desc    Get a specific progress
// @route   GET /apiv1/client/progress/:id
// @access  Private
const GetProgress = asyncHandler( async(req, res) => {
    const { workoutId } = req.body;

    // production
    const client = await Client.findOne({_id: req.client._id}) 
    const pr = await Progress.findOne({progressId: client.progressId})
    // dev
    // const { workoutId, progressId } = req.body;
    // const pr = await Progress.findOne({progressId: progressId})

    const workoutIndex = pr.progress.findIndex(workout => 
        workout.workout && workout.workout._id.toString() === workoutId
    )
    if (workoutIndex !== -1) {
        res.json(pr.progress[workoutIndex])
    } else {
        throw new Error('Workout not found');
    }

})

// @desc    Update a workout
// @route   PUT /apiv1/client/workout/:id
// @access  Private
const updateWorkout = asyncHandler( async(req, res) => {
    const { workoutId, workout, clientPicture, weightInPicture, weightInNumber, progressDate, notes } = req.body;

    //  production
    const pr = await Progress.findOne({progressId: req.client.progressId}).populate("progress.workout", "workoutName")
    // dev
    // const pr = await Progress.findOne({progressId: req.params.id}).populate("progress.workout", "workoutName")
    const workoutIndex = pr.progress.findIndex(workout => 
        workout.workout && workout.workout._id.toString() === workoutId
    )

    if (workoutIndex !== -1) {
        pr.progress[workoutIndex] 
        = {
            workout: workout !== '' && workout || pr.progress[workoutIndex].workout,
            clientPicture: clientPicture !== '' && clientPicture || pr.progress[workoutIndex].clientPicture,
            weightInPicture: weightInPicture !== '' && weightInPicture || pr.progress[workoutIndex].weightInPicture,
            weightInNumber: weightInNumber !== '' && weightInNumber || pr.progress[workoutIndex].weightInNumber,
            isWorkoutDone: true,
            progressDate: progressDate !== '' && progressDate || pr.progress[workoutIndex].progressDate,
            assignedDate: pr.progress[workoutIndex].assignedDate,
            notes: notes !== '' && notes || pr.progress[workoutIndex].notes
        };
        // production
        await Client.findOneAndUpdate({_id: req.client._id}, {currentWeight: weightInNumber})
        // dev
        // await Client.findOneAndUpdate({clientId: clientId}, {currentWeight: weightInNumber})
        await pr.save();
        res.json(pr.progress[workoutIndex])

    } else {
        throw new Error('Workout not found');
    }

})

// @desc    Return chat for a clients
// @route   GET /apiv1/client/chat
// @access  Private
const getChats = asyncHandler( async(req, res) => {
    res.json("Client chats")
})

// @desc    Return the specific chat
// @route   GET /apiv1/client/chat/:id
// @access  Private
const getSpecificChat = asyncHandler( async(req, res) => {
    res.json("Client specific chat")
})

// @desc    Send a text to a specific chat
// @route   POST /apiv1/client/chat/:id
// @access  Private
const addChat = asyncHandler( async(req, res) => {
    res.json("Client - add chat")
})

// @desc    Return client profile
// @route   GET /apiv1/client/profile
// @access  Private
const getProfile = asyncHandler( async(req, res) => {
    // clinet information 
    const client = await Client.findOne({ _id: req.client._id} )
    .select('-password -workoutsAssignedForMe')

    const trainer = await Trainer.findOne({trainerId: client.trainerId}).select('-password')
    const myRequest = await Request.findOne({client: (client._id.toString())})

    const progress = await Progress.findOne({ progressId: client.progressId} )
    .populate('progress.workout', 'workoutName')

    res.json({myRequest, client, trainer, progress})
})

// @desc    Update the client profile
// @route   PUT /apiv1/client/profile
// @access  Private
const updateProfile = asyncHandler( async(req, res) => {
    const client = await Client.findOne({_id: req.client._id}).select('-password')

    const { email, phoneNo, firstName, fatherName, sex, DOB, picture } = req.body;

    if (client) {
        client.email = email ? email : client.email;
        client.phoneNo = phoneNo ? phoneNo : client.phoneNo;
        client.firstName = firstName ? firstName : client.firstName;
        client.fatherName = fatherName ? fatherName : client.fatherName;
        client.sex = sex ? sex : client.sex;
        client.DOB = DOB ? DOB : client.DOB;
        client.picture = picture ? picture : client.picture
        
        if (req.body.password) {
            client.password = req.body.password;
        }

        const updatedClient = await client.save();

        res.status(200).json({
            _id: updatedClient._id,
            email: client.email,
            phoneNo: client.phoneNo,
            firstName: client.firstName,
            fatherName: client.fatherName,
            sex: client.sex,
            DOB: client.DOB,
            isClient: client.isClient
        })
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
})

// @desc    Send a request for a trainer
// @route   POST /apiv1/client/add-trainer
// @access  Private
const addTrainer = asyncHandler( async(req, res) => {
    const { trainerId, note } = req.body;

    const trainer = await Trainer.findOne({trainerId: trainerId})

    if (trainer){
        const client = await Client.findOne({_id: req.client._id})
        const requestFound = await Request.findOne({clientId: client.clientId})

        if (requestFound){
            throw new Error('You have sent a request already.')
        } else {
            const requests = new Request({
                client: client._id,
                Approved: false,
                trainerId: trainerId,
                note
            })
    
            const newRequest = await requests.save()
            if (newRequest) {
                res.status(201).json(newRequest);
            } else {
                res.json('Request error');
            }
        }
    } else {
        throw new Error('Trainer not found.')
    }
})

// @desc    Remove a trainer
// @route   POST /apiv1/client/remove-trainer
// @access  Private
const removeTrainer = asyncHandler( async(req, res) => {
    const { trainerId } = req.body;

    const client = await Client.findOne({_id: req.client._id})

    if (client){
        const trainer = await Trainer.findOne({_id: trainerId})
        await Request.findOneAndDelete({client: client._id})
        await Trainer.updateOne({ email: trainer.email}, { $pull: { clients: {client: client._id} }})
        await Client.findOneAndUpdate({ _id: client._id}, { trainerId: null })
        res.json({message: "Successfully removed trainer!"})
    } else {
        throw new Error('Client not found.')
    }
})

// @desc    Update weight information
// @route   GET /apiv1/client/update-weight-info
// @access  Private
const updateWeightInfo = asyncHandler( async(req, res) => {
    const { weightBeforeTraining, currentWeight, plannedWeight } = req.body;
    const client = await Client.findOne({_id: req.client._id}).select('-password')

    if (client ) {
        client.weightBeforeTraining = weightBeforeTraining !== "" && weightBeforeTraining + " Killo";
        client.currentWeight = currentWeight !== "" && currentWeight + " Killo";
        client.plannedWeight = plannedWeight !== "" && plannedWeight + " Killo";

        client.save();
        res.status(200).json({message: "Weight successfuly updated!"})
    } else {
        throw new Error('Client not found')
    }
})

module.exports = {
    dashboard,
    getWorkouts,
    GetProgress,
    updateWorkout,
    getChats,
    getSpecificChat,
    addChat,
    getProfile,
    updateProfile,
    addTrainer,
    removeTrainer,
    updateWeightInfo
}