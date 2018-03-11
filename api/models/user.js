const MONGOOSE = require('mongoose');

// User schema for MongoDB
var userSchema = MONGOOSE.Schema({
    _id: MONGOOSE.Schema.Types.ObjectId,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    userID: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = MONGOOSE.model('User', userSchema);