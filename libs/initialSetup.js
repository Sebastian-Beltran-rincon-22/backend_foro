// Import the Admin model
const { Admin } = require('../models/admin'); // Import the Admin model
// Import the User model
const User = require('../models/user'); // Import the User model
// Import the configuration
const config = require('../config'); // Import the configuration

// Define an object for administrator role functions
const rolAdmin = {
    // Function to create default administrator roles
    createAdmin: async () => {
        try {
            // Count the estimated number of documents in the Admin model
            const count = await Admin.estimatedDocumentCount();

            // If administrator roles already exist, perform no further action
            if (count > 0) return;

            // Create Admin instances for "user" and "admin" and save them to the database
            const values = await Promise.all([
                new Admin({ name: "user" }).save(),
                new Admin({ name: "admin" }).save()
            ]);

            console.log(values); // Print the values of created roles
        } catch (error) {
            console.error(error); // Error handling in case of failure
        }
    },

    // Function to create a default administrator user if not exists
    adminprint: async () => {
        try {
            // Search for a user based on the administrator email in the configuration
            const userFound = await User.findOne({ email: config.ADMIN_EMAIL });
            console.log(userFound); // Print the found user (if exists)

            // If the administrator user already exists, perform no further action
            if (userFound) return;

            // Search for the administrator role by its name
            const admin = await Admin.find({ name: { $in: ["admin"] } });

            // Create a new user with administrator data provided in the configuration
            const userRegis = await User.create({
                userName: config.ADMIN_USERNAME,
                email: config.ADMIN_EMAIL,
                password: config.ADMIN_PASSWORD,
                admin: admin.map((admins) => admins._id) // Assign the administrator role
            });

            console.log(`New user created: ${userRegis.email}`);
        } catch (error) {
            console.log(error); // Error handling in case of failure
        }
    }
}

// Export the function to create default administrator roles
module.exports = rolAdmin.createAdmin;


