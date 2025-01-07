// Import required modules
const express = require('express'); // Express framework for building the server
const connectDB = require('./utils/db'); // Import the database connection utility
const ContactController = require("./controllers/contact.controller"); // Import the ContactController

// Initialize the Express application
const app = express();

// Define the port the server will listen on
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Establish a connection to the database
connectDB();

// Set up a route for handling user-related requests
// Routes starting with "/user" will be handled by ContactController
app.use("/user", ContactController);

// Define a root route to check server status
app.get('/', (req, res) => {
    res.send('Server is running!'); // Respond with a confirmation message
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
