const express = require('express')
const router = express.Router()
const moduleController =   require('../controllers/modules.controller');


// Find all modules 
router.get('/', moduleController.findAll);


// Create a new module
router.post('/', moduleController.create);


// Retrieve a single module with id
router.get('/:id', moduleController.findById);


// Update a module with id
router.put('/:id', moduleController.update);


// Delete a module with id
router.delete('/:id', moduleController.delete);


module.exports = router
