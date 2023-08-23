// Import the mongoose library
const mongoose = require('mongoose');

// Destructure the Schema class from mongoose
const { Schema } = mongoose;

// Define a new Schema called 'interacSchema'
const interacSchema = new Schema({
    // Define a field named 'reactions'
    reactions: {
        type: Boolean,       // Field data type: Boolean (true/false)
        default: false       // Default value: false
    },
    // Define a field named 'comments'
    comments: {
        type: String,        // Field data type: String
        content: String,     // Subfield named 'content' of type String
        date: Date           // Subfield named 'date' of type Date
    },
    // Define a field named 'shares'
    shares: {
        type: String        // Field data type: String
    },
    // Define a field named 'publication'
    publication: {
        ref: 'Publication',                            // Reference to another model named 'Publication'
        type: mongoose.Schema.Types.ObjectId          // Field data type: ObjectId (for referencing)
    }
}, { versionKey: false }); // Disable versioning in the documents

// Export a Mongoose model named 'Interactions' with the 'interacSchema' schema
module.exports = mongoose.model('Interactions', interacSchema);
