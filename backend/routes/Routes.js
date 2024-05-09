const express = require('express');

const app = express.Router();
const assignment_repository = require('../respositories/AssignmentRepository.js');


// Retreive all existed assignment.
app.get('/getall', (req, res) => {
  console.log('getall');
  assignment_repository.findAll().then((assignments) => {
    return res.json(assignments);
  }).catch((error) => console.log(error));
});


// create the new assignment.
app.post('/create', (req, res) => {
  console.log('create');
  // Destructure properties from req.body directly
  const { assignment_name, description, creator_id, ref_url, steps } = req.body; 
  const createdDate = new Date();
  const assignment = { 
    assignment_name: assignment_name, 
    description: description,
    creator_id: creator_id,
    ref_url: ref_url,
    created_date: createdDate,
    steps: steps 
  };
  
  
  // Call repository.create() to save the todo item
  assignment_repository.create(assignment)
  .then((createassignment) => {
	  const id = createassignment._id;
	  console.log("new assignment id is the: " + id); // Log the created assignment
	  res.send(id);
  })
  .catch((error) => console.log(error)); // Log any errors that occur
});


// delete a assignment item by id
app.delete('/delete/:id', (req, res) => {
  console.log('delete');
  const { id } = req.params;
  assignment_repository.deleteById(id).then(() => {
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a assignment item
app.put('/modify/:id', (req, res) => {
  console.log('modify');
  const id = req.params.id; // Get the ID from the URL parameter
  const { assignment_name, description, creator_id, ref_url, steps } = req.body; // Extract other details from the body
  const newDate = new Date();
  const assignment = { 
    assignment_name: assignment_name, 
    description: description,
    creator_id: creator_id, 
    ref_url: ref_url, 
    modified_date: newDate,
    steps: steps 
  };
  
  // Call the repository function to update the assignment
  assignment_repository.updateById(id, assignment)
  .then(updatedDocument => {
    if (!updatedDocument) {
      // If no assignment was updated, send a 404 response
      return res.status(404).json({ message: 'No assignment found with the given ID' });
    }
    // Send back the updated assignment
    res.status(200).json(updatedDocument);
  })
  .catch((error) => {
    // Log the error and send a 500 response
    console.error(error);
    res.status(500).json({ message: 'Error updating assignment', error: error.toString() });
  });
  
});

/* 
core feature API
*/
// find one existing assignment.
app.get('/getassignment/:id', (req, res) => {
  console.log('get assignment by id');
  const { id } = req.params;
  assignment_repository.findById(id)
  .then((assignment) => {
    console.log(`find record by id: ${id}`);
    res.json(assignment);
  }).catch((error) => console.log(error));
});

// post from mobile application.
app.put('/addappurl/:id', (req, res) => {
  console.log('add app\'s URL');
  const id = req.params.id;
  const { mobileAppURL } = req.body;
   
  assignment_repository.updateURL(id, mobileAppURL)
  .then(updatedDocument => {
    if (!updatedDocument) {
      // If no assignment was updated, send a 404 response
      return res.status(404).json({ message: 'No assignment found with the given ID' });
    }
    // Send back the updated assignment
    res.status(200).json(updatedDocument);
  })
  .catch((error) => {
    // Log the error and send a 500 response
    console.error(error);
    res.status(500).json({ message: 'Error updating assignment', error: error.toString() });
  });

});

// get unity url
app.get('/getappurl/:id', (req, res) => {
  console.log('get app\'s URL');
  const id = req.params.id;
  assignment_repository.getMobileAppURL(id)
  .then((dburl) => {
    const url = dburl.mobileapp_url;
    if(url) {
      console.log(`send the URL: ${ url }`);
      res.send(url);
    } else {
      res.send(false)
    }
  })
  .catch((error) => {
    // Log the error and send a 500 response
    console.error(error);
    res.status(500).send(error.toString());
  });
});

// Respond the array of nested assignment, with the array of id
app.post('/getassignmentgroup', async (req, res) => {
  console.log('get assignment group');
  try {
    const assignmentIds = req.body; // Assuming the body itself is an array of IDs

    // Validate the input to ensure it is an array
    if (!Array.isArray(assignmentIds)) {
      return res.status(400).json({ message: 'Input should be an array of assignment IDs' });
    }

    const assignments = await assignment_repository.findMultiple(assignmentIds);
    res.json(assignments);
  } catch (error) {
    console.error('Error querying assignments:', error);
    res.status(500).json({ message: 'Error retrieving assignments', error: error });
  }
});

module.exports = app;
