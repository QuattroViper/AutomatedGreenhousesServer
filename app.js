const EXPRESS = require('express');         // Require Express library 
const BODYPARSER = require('body-parser');  // Require Body Parser library 
const PATH = require('path');               // Require Path library 
const MORGAN = require('morgan');           // Require Morgan library 
const MONGOOSE = require('mongoose');       // Require Mongoose library 

var app = EXPRESS();        // Instancetiate the webserver instance

 
// Routes
const productRoutes = require('./api/routes/product');
const userRoutes = require('./api/routes/user');

// Mongoose connection
//MONGOOSE.connect("mongodb://pennstateAdmin:123456@192.168.1.97:27017/pennstate",{});
MONGOOSE.connect("mongodb://192.168.1.97:27017/pennstate",{});

// Set Headers for CORS errors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-origin','*');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Autherization'
    );
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
        return response.status(200).json({});
    }
    next();
});

// 
app.use(MORGAN('dev'));
app.use(BODYPARSER.urlencoded({extended: false}));
app.use(BODYPARSER.json());


// 
app.use('/products', productRoutes);
app.use('/users',userRoutes);

// Default url
app.get('/',(request,response) => {
    response.send('Hello world');
});

// Error handling
app.use((request,response, next) => {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Return error
app.use((error,request,response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;