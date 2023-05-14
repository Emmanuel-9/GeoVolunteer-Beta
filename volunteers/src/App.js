const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Dustbin = require("./models/volunteer");

const app = express();

const adminRoutes = require('./routes/admin');
const volunteerRoutes = require('./routes/volunteer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl = process.env.DB_LINK;
mongoose.connect(dbUrl, { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to db!');
    })
    .catch((err) => {
        console.log('not connected to db due to the following error: ' + err);
    });


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


// Routes for actors
app.use('/api/admin', adminRoutes);
app.use('/api/volunteer', volunteerRoutes);


// test for communication from hardware
app.post('/test/test', (req, res) => {
    console.log('Status = ' + req.body.level);
    console.log('Volunteer ID = ' + req.body.id);
    res.status(200).json({
        'message': 'Request Reached!'
    });
    Dustbin.findOneAndUpdate({ id: req.body.id }, { status: parseInt(req.body.level) })
        .then((resp) => {
            console.log('Updated');
        })
        .catch((err) => {
            console.log('cannot update due to error: ' + err);
        });
});

// test for server online
app.get('/test/test', (req, res) => {
    res.json({
        message: "Server is online!"
    });
})

// returning API key for Google maps API 
app.get('/get/api_key', (req, res) => {
    res.status(200).json({
        api_Key: process.env.API_KEY
    });
});



module.exports = app;
