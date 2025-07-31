const express = require('express');
const app = express();

const db = require('./db'); // export the db connection
require('dotenv').config();

// To parse data between server and client
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000; 

app.get('/', function (req, res){
    res.send('Welcome to my hotel...');
})

// Import the router files
const personRouters = require('./routes/personRoutes');
const menuItemRouters = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRouters);
app.use('/menu', menuItemRouters);

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})