const MONGOOSE = require('mongoose');

// User schema for MongoDB
var historySchema = MONGOOSE.Schema({
    name: [],
    prediction: [],
    timeStamp: { type: String, required: true },
});

module.exports = MONGOOSE.model('History', historySchema,'history');