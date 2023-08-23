// Import the ROLE object from the admin model
const { ROLE } = require('../models/admin'); // Import the ROLE object from the admin model
const User = require('../models/user'); // Import the User model

// Define an object for signup verification
const verifySignup = {
    // Middleware to check for duplicate usernames or emails during signup
    checkDupletUserNameOrEmail: async (req, res, next) => {
        try {
            // Check if a user with the provided username already exists
            const userFound = await User.findOne({ userName: req.body.userName });
            if (userFound) return res.status(400).json({ message: 'El usuario ya existe' });

            // Check if a user with the provided email already exists
            const email = await User.findOne({ email: req.body.email });
            if (email) return res.status(400).json({ message: 'El correo electrónico ya existe' });

            next(); // Proceed to the next middleware if checks pass
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Middleware to check if provided roles exist during signup
    checkRoleExist: (req, res, next) => {
        // If admin roles are not provided, default to "user" role
        if (!req.body.admin || req.body.admin.length === 0) {
            req.body.admin = ["user"];
        }

        // Iterate through provided roles and check if they exist in ROLE array
        for (let i = 0; i < req.body.admin.length; i++) {
            if (!ROLE.includes(req.body.admin[i])) {
                return res.status(400).json({
                    message: `El rol ${req.body.admin[i]} no existe`
                });
            }
        }

        next(); // Proceed to the next middleware if role checks pass
    }
}

module.exports = verifySignup; // Export the verifySignup object for use in other files


