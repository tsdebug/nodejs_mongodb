const mongoose = require('mongoose');


// Define the menu schema

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum:['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0,
    }
})

// Create a model 
const MenuItem = mongoose.model('MenuItem', menuItemSchema); // name of the collection is determined by the model name

module.exports = MenuItem;