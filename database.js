// Import the mongoose library
const mongoose = require('mongoose');

// Import the Express app from the './app' module
const app = require('./app');

// Load environment variables from a '.env' file
require('dotenv').config();

// Disable strict mode for queries in Mongoose
mongoose.set("strictQuery", false);

// Connect to the MongoDB database using the MONGO_DB_URI from environment variables
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log("Connected to the MongoDB database");
    })
    .catch((err) => {
        console.error(err);
    });

// Define a route that responds with "Connected"
app.get('/', (req, res) => {
    res.send('Connected');
});
