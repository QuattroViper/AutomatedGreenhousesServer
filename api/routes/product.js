const express = require('express');
const router = express.Router();

router.get('/', (request,response,next) => {
    response.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.get('/:productID', (request,response,next) => {
    var id = request.params.productID;
    if (id === '109') {
        response.status(200).json({
            message: 'This is the correct product.',
            name: 'Dodge'
        });
    } else {
        response.status(200).json({
            message: 'Please choose the correct Product'
        });
    }
});

router.post('/', (request,response,next) => {
    response.status(200).json({
        message: 'Handling POST requests to /products'
    });
});

module.exports = router;