const express = require('express')
const router = express.Router()
const etudiantController =   require('../controllers/etudiants.controller');


// Find all students 
router.get('/', etudiantController.findAll);


// Create a new student
router.post('/', etudiantController.create);


// Retrieve a single student with id
router.get('/:id', etudiantController.findById);


// Update a student with id
router.put('/:id', etudiantController.update);


// Delete a student with id
router.delete('/:id', etudiantController.delete);


module.exports = router
