const express = require('express');
const route = express.Router();
const Person = require('../models/Person');

const passport = require('../auth'); // Import passport for middleware

const {jwtAuthMiddleware, generateToken} = require('./../jwt');


// Define the local authentication middleware for protecting routes
const localAuthMiddleware = passport.authenticate('local', { session: false });

// PUBLIC ROUTE - NO AUTHENTICATION REQUIRED  **

// POST route to add a person (Sign Up)
route.post('/signup', async (req, res) => {
    try {
        const data = req.body;  // Assuming the request body contains the person data

        // Create a new Person doc using the Mongoose model
        const newPerson = new Person(data);

        // Save the new Person to the database
        const response = await newPerson.save();
        console.log('User Registered - Data saved!');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);
        
        res.status(200).json({ message: 'User registered successfully', response: response, token: token});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Route
route.post('/login', async(req, res) =>{
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
route.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// PROTECTED ROUTES - AUTHENTICATION REQUIRED **
 

// GET method to get all persons
route.get('/', jwtAuthMiddleware, async (req, res) => {
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
route.get('/:workType', async (req, res) => {
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
route.put('/:id', async (req, res) => {
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
route.delete('/:id', async (req, res) => {
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