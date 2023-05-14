const express = require('express');

const volunteer = require("../models/volunteer");

const router = express.Router();

// Get all volunteer by its region
router.get('/:region', (req, res) => {
    Volunteer.find({ region: req.params.region })
        .then((data) => {
            res.status(200).json({
                message: "All volunteer Data is fetched Successfully",
                volunteer: data
            });
        })
        .catch(() => {
            res.status(401).json({
                message: "volunteer Data cannot be fetched!"
            });
        });
});

// Add volunteer by Regional Admin
router.post('/add/:region', (req, res) => {
    volunteer.findOne({ id: req.body.volunteerId })
        .then((volunteer) => {
            if (volunteer) {
                return res.json({
                    message: "volunteer Already Exist"
                });
            }
        })
    const dBin = new volunteer({
        id: req.body.volunteerId,
        location: req.body.location,
        stopover: true,
        region: req.params.region,
        status: -1,
        address: req.body.volunteerAddress,
        owner: "none"
    });
    dBin.save()
        .then((dBin) => {
            res.status(200).json({
                message: "volunteer Added!",
                volunteer: dBin
            });
            console.log('volunteer Added!');
        })
        .catch(err => {
            res.json({
                message: "Cannot add volunteer due to the following error: " + err
            });
        })
});




module.exports = router;
