const express = require('express');
const app = express();
const db = require('./db'); // export the db connection
const Person = require('./models/person'); // export the person schema

// To parse data between server and client
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res){
    res.sent('Welcome to my hotel... How can I help you ? We have list of menus')
})

// POST route to add a person -  Async await method
app.post('/person', async(req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save()
        console.log('Data saved !');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


// GET method to get the person
app.get('/person', async(req, res) =>{
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err){
         console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})