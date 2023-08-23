// Import the necessary modules
const cors = require('cors'); // Middleware for enabling CORS
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const express = require('express'); // Express framework
const user = require('./routers/user'); // Router for user-related routes
const publication = require('./routers/PublicationsRou/publications'); // Router for publication-related routes
const admin = require('./routers/auth'); // Router for admin-related routes
const interactions = require('./routers/PublicationsRou/interactions'); // Router for interaction-related routes
const createAdmin = require('./libs/initialSetup'); // Function to create an admin

// Create an Express app instance
const app = express();

// Run the function to create an admin (perhaps for initial setup)
createAdmin();

// Enable CORS with specific options
app.use(cors({
    origin: "*", // Allow requests from any origin (replace with actual origin)
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE", // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    preflightContinue: false, // Disable preflight requests
    optionsSuccessStatus: 204 // Set status code for successful preflight
}));

// Parse request bodies as JSON
app.use(express.json());

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Use routers for different parts of the application
app.use('/poofo', user); // Routes for user-related functionality
app.use('/publictpoofo', publication); // Routes for publication-related functionality
app.use('/admins', admin); // Routes for admin-related functionality
app.use('/interactions', interactions); // Routes for interaction-related functionality

// Export the configured Express app
module.exports = app;
