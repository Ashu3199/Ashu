// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the MongoDB connection URI
const MONGO_URI = 'mongodb+srv://notessaverproject:37eRUcUkBGp1NSxe@cluster0.k1aat.mongodb.net/';

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to establish a connection to the database
        await mongoose.connect(MONGO_URI); // Connects using the provided URI
        console.log('Connected to MongoDB'); // Log a success message if the connection is successful
    } catch (err) {
        // Handle connection errors
        console.error('Error connecting to MongoDB:', err); // Log the error details
        process.exit(1); // Exit the process with a failure code
    }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;

