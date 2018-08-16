const MONGOOSE = require('mongoose');

// User schema for MongoDB
var tensorflowSchema = MONGOOSE.Schema({
    _id: MONGOOSE.Schema.Types.ObjectId,
    name: [],
    prediction: [],
    timeStamp: { type: String, required: true },
});

module.exports = MONGOOSE.model('Tensorflow',tensorflowSchema,'tensorflow');