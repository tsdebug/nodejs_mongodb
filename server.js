const express = require('express');
const app = express();

const db = require('./db'); // export the db connection


// To parse data between server and client
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

app.get('/', function (req, res){
    res.sent('Welcome to my hotel...');
})

// Import the router files
const personRouters = require('./routes/personRoutes');
const menuItemRouters = require('./routes/menuItemRoutes');

// Use the routers
app.use('/', personRouters);
app.use('/', menuItemRouters);

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})