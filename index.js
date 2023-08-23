// Import the Express app from the './app' module
const app = require('./app');

// Import the function to create an admin user from the './libs/initialSetup' module
const createAdmin = require('./libs/initialSetup');

// Import the './database' module (presumably for MongoDB connection configuration)
const dataBase = require('./database');

// Import the mongoose library
const mongoose = require('mongoose');

// Load environment variables from a '.env' file
require('dotenv').config();

// Set the port number for the server
const port = 3000; // Change this to the desired port number

// Start the server and listen on the specified port
app.listen(port);
console.log('Server listening on port', port);

// Output the 'createAdmin' function (not executing it)
console.log(createAdmin);
