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

// driver login and sending driver data from frontend
router.post('/driverLogin', (req, res) => {
    Driver.findOne( {emailId: req.body.email} )
        .then((user) => {
            if (user) {
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            } else {
                return res.status(401).json({
                    message: "Driver Not Found, Please enter valid credentials!"
                });
            }
        })
        .then(isUser => {
            if (isUser) {
                const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, 'Secret_Token', { expiresIn: '1h' });
                return res.status(200).json({
                    message: "Token Generated",
                    user: "driver",
                    token: token,
                    expiresIn: 3600,
                    email: fetchedUser.emailId,
                    driverRegionCode: fetchedUser.regionCode
                });
            } else {
                return res.status(402).json({
                    message: "Please Enter valid Password!"
                });
            }
        })
        .catch(error => {
            res.status(404).json({
                message: "Cannot login Due to the following error: " + error
            });
        });
});

// get driver details by email
router.get('/get-driver-details-by-email/:email', (req, res) => {
    Driver.findOne({ emailId: req.params.email })
        .then((driver) => {
            if (driver) {
                res.status(200).json({
                    driverDetails: driver
                });
            }
            else {
                res.status(404).json({
                    message: "cannot find driver!"
                });
            }
        })
        .catch((err) => {
            res.status(403).json({
                message: "cannot fetch data due to the following error: " + err
            });
        });
});




module.exports = router;
