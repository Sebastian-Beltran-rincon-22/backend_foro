// Import the mongoose library
const mongoose = require('mongoose');

// Destructure the Schema class from mongoose
const { Schema } = mongoose;

// Define a new Schema called 'PublicationSchema'
const PublicationSchema = new Schema({
    // Define a field named 'user'
    user: {
        ref: 'User',                             // Reference to another model named 'User'
        type: Schema.Types.ObjectId              // Field data type: ObjectId (for referencing)
    },
    // Define a field named 'date_create'
    date_create: {
        type: Date,                              // Field data type: Date
        default: Date.now                        // Default value: current timestamp
    },
    // Define a field named 'description'
    description: {
        type: String,                            // Field data type: String
        required: true,                          // Field is required
        maxLength: 200                           // Maximum character length: 200
    },
    // Define a field named 'image'
    image: {
        type: String                             // Field data type: String
    },
}, { versionKey: false }); // Disable versioning in the documents

// Create a Mongoose model named 'Publication' with the 'PublicationSchema' schema
const Publication = mongoose.model("Publication", PublicationSchema);

// Export the 'Publication' model
module.exports = Publication;
