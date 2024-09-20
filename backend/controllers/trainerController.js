// trainerContorller.js
// Import necessary modules
const asyncHandler = require("../middleware/asyncHandler.js");
const Trainer = require('../models/trainerModel.js');
const Client = require('../models/clientModel.js');
const Request = require('../models/requestModel.js');
const Workout = require('../models/workoutModel.js');
const Service = require("../models/serviceModel.js");
const Progress = require("../models/progressModel.js");
const Category = require("../models/categoryModel.js");

// @desc    Return the trainer dashboard
// @route   GET /apiv1/trainer/dashboard
// @access  Private
const dashboard = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {

            // status: clients, requests, services, and workouts
            const clients = await Client.find({trainerId : trainer.trainerId}).select('-password');
            const requests = await Request.find({trainerId: trainer.trainerId});
            const services = await Service.find({trainerId: trainer.trainerId});
            const workouts = await Workout.find({trainerId: trainer.trainerId}); 
            
            // statuses
            const clientStatus = clients.length;
            const requestStatus = requests.length;
            const serviceStatus = services.length;
            const workoutStatus = workouts.length; 
        
            // progress
            let progress = [];
            
            // loop through clients 
            await Promise.all(clients.map(async (client) => {
                const p = await Progress.findOne({ clientId: client.clientId });
                const a = await Client.findOne({ clientId: client.clientId }).select('-password');
                return progress.push({
                    progressData: p,
                    clientData: {
                    'weightBeforeTraining': a.weightBeforeTraining,
                    'currentWeight': a.currentWeight,
                    'plannedWeight': a.plannedWeight
                    }
                })
            }));

            res.json({
                status: {clientStatus, requestStatus, serviceStatus, workoutStatus},
                request: {requests},
                clients: {clients},
                progresses: progress
            })
        }

    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }

})

// @desc    Return the clients of a trainer 
// @route   GET /apiv1/trainer/my-clients
// @access  Private
const getClients = asyncHandler( async(req, res) => {
    // get only the trainer's clients
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const clients = await Client.find({trainerId : trainer.trainerId}).select('-password');

            res.json({
                myClients: clients
            })
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Return the trainer service list
// @route   GET /apiv1/trainer/service-list
// @access  Private
const getService = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const services = await Service.find({trainerId : trainer.trainerId});

            res.json({
                myServices: services
            });
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }

})

// @desc    Return the trainer workouts
// @route   GET /apiv1/trainer/workout
// @access  Private
const getWorkout = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});
 
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const workouts = await Workout.find({trainerId : trainer.trainerId});

            res.json({
                myWorkouts: workouts
            });
                }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
    
})

// @desc    Creates a service 
// @route   POST /apiv1/trainer/service-list
// @access  Private
const createService = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const { servicePicture, serviceName, serviceDescription } = req.body;
            const trainerId = trainer.trainerId

            const service = new Service({
                trainerId,
                servicePicture,
                serviceName,
                serviceDescription        
            })
            
            const createdService = await service.save();
            
            if (createdService) {
                Trainer.updateOne({ email: trainer.email}, { $push: { serviceList: {service: createdService._id} }})
                .then(result => {
                    console.log('Data pushed successfully:', result);
                })
                .catch(err => console.error('Error pushing data:', err));
                res.status(201).json(createdService);
            } else {
                res.json('Service error');
            }
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }

})

// @desc    Update a service 
// @route   PUT /apiv1/trainer/service-list/:id
// @access  Private
const updateService = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const { servicePicture, serviceName, serviceDescription } = req.body;

            const service = await Service.findById(req.params.id);
            const trainerId = trainer.trainerId

            if (service.trainerId === trainerId) {

                if (service) {
                    service.serviceName = serviceName;
                    service.serviceDescription = serviceDescription;
                    service.servicePicture = servicePicture;
    
                    const updatedService = await service.save();
                    res.json(updatedService);
                } else {
                    res.status(404);
                    throw new Error('Resource not found');
                }
            } else {
                res.status(404);
                throw new Error('Not authorized! You can only take action on your service data.');
            }
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})


// @desc    Delete a service
// @route   DELETE /apiv1/trainer/service-list/:id
// @access  Private
const deleteService = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const service = await Service.findById(req.params.id);
            const trainerId = trainer.trainerId;
            if (service){
                if (service.trainerId === trainerId){
                    await Service.deleteOne({_id: service._id})
                    .then(() => {
                        Trainer.updateOne({ email: email }, {$pull: { serviceList: {service: service._id} }})
                        .then(result => {
                            console.log('Data deleted successfully:', result);
                        })
                        .catch(err => console.error('Error pushing data:', err));
                    })
                    
                    res.status(200).json({
                        message: 'Service deleted'
                    })
                } else {
                    res.status(404);
                    throw new Error('Not authorized! You can only take action on your service data.');
                }
            } else {
                res.status(404);
                throw new Error('Service not found');
            }
        }
        
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})


// @desc    Creates a workout 
// @route   POST /apiv1/trainer/workout
// @access  Private
const createWorkout = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const { workoutName, workoutCategory, workoutDescription, workoutPicture, workoutVideoLink, workoutDuration, workoutSteps, equipmentRequired, equipmentList } = req.body;
            const trainerId = trainer.trainerId

            const workout = new Workout({
                trainerId,
                workoutName,
                workoutCategory,
                workoutDescription,
                workoutPicture,
                workoutVideoLink,
                workoutDuration,
                workoutSteps,
                equipmentRequired,
                equipmentList,
            })

            const createdWorkout = await workout.save();
            if (createdWorkout) {
                Trainer.updateOne({ email: trainer.email}, { $push: { myWorkouts: {workout: createdWorkout._id} }})
                .then(result => {
                    console.log('Data pushed successfully:', result);
                    new Category({
                        categoryName: workoutCategory
                    }).save()
                })
                .catch(err => console.error('Error pushing data:', err));
    
                res.status(201).json(createdWorkout);
            } else {
                res.json('An error occured while creating workout data.')
            }
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }

})

// @desc    Update a workout 
// @route   PUT /apiv1/trainer/workout/:id
// @access  Private
const updateWorkout = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const { workoutName, workoutCategory, workoutDescription, workoutPicture, workoutVideoLink, workoutDuration, workoutSteps, equipmentRequired, equipmentList } = req.body;

            const workout = await Workout.findById(req.params.id);
            const trainerId = trainer.trainerId;

            if (workout) {

                if (workout.trainerId === trainerId) {
                    workout.workoutName = workoutName;
                    workout.workoutCategory = workoutCategory;
                    workout.workoutDescription = workoutDescription;
                    workout.workoutPicture = workoutPicture;
                    workout.workoutVideoLink = workoutVideoLink;
                    workout.workoutDuration = workoutDuration;
                    workout.workoutSteps = workoutSteps;
                    workout.equipmentRequired = equipmentRequired;
                    workout.equipmentList = equipmentList;
    
                    const updatedWorkout = await workout.save();
                    res.json(updatedWorkout);
                } else {
                    res.status(404);
                    throw new Error('Not authorized! You can only take action on your service data.');
                }
            } else {
                res.status(404);
                throw new Error('Resource not found');
            }
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Delete a workout
// @route   DELETE /apiv1/trainer/workout/:id
// @access  Private
const deleteWorkout = asyncHandler( async(req, res) => {
    // Getting the trainer id
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    // development
    // const { email } = req.body;
    // const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const workout = await Workout.findById(req.params.id);
            const trainerId = trainer.trainerId;

            if (workout){
                if (workout.trainerId === trainerId) {

                    await Workout.deleteOne({_id: workout._id})
                    .then(() => {
                        Trainer.updateOne({ email: trainer.email}, { $pull: { myWorkouts: {workout: workout._id} }})
                        .then(result => {
                            console.log('Data deleted successfully:', result);
                        })
                        .catch(err => console.error('Error pushing data:', err));                        
                    })
                    res.status(200).json({
                        message: 'Workout deleted'
                    })
                } else {
                    res.status(404);
                    throw new Error('Not authorized! You can only take action on your service data.');
                }
            } else {
                res.status(404);
                throw new Error('Workout not found');
            }
        }
        
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Return the clients requests
// @route   POST /apiv1/trainer/client-progress
// @access  Private
const getClientProgress = asyncHandler( async(req, res) => {
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    const { clientId } = req.body;
    // development
    // const { email, clientId } = req.body;
    // const trainer = await Trainer.findOne({email: email});
    
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const progress = await Progress.findOne({clientId: clientId}).populate("progress.workout", "workoutName")
            
            res.json(progress)
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Return the clients requests
// @route   GET /apiv1/trainer/assign-workout
// @access  Private
const assignWorkout = asyncHandler( async(req, res) => {
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    const { clientId, workoutId } = req.body;
    // development
    // const { email, clientId, workoutId } = req.body;
    // const trainer = await Trainer.findOne({email: email});
    
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {

            const client = await Client.findOne({ clientId });

            if (!client) {
            return false;
            }

            const workoutFound = client.workoutsAssignedForMe.some(work => work.workout.toString() === workoutId);

            if(!workoutFound) {
                const progress = await Progress.findOneAndUpdate({clientId: clientId}, 
                    { $push: {progress: { workout: workoutId}} }
                ).populate("progress.workout", "workoutName")
                const client = await Client.findOneAndUpdate({clientId: clientId}, 
                    { $push: { workoutsAssignedForMe: {workout: workoutId} }}
                )
                
                res.json({progress, client})
            } else {
                res.status(404);
                throw new Error('Already assigned this workout!');
            }

        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Return the clients requests
// @route   GET /apiv1/trainer/remove-assigned-workout
// @access  Private
const removeAssignedWorkout = asyncHandler( async(req, res) => {
    // production
    const trainer = await Trainer.findOne({_id: req.trainer._id});
    const { clientId, workoutId } = req.body;
    // development
    // const { email, clientId, workoutId } = req.body;
    // const trainer = await Trainer.findOne({email: email});
    
    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const progress = await Progress.findOneAndUpdate({clientId: clientId}, 
                { $pull: {progress: { workout: workoutId}} }
            ).populate("progress.workout", "workoutName")
            const client = await Client.findOneAndUpdate({clientId: clientId}, 
                { $pull: { workoutsAssignedForMe: {workout: workoutId} }}
            )
            
            res.json({progress, client})
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Return the clients requests
// @route   GET /apiv1/trainer/client-request
// @access  Private
const getClientRequest = asyncHandler( async(req, res) => {
    const { email } = req.body;
    // Getting the trainer id
    const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            const request = await Request.find({})
            res.json(request)
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Update a client request
// @route   PUT /apiv1/trainer/client-request/:id
// @access  Private
const updateClientRequest = asyncHandler( async(req, res) => {
    const { email } = req.body;
    // Getting the trainer id
    const trainer = await Trainer.findOne({email: email});

    // checking if the account is not suspended
    if (trainer) {
        if (trainer.isAccountFrozen) {
            res.status(501);
            throw new Error('Accesss denied!');
        } else {
            // const request = await Request.find({})
            // res.json(request)
            res.json("Trainer - update request")
        }
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})

// @desc    Return chats for trainers
// @route   GET /apiv1/trainer/chat
// @access  Private
const getChats = asyncHandler( async(req, res) => {
    res.json("Trainer - get chats")
})

// @desc    Return specific chat
// @route   GET /apiv1/trainer/chat/:id
// @access  Private
const getSpecificChat = asyncHandler( async(req, res) => {
    res.json("Trainer - get specific chats")
})

// @desc    Add a text to a chat
// @route   POST /apiv1/trainer/chat/:id
// @access  Private
const addChat = asyncHandler( async(req, res) => {
    res.json("Trainer - add chat")
})

// @desc    Return trainers profile
// @route   GET /apiv1/trainer/profile
// @access  Private
const getProfile = asyncHandler( async(req, res) => {
    const trainer = await Trainer.findOne({_id: req.trainer._id}).select('-password')

    res.json(trainer)
})

// @desc    Update trainer profile
// @route   PUT /apiv1/trainer/profile
// @access  Private
const updateProfile = asyncHandler( async(req, res) => {
    const trainer = await Trainer.findOne({_id: req.trainer._id}).select('-password')

    const { email, phoneNo, firstName, fatherName, sex, DOB, description, picture } = req.body;

    if (trainer) {
        trainer.email = email;
        trainer.phoneNo = phoneNo;
        trainer.firstName = firstName;
        trainer.fatherName = fatherName;
        trainer.sex = sex;
        trainer.DOB = DOB;
        trainer.description = description
        trainer.picture = picture
        
        if (req.body.password) {
            trainer.password = req.body.password;
        }

        const updatedTrainer = await trainer.save();

        res.status(200).json({
            _id: updatedTrainer._id,
            email: trainer.email,
            phoneNo: trainer.phoneNo,
            firstName: trainer.firstName,
            fatherName: trainer.fatherName,
            sex: trainer.sex,
            DOB: trainer.DOB,
            description: trainer.description,
            isTrainer: trainer.isTrainer
        })
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
})



module.exports = {
    dashboard,
    getClients,
    getService,
    getWorkout,
    createService,
    updateService,
    deleteService,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getClientProgress,
    assignWorkout,
    removeAssignedWorkout,
    getClientRequest,
    updateClientRequest,
    getChats,
    getSpecificChat,
    addChat,
    getProfile,
    updateProfile
}