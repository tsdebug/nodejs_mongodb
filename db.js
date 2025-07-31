const mongoose = require('mongoose');

require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.LOCAL_HOST // 

// Hosting server on MongoDB atlas 
const mongoURL = process.env.DB_HOST_URL;

// Set up MongoDB connection (not needed any longer for the lastest versions)

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server !');
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

// Export the database connection
module.exports = db;