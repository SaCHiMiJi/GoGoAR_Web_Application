const express = require('express');

const app = express.Router();
const assignment_repository = require('../respositories/AssignmentRepository.js');
// const todo_repository = require('../respositories/TodoRepository');

/*
// get all todo items in the db
app.get('/', (req, res) => {
  todo_repository.findAll().then((todos) => {
    res.json(todos);
  }).catch((error) => console.log(error));
});

// add a todo item
app.post('/', (req, res) => {
  const { name, description, done } = req.body; // Destructure properties from req.body directly
  const todo = { name, description, done };

  // Call repository.create() to save the todo item
  todo_repository.create(todo)
  .then((createdTodo) => {
    res.json(createdTodo); // Respond with the created todo item
    console.log(createdTodo); // Log the created todo item
  })
  .catch((error) => console.log(error)); // Log any errors that occur
  // repository.create(json(todo));
  // res.json(todo);
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  todo_repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, description: req.body.description, done: req.body.done };
  todo_repository.updateById(id, todo)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});
*/
// course
// get all existed
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
  const { assignment_id, assignment_name, creator_email, steps } = req.body; // Destructure properties from req.body directly
  const assignment = { assignment_id, assignment_name, creator_email, steps };

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

/*
// update a todo item
app.put('/assignment/:id', (req, res) => {
  const { id } = req.params;
  const course = { 
    course_name: req.body.name,
    course_description: req.body.description,
    done: req.body.done 
  };
  course_repository.updateById(id, course)
  .then(res.status(200).json([]))
  .catch((error) => console.log(error));
});

*/
module.exports = app;
