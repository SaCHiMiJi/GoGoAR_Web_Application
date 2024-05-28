const express = require('express');

const app = express.Router();
const assignment_repository = require('../repositories/AssignmentRepository.js');
const creator_repository = require('../repositories/CreatorRepository.js');

// securities for authentication route.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwt_token = process.env.JWT_TOKEN;
// Retreive all existed assignment.
app.get('/getall', (req, res) => {
  assignment_repository.findAll().then((assignments) => {
    return res.json(assignments);
  }).catch((error) => console.log(error));
});


// create the new assignment.
app.post('/create', async (req, res) => {
  // Destructure properties from req.body directly
  let { assignment_name, description, creator_id, ref_url, steps } = req.body; 
  const createdDate = new Date();
  
  const nameValidation = await assignment_repository.findByName(assignment_name);
  console.log(nameValidation.length);
  if(nameValidation.length > 0) {
    return res.status(200).json({"message": "the name is already used."})
  }
  
  // the steps value would be string if it received from frontend, but JSON from body.
  if(typeof steps === "string") {
  	steps = JSON.parse(steps);
  }

  let assignment = { 
    assignment_name: assignment_name, 
    description: description,
    creator_id: creator_id,
    ref_url: ref_url,
    created_date: createdDate,
    steps: steps	 
  };
  console.log(steps);
  
  // Call repository.create() to save the todo item
  assignment_repository.create(assignment)
    .then((createassignment) => {
	    const id = createassignment._id;
	    console.log("new assignment id is the: " + id); // Log the created assignment.
      // update the mobile app url
      assignment_repository.updateURL(id, "unitydl://mylink?" + id)
        .then(updatedDocument => {
          if (!updatedDocument) {
            // If no assignment was updated, send a 404 response
            return res.status(404).json({ message: 'No assignment found with the given ID' });
          }
          // Send back the updated assignment
          res.send(id);
        })
        .catch((error) => {
          // Log the error and send a 500 response
          console.error(error);
          res.status(500).json({ message: 'Error updating assignment', error: error.toString() });
        });
  	})
    .catch((error) => console.log(error)); // Log any errors that occur
});


// delete a assignment item by id
app.delete('/delete/:id', (req, res) => {
  console.log('delete');
  const { id } = req.params;
  assignment_repository.deleteById(id).then(() => {
    console.log(`Deleted record with id: ${id}`);
    res.status(200).send("Delete Complete");
  }).catch((error) => console.log(error));
});

// update a assignment item
app.put('/modify/:id', (req, res) => {
  const id = req.params.id; // Get the ID from the URL parameter
  let { assignment_name, description, creator_id, ref_url, steps } = req.body; // Extract other details from the body
  const newDate = new Date();

  
  // the steps value would be string if it received from frontend, but JSON from body.
  if(typeof steps === "string") {
  	steps = JSON.parse(steps);
  }

  let assignment = { 
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
    return res.status(200).json(updatedDocument);
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
  const { id } = req.params;
  assignment_repository.findById(id)
  .then((assignment) => {
    console.log(`find record by id: ${id}`);
    res.json(assignment);
  }).catch((error) => console.log(error));
});

// post from mobile application.
app.put('/addappurl/:id', (req, res) => {
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

// get the assignment by userID.
app.get('/getassignmentbyuser/:id', async (req, res) => {
  const userid = req.params.id;
  
  try {
    creator_repository.findById(userid);
  } catch(error) {
    return res.status(400).json({ "message": "Creator not found."});
  }
  assignment_repository.findByCreatorID(userid.toString())
    .then((assignments) => {
      return res.json(assignments);
    })
    .catch((error) => {
      return res.status(500).send(error.toString());
    });
}
);

// Respond the array of nested assignment, with the array of id
app.post('/getassignmentgroup', async (req, res) => {
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
}
);

// Authentication
// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const creatorDetail = { 
      creator_username: username, 
      creator_email: email, 
      creator_password: hashedPassword 
    };
    console.log(creatorDetail);
    console.log("find existing email...");
    const user = await creator_repository.findByEmail(email);
    console.log("finding complete.");

    // if the input email is not presence in database.
    if (user !== null) {
            return res.status(401).json({ error: 'User\'s email is already exist.' });
    }

    creator_repository.create(creatorDetail).
    then(() =>{
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch(error) {
      console.log(error.toString());
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await creator_repository.findByEmail(email);
    // if the input email is not presence in database.
    if (!user) {
      return res.status(401).json({ error: 'User\'s email not found.\nPlease ensure that your email is registered.' });
    }
    
    // password validating.
    const passwordMatch = await bcrypt.compare(password, user.creator_password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Wrong password, Please tried again.' });
    }
    const token = jwt.sign({ userID: user._id }, process.env.JWT_TOKEN, {
            expiresIn: '24h'
      });
    res.status(200).json({ 
      _id: user._id,
      creator_username: user.creator_username,
      creator_email: user.creator_email,
      token: token 
    });
});

app.get('/getredirectionurl/:id', (req, res) => {
  const id = req.params.id;
  assignment_repository.getMobileAppURL(id)
  .then((dburl) => {
    const url = dburl.mobileapp_url;
    if(url) {
      console.log(`send the URL: ${ url }`);
      res.send("http://127.0.0.1:3030/appredirection?url=" + url);
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

module.exports = app;
