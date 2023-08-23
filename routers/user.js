// Import the necessary modules
const express = require('express');
const controllerUser = require('../controllers/user'); // Controller functions for user management
const router = express.Router();
const authJwt = require('../middlewares/authJwt'); // Custom middleware for JWT authentication
const verifySignup = require('../middlewares/verifySignup'); // Custom middleware for signup verification

// Route for creating a user account (requires authentication and admin role)
router.post(
    '/create',
    [
        authJwt.verifyToken, // Middleware for JWT authentication
        authJwt.isAdmin, // Middleware to check if the user has an admin role
        verifySignup.checkRoleExist, // Middleware to check if the specified role exists
        verifySignup.checkDupletUserNameOrEmail // Middleware to check for duplicate username or email
    ],
    controllerUser.create // Controller function for creating a user account
);

// Route for fetching all user accounts
router.get('/', controllerUser.getUser);

// Route for fetching a specific user account by its ID
router.get('/:id', controllerUser.getUserById);

// Route for updating a user account
router.patch('/update/:id', controllerUser.updateUser);

// Route for deleting a user account (requires authentication and admin role)
router.delete(
    '/delete/:id',
    [
        authJwt.verifyToken, // Middleware for JWT authentication
        authJwt.isAdmin, // Middleware to check if the user has an admin role
        verifySignup.checkRoleExist // Middleware to check if the specified role exists
    ],
    controllerUser.deleteUser // Controller function for deleting a user account
);

// Export the configured router
module.exports = router;
