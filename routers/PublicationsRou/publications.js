// Import the necessary modules
const express = require('express');
const authJwt = require('../../middlewares/authJwt'); // Custom middleware for JWT authentication
const controllerPublication = require('../../controllers/publicationsControllers/publications'); // Controller functions for publications

// Create an Express Router instance
const router = express.Router();

// Define routes and their associated controller functions
// POST route for creating a publication with authentication required
router.post('/create', authJwt.verifyToken, controllerPublication.create);

// GET route for fetching all publications
router.get('/', controllerPublication.getPublication);

// GET route for fetching a specific publication by its ID
router.get('/:id', controllerPublication.getPublicationById);

// PATCH route for updating a publication with authentication required
router.patch('/update/:id', authJwt.verifyToken, controllerPublication.updatePublication);

// DELETE route for deleting a publication with authentication and admin role required
router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controllerPublication.deletePublication);

// Export the configured router
module.exports = router;
