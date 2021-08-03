const express = require('express')
const router = express.Router()
const professeurController =   require('../controllers/professeurs.controller');


// Find all Teachers 
router.get('/', professeurController.findAll);


// Create a new Teacher
router.post('/', professeurController.create);


// Retrieve a single Teacher with id
router.get('/:id', professeurController.findById);


// Update a Teacher with id
router.put('/:id', professeurController.update);


// Delete a Teacher with id
router.delete('/:id', professeurController.delete);


module.exports = router
