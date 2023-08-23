// Import the mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define possible roles as an array
const ROLE = ["admin", "user"];

// Define a new Schema called 'adminSchema'
const adminSchema = new Schema({
    name: String // Define a field named 'name' of type String
}, { versionKey: false }); // Disable versioning in the documents

// Create a Mongoose model named 'Admin' with the 'adminSchema' schema
const Admin = mongoose.model('Admin', adminSchema);

// Export the 'Admin' model and the 'ROLE' array
module.exports = {
    Admin: Admin,
    ROLE: ROLE
};
