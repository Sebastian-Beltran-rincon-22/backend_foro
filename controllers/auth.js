// Import necessary configurations and modules
const config = require('../config'); // Import configurations
const { Admin } = require('../models/admin'); // Import Admin model
const jwt = require('jsonwebtoken'); // Import JSON Web Token module
const User = require('../models/user'); // Import User model

// Define a controller object for users
const userControllers = {
    // Function for user signup
    signup: async (req, res) => {
        try {
            // Extract data from the client request
            const { userName, email, password, admin } = req.body;

            // Create an instance of the User model with provided data
            const userRegis = new User({
                userName,
                email,
                password
            });

            if (admin) {
                // If an admin role is provided, search for corresponding roles
                const foundAdmin = await Admin.find({ name: { $in: admin } });

                // Map the IDs of found roles and assign them to the user
                userRegis.admin = foundAdmin.map((admins) => admins._id);
            } else {
                // If no admin role is provided, assign 'user' role
                const admins = await Admin.findOne({ name: 'user' });

                if (admins) {
                    userRegis.admin = [admins._id];
                } else {
                    console.log("No 'user' role found.");
                }
            }

            // Save the user to the database
            const savedUser = await userRegis.save();
            console.log(userRegis);

            // Create a JWT token for the user
            const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
                expiresIn: 86400 // One day expiration
            });

            // Respond with the generated token
            res.status(200).json({ token });
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json(error.message);
        }
    },
    
    // Function for user sign-in
    signin: async (req, res) => {
        try {
            // Find the user by their email and populate the 'admin' field
            const userFound = await User.findOne({ email: req.body.email }).populate("admin");

            // If the user is not found, respond with an error message
            if (!userFound) return res.status(400).json({ message: 'User not found' });

            // Compare the provided password with the stored password
            const matchPassword = await User.comparePassword(req.body.password, userFound.password);

            // If passwords do not match, respond with an error message
            if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

            // Create a JWT token for the user
            const token = jwt.sign({ id: userFound._id }, config.SECRET, {
                expiresIn: 86400 // One day expiration
            });

            // Respond with the generated token
            res.json({ token });
        } catch (error) {
            console.log(error);
        }
    },
    
    // Function to get all user records
    getsignup: async (req, res) => {
        try {
            // Find and respond with all registered users
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error });
        }
    },
}

// Export the user controller object
module.exports = userControllers;
