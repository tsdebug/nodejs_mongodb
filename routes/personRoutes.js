const express = require('express');
const route = express.Router();
const Person = require('../models/Person');
const passport = require('../auth'); // Import passport for middleware

// Define the local authentication middleware for protecting routes
const localAuthMiddleware = passport.authenticate('local', { session: false });

// PUBLIC ROUTE - NO AUTHENTICATION REQUIRED  **

// POST route to add a person (Sign Up)
route.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('User Registered!');
        res.status(200).json({ message: 'User registered successfully', user: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PROTECTED ROUTES - AUTHENTICATION REQUIRED **
 

// GET method to get all persons
route.get('/', localAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method for specific work types
route.get('/:workType', localAuthMiddleware, async (req, res) => {
    try {
        const workType = req.params.workType;
        const validTypes = ['Chef', 'Waiter', 'Manager'];
        if (validTypes.includes(workType.toLowerCase())) {
            const response = await Person.find({ work: workType });
            console.log('Response fetched!');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Work Type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT method to update person data
route.put('/:id', localAuthMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log("Data Updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE method to delete a person's record
route.delete('/:id', localAuthMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Data Deleted");
        res.status(200).json({ message: 'Person Deleted Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export router
module.exports = route;