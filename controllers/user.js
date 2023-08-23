// Import required models
const User = require('../models/user'); // Import User model
const { Admin } = require('../models/admin'); // Import Admin model

// Define a controller object for managing users
const controllerUser = {

    // Function to create a new user
    create: async (req, res) => {
        try {
            // Extract data from the request body
            const { userName, userImg, email, password, admin } = req.body;

            // Find admin roles based on provided names
            const adminFound = await Admin.find({ name: { $in: admin } });

            // Create a new User instance with the extracted data
            const user = new User({
                userName,
                userImg,
                email,
                password,
                admin: adminFound.map((admins) => admins._id) // Assign admin role IDs
            });

            // Encrypt the user's password
            user.password = await User.encryptPassword(user.password);

            // Save the user to the database
            const savedUser = await user.save();

            // Respond with user details and a success status
            return res.status(200).json({
                _id: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
                password: savedUser.password,
                roles: savedUser.roles,
            });

        } catch (error) {
            // If an error occurs, respond with an error status and message
            return res.status(500).json({ msg: error });
        }
    },

    // Function to get all users
    getUser: async (req, res) => {
        try {
            // Find all users and respond with the user data
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            // If an error occurs, respond with an error status and message
            return res.status(500).json({ msg: error });
        }
    },

    // Function to get a user by their ID
    getUserById: async (req, res) => {
        try {
            // Extract the user ID from the request parameters
            const { id } = req.params;

            // Find the user by their ID and respond with the user data
            const user = await User.findById(id);
            res.json(user);
        } catch (error) {
            // If an error occurs, respond with an error status and message
            return res.status(500).json({ msg: error });
        }
    },

    // Function to update a user
    updateUser: async (req, res) => {
        try {
            // Extract the user ID from the request parameters
            const { id } = req.params;

            // Update the user data based on the request body
            await User.findByIdAndUpdate({ id }, req.body).then(res => {
                console.log(res); // Log the result of the update
            });

            // Respond with a success message
            res.status(200).json({ msg: 'Update' });
        } catch (error) {
            // If an error occurs, respond with an error status and message
            return res.status(500).json({ msg: error });
        }
    },

    // Function to delete a user by their ID
    deleteUser: async (req, res) => {
        try {
            // Extract the user ID from the request parameters
            const { id } = req.params;

            // Find and delete the user by their ID
            await User.findByIdAndDelete(id);

            // Respond with a success message
            res.json({ msg: 'Delete' });
        } catch (error) {
            // If an error occurs, respond with an error status and message
            return res.status(500).json({ msg: error });
        }
    }
};

// Export the controller object for user management
module.exports = controllerUser;
