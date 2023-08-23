const jwt = require('jsonwebtoken'); // Import the JSON Web Token library
const config = require('../config'); // Import the configuration
const User = require('../models/user'); // Import the User model
const { Admin } = require('../models/admin'); // Import the Admin model

// Define an object for authentication and authorization using JWT
const authJwt = {
    // Middleware to verify the authenticity of the token
    verifyToken: async (req, res, next) => {
        let token = req.headers['x-access-token'];

        if (!token) return res.status(403).json({ message: 'No token' });

        try {
            // Verify the token using the secret key from the configuration
            const decoded = jwt.verify(token, config.SECRET);
            req.userId = decoded.id;

            // Find the user by ID and exclude password from the response
            const user = await User.findById(req.userId, { password: 0 });

            if (!user) return res.status(404).json({ message: 'No user found' });

            next(); // Proceed to the next middleware

        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    },

    // Middleware to check if the user has admin role
    isAdmin: async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            const admin = await Admin.find({ _id: { $in: user.admin } });

            // Iterate through the admin roles associated with the user
            for (let i = 0; i < admin.length; i++) {
                if (admin[i].name === "admin") {
                    next(); // Proceed to the next middleware
                    return;
                }
            }

            // If user doesn't have admin role, send forbidden response
            return res.status(403).json({ message: "Require Admin role" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error });
        }
    }
}

module.exports = authJwt; // Export the authJwt object for use in other files
