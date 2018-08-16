const express = require('express');
const router = express.Router();
const temps = require('./temp');
const mongoose = require('mongoose');

const User = require('../models/user');

var usersArray = temps;

router.get('/', (request,response,next) => {

    response.status(200).json({
        message: 'Hallo User'
    });

});

router.post('/login', (request,response,next) => {
    var user = {
        username: request.body.username,
        password: request.body.password
    };

    if (user.username === 'vegtech' && user.password === '123456789') {

        response.status(201).json({
            status : 'Accepted',
            token : Math.floor((Math.random() * 100) + 1)
        });

    } else {

        response.status(403).json({
            status : 'Denied',
            token : 'Empty'
        });

    }
    
});

// Insert new user to the database
router.put('/', (request,response,next) => {
    var requestedUser = {
        name: request.body.name,
        surname: request.body.surname,
        id: request.body.id,
        phone: request.body.phone,
        username: request.body.username,
        password: request.body.password
    };



    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: requestedUser.name,
        surname: requestedUser.surname,
        userID: requestedUser.id,
        phone: requestedUser.phone,
        username: requestedUser.username,
        password: requestedUser.password
    });

    user
        .save()
        .then((result) => {
            console.log(result);
            response.status(201).json({});
        })
        .catch((error) => {
            response.status(401).json({
                message: error.message
            });
        });

});


module.exports = router;