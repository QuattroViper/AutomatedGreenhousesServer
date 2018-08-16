const express = require('express');
const router = express.Router();
const temps = require('./temp');
const mongoose = require('mongoose');

const Tensorflow = require('../models/tensorflow');
const History = require('../models/history');

var PythonShell = require('python-shell');
var options = {
    mode: 'text',
    pythonPath: 'C:/Users/Administrator/AppData/Local/Programs/Python/Python35/python.exe',
    pythonOptions: ['-u'], // get print results in real-time,
    scriptPath: 'D:/disease_detector',
  };


router.get('/', (request,response,next) => {
    

    response.status(200).json({
        message:'Hallo Raspberry'
    });
    
});

router.get('/results', (request,response,next) => {
    
    Tensorflow
        .findOne({}, {}, { sort: { 'timeStamp' : -1 } })
        .exec()
        .then((document) => {
            response.status(200).json({ name: document.name, prediction: document.prediction, timeStamp: document.timeStamp })
        })
        .catch((error) => {
            response.status(500).json({ message: error })
        })
    
});

router.get('/status', (request,response,next) => {
    
    response.status(200).json({ temperature: '37', humidity: '70', something: '12345' })
    
});


router.post('/image', (request,response,next) => {

    //console.log(request.files)

    if (!request.files)
    return response.status(400).send('No files were uploaded.');

    let sampleFile = request.files.image;

    sampleFile.mv('D:\\disease_detector\\Predict\\predictimage.jpg', function(err) {
        if (err) return response.status(500).json({err})
     
        PythonShell.run('label_image.py', options, function(error, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            if (results === 'undefined') return response.status(400).json({ message: results });

            Tensorflow
                .findOne({}, {}, { sort: { 'timeStamp' : -1 } })
                .exec()
                .then((document) => {
                    console.log("Founded document")
                    if (document != null) {
                        console.log(document);
                        var count = 0;
                        var disease = '';
                        var percentage = 0
                        document.prediction.forEach(predict => {
                            if ( parseFloat(predict) > 0.7 ) {
                                if (parseFloat(predict) > percentage) {
                                    percentage = predict;
                                        disease = document.name[count];
                                }       
                            }
                            count++;
                        });
                        if (percentage != 0) {
                            console.log("Prediction found. Disease = " + disease + " . With possibility of " + (percentage * 100 ) + ' %');
                            response.status(203).json({message: 'Prediction found. Disease = ' + disease + ". With possibility of " + (percentage * 100 ) + ' %'});
                            // SEND TO FIREBASE TO ANDROID ID
                        } else {
                            response.status(200).json({message:'Done!'});
                        }

                        

                    }

                })
                .catch((error)=>{ 
                    console.log('Find error \n') 
                    console.log(error) 
                    response.status(500).json({message:'Failed!'}); 
                });
            
            
        })
        
    });

    


    
    
    // console.log(request)

    // response.status(200).json({
    //     request:'accepted'
    // });
    
});

router.post('/sensors', (request,response,next) => {
    
    response.status(200).json({
        request:'accepted'
    });
    
});

router.get('/data', (request,response,next) => {
    
    Tensorflow
        .find({}, (error, document) => {
            console.log(document)
        })





        // .exec()
        // .then((document) => {
        //     console.log(document)
        //     response.status(200).json({
        //         document
        //     });
                
        // })
        // .catch(()=>{
        //     response.status(400).json({
        //         document
        //     });
        // });

    
    
});




module.exports = router;