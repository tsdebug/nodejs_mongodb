const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItems'); // Import the Menu schema

// POST Method to add a Menu Item
router.post('/', async(req, res) =>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved !');
        res.status(200).json(response);
    }

    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET methode to get/fetch the Menu Items
router.get('/', async(req, res) =>{
    try{
        const data = await MenuItem.find();
        console.log('Data Fetched !');
        res.status(200).json(data);
    }

    catch{
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Parametrised API calls for menu on the basis of tasteType
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType; // Extract the taste type from thr URL parameter
        if (tasteType == 'sweet' || workType == 'spicy' || workType == 'sour') {
            const response = await Menu.find({ taste: tasteType });
            console.log('Response fetched !');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid Taste Type..' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// PUT method to update menu data
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // Extract the id from the URL parameters
        const updatedMenuData = req.body; // Updated data for the Menu

        const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return the updated doc
            runValidators: true // Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Menu not found'});
        }

        console.log("Data Updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// DELETE methode to delete menu record
router.delete('/:id', async(req, res) => {
    try{
        const menuId = req.params.id; // Extract the id from the URL parameters

        // Assuming you have a Menu Model
        const response = await Menu.findByIdAndDelete(menuId);

        if(!response){
            return res.status(404).json({error: 'Menu not found'});
        }
        console.log("Data Deleted");
        res.status(200).json({message: 'Menu Deleted Sucessfully'});
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// export router 
module.exports = router;