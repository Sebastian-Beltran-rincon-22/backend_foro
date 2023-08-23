// Import the necessary modules
const express = require('express');
const userControllers = require('../controllers/auth'); // Controller functions for authentication
const verifySignup = require('../middlewares/verifySignup'); // Custom middleware for signup verification
const authJwt = require('../middlewares/authJwt'); // Custom middleware for JWT authentication
const router = express.Router();

// Middleware to set CORS headers
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Route for user signup
router.post(
    '/signup',
    [
        verifySignup.checkDupletUserNameOrEmail, // Middleware to check for duplicate username or email
        verifySignup.checkRoleExist // Middleware to check if the specified role exists
    ],
    userControllers.signup // Controller function for user signup
);

// Route for user signin
router.post('/signin', userControllers.signin); // Controller function for user signin

// Route to get user information (requires authentication)
router.get('/', authJwt.verifyToken, userControllers.getsingup);

// Export the configured router
module.exports = router;
