const HTTP = require('http');       // Require the HTTP library
const APP = require('./app');       // Require tje app.js file

// Binding the webserver to Port 9000
var PORT = 9000;

// Binding the webserver to IP address 192.168.2.222 - Temporary IP address
var HOSTNAME = '192.168.2.222';

// Create the server and creates a server instance
const SERVER = HTTP.createServer(APP, () => {
    console.log('Server is running on port: ' + PORT);
});

// Set the webserver to listen to the specified port
SERVER.listen(PORT);





