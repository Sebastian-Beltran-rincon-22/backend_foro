// Import the authentication and authorization module with JWT
const authJwt = require('./authJwt'); // Import the authentication module with JWT
const verifySignup = require('./verifySignup'); // Import the signup verification module

// Export the authentication and authorization module with JWT
module.exports = authJwt; // Export the authentication module with JWT
module.exports = verifySignup; // Export the signup verification module
