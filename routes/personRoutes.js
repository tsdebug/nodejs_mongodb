const express = require('express');
const route = express.Router();

const Person = require('./../models/person'); // Import the Person schema

// POST route to add a person -  Async await method
route.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save()
        console.log('Data saved !');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET method to get the person
route.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Parametrised API calls for Person on the basis og workType
route.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from thr URL parameter
        if (workType == 'Chef' || workType == 'Manager' || workType == 'Waiter') {
            const response = await Person.find({ work: workType });
            console.log('Response fetched !');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid Work Type..' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// PUT method to update person data
route.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameters
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated doc
            runValidators: true // Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }

        console.log("Data Updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// DELETE methode to delete person recode
route.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id; // Extract the id from the URL parameters

        // Assuming you have a Person Model
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
        console.log("Data Deleted");
        res.status(200).json({message: 'Person Deleted Sucessfully'});
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// export router 
module.exports = route;