// Import necessary models
const Publication = require('../../models/PublicationsModels/publications'); // Import the publication model
const User = require('../../models/user'); // Import the user model

// Define a controllers object for publications
const controllerPublication = {
    // Function to create a new publication
    create: async (req, res) => {
        try {
            // Extract data from the request (client)
            const { userId, description, image } = req.body;

            // Get the current date and time
            const date_create = new Date();

            // Print the user ID to the console
            console.log("UserID:", userId);

            // Find the user by their ID
            const user = await User.findById(userId); // Find the user ID
            if (!user) {
                // If the user is not found, respond with an error
                return res.status(404).json({ error: "User could not be found" });
            }

            // Create a new publication using the Publication model
            await Publication.create({
                user: user._id, // User ID
                date_create: date_create, // Creation date
                description: description, // Publication description
                image: image, // Publication image
            });

            // Print a message to the console
            console.log('Publication created');

            // Respond with a success message
            res.json({ msg: 'Created' });
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to get all publications
    getPublication: async (req, res) => {
        try {
            // Find and respond with all publications
            const publications = await Publication.find({});
            res.json(publications);
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to get a publication by its ID
    getPublicationById: async (req, res) => {
        try {
            const { id } = req.params;
            // Find the publication by ID and respond with it
            const publication = await Publication.findById(id);
            res.json(publication);
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to update a publication
    updatePublication: async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.body.user; // New user (if updated)
            const description = req.body.description; // New description (if updated)
            const image = req.body.image; // New image (if updated)

            // Update the publication using its ID
            await Publication.findByIdAndUpdate(id, {
                user: user._id, // Updated user ID
                description: description, // Updated description
                image: image, // Updated image
            });

            // Respond with a success message
            res.json({ msg: 'Update performed' });
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to delete a publication by its ID
    deletePublication: async (req, res) => {
        try {
            const { id } = req.params;
            // Find and delete the publication by its ID
            await Publication.findByIdAndDelete(id);
            // Respond with a success message
            res.json({ msg: "Publication deleted" });
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    }
}

// Export the controllers object
module.exports = controllerPublication;
