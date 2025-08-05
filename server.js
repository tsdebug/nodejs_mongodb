const express = require('express');
const app = express();

const db = require('./db'); // export the db connection
require('dotenv').config();

// Passpost.js
const passport = require('./auth');

// To parse data between server and client
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000; 

// Middleware function
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`);
    next(); // Move on to the next phase - very important
}
app.use(logRequest); // It's out here instead of with anyone endpoint is so that it's available from all the endpoints


app.use(passport.initialize());

const localMiddleware = passport.authenticate('local', {session: false});
app.get('/', function (req, res){
    res.send('Welcome to my hotel...');
})

// Import the router files
const personRouters = require('./routes/personRoutes');
const menuItemRouters = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', localMiddleware, personRouters);
app.use('/menu', menuItemRouters);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})