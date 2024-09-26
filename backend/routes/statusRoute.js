const express = require ('express')

const Admin = require("../models/adminModel");
const Client = require("../models/clientModel");
const Service = require("../models/serviceModel");
const Trainer = require("../models/trainerModel");
const Workout = require("../models/workoutModel");

const router = express.Router();

router.get('/', async (req, res) => {
    const service = (await Service.find({})).length
    const workout = (await Workout.find({})).length
    const trainer = (await Trainer.find({}, {isAccountFrozen: false})).length
    const client = (await Client.find({}, {isAccountFrozen: false})).length
    const admin = (await Admin.find({})).length

    res.json({service, workout, trainer, client, admin})
})

module.exports = router;