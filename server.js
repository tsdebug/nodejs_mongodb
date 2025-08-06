const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

// Passport.js configuration
const passport = require('./auth');

// Middleware to parse JSON body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Middleware function to log requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

// Initialize Passport
app.use(passport.initialize());

// Default welcome route
app.get('/', function (req, res) {
    res.send('Welcome to my hotel...');
});

// Import the router files
const personRouters = require('./routes/personRoutes');
const menuItemRouters = require('./routes/menuItemRoutes');

// Use the routers
// The authentication middleware is no longer applied globally here.
// It will be applied to specific routes inside personRoutes.js.
app.use('/person', personRouters);
app.use('/menu', menuItemRouters);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});