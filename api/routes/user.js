const express = require('express');
const router = express.Router();
const temps = require('./temps');
const mongoose = require('mongoose');

const User = require('../models/user');

var usersArray = temps;

// GET Request for users - Temporary
router.get('/', (request,response,next) => {
    //Return array of users
    User.find()
    .select('name username userID phone')
    .exec()
    .then((document) => {
        if (document) {
            if (document.length > 0) {
                response.status(200).json({
                    'User Count': document.length,
                    users: document.map((document) => {
                        return {
                            'DB ID': document._id,
                            Name: document.name,
                            Surname: document.surname,
                            'Phone number': document.phone,
                            'ID Number': document.userID,
                            request: {
                                type: 'GET',
                                url: 'http://192.168.1.97:9000/users/' + document._id
                            }
                        }
                    })
                });
            } else {
                response.status(404).json({
                    message: "No users"
                });
            }
        } else {
            response.status(401).json({
                message: "Null value"
            });
        }
    })
    .catch((error) => {
        response.status(400).json({
            message: error
        });
    });
});

// GET request for specific users - Temporary
router.get('/:username', (request,response,next) => {
    //Return user
    const requestedUsername = request.params.username;
    User.find({'username':requestedUsername})
    //User.findById(requestedUsername)
    .exec()
    .then((document) => {
        if (document) {
            response.status(200).json({
                document
            });
        } else {
            response.status(404).json({
                message: "No user with username: '" + requestedUsername + "' found"
            });
        }
    })
    .catch((error) => {
        response.status(400).json({
            message: error
        });
    });
});

// POST Request for User Login
router.post('/login', (request,response,next) => {
    var user = {
        username: request.body.username,
        password: request.body.password
    };

    User.findOne({'username':username, 'password':password})
    .exec()
    .then((document) => {
        if (document) {
            if (document.length === 1) {
                response.status(200).json({
                    document,
                    token: Math.floor((Math.random() * 100) + 1)
                });
            } else {
                response.status(404).json({
                    message: 'Username or password is wrong'
                });
            }
        } else {
            response.status(400).json({
                message: error
            });
        }
    })
    .catch((error) => {
        response.status(400).json({
            message: error
        });
    });
    
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