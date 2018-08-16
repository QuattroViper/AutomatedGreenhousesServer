# Automated Greenhouses Server

This repository is for the Server.

This was a project I did while I was part of an International team with a goal of greating Automated Greenhouses. 

Where were tasked to create a system that would be fully automated. The system include a robot that can roam the plantations and take incremental photos to detect any bacteria or viruses that could be growing on the plants, which were tomatoes in this case. 

We used various technologies. 
- Arduino Coding to drive the motors of the robot.
- RaspberryPi to get commands from the server and issue the commands to the Arduinos
- Webcamera to send pictures to the backend server.
- Node.js backend server to receice photos and issue commands to the robot. 
- A CNN (Convolutional Neural Network), the leading AI technology for image detection and recognition, which formed the Computer Vision 
- Android for the android application. 
- C# application for integration between XBOX remote to the robot.

Detail about the Technologies
- Javascript/Node.js for the backend server to provide API Endpoints
- MongoDB for the database
- Android platform
- TensorFlow for the CNN AI
