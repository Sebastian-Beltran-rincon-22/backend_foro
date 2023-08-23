// Import the necessary modules
const express = require('express');
const authJwt = require('../../middlewares/authJwt'); // Custom middleware for JWT authentication
const interacControllers = require('../../controllers/publicationsControllers/interactions'); // Controller functions for interactions

// Create an Express Router instance
const router = express.Router();

// Define routes and their associated controller functions
// POST route for creating an interaction with authentication required
router.post('/create', authJwt.verifyToken, interacControllers.create);

// GET route for fetching all interactions
router.get('/', interacControllers.getInreract);

// GET route for fetching a specific interaction by its ID
router.get('/:id', interacControllers.getInteraById);

// PATCH route for updating an interaction with authentication required
router.patch('/update/:id', authJwt.verifyToken, interacControllers.updateInterac);

// DELETE route for deleting an interaction with authentication required
router.delete('/delete/:id', authJwt.verifyToken, interacControllers.deleteInterac);

// Export the configured router
module.exports = router;
