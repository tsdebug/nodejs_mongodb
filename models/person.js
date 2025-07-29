const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        require: true
    },
    mobile:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    }
});

// Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;