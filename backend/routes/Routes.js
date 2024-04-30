const express = require('express');

const app = express.Router();
const assignment_repository = require('../respositories/AssignmentRepository.js');


app.get('/getassignment', (req, res) => {
  assignment_repository.findAll().then((assignments) => {
    res.json(assignments);
  }).catch((error) => console.log(error));
});

// find one existing assignment
app.get('/getassignment/:id', (req, res) => {
  const { id } = req.params;
  assignment_repository.findById(id)
    .then((assignment) => {
      console.log(`find record by id: ${id}`);
      res.json(assignment);
    }).catch((error) => console.log(error));
});

// create the new course
app.post('/createassignment', (req, res) => {
  const { assignment_name, creator_email, steps } = req.body; // Destructure properties from req.body directly
  const assignment = { 
    assignment_name: assignment_name, 
    creator_email: creator_email, 
    steps: steps 
  };

  // Call repository.create() to save the todo item
  assignment_repository.create(assignment)
    .then((createassignment) => {
      res.json(createassignment); // Respond with the created todo item
      console.log(createassignment); // Log the created todo item
    })
    .catch((error) => console.log(error)); // Log any errors that occur
});

// delete a course item by id
app.delete('/assignment/:id', (req, res) => {
  const { id } = req.params;
  assignment_repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/assignment/:id', (req, res) => {
  const id = req.params.id; // Get the ID from the URL parameter
  const { assignment_name, creator_email, steps } = req.body; // Extract other details from the body
  const assignment = { 
    assignment_name: assignment_name, 
    creator_email: creator_email, 
    steps: steps 
  };

  // Call the repository function to update the assignment
  assignment_repository.updateById(id, assignment)
    .then(updatedDocument => {
      if (!updatedDocument) {
        // If no document was updated, send a 404 response
        return res.status(404).json({ message: 'No document found with the given ID' });
      }
      // Send back the updated document
      res.status(200).json(updatedDocument);
    })
    .catch((error) => {
      // Log the error and send a 500 response
      console.error(error);
      res.status(500).json({ message: 'Error updating document', error: error.toString() });
    });
});

module.exports = app;
