const express = require('express');

const app = express.Router();
const repository = require('../respositories/TodoRepository');

// get all todo items in the db
app.get('/', (req, res) => {
  repository.findAll().then((todos) => {
    res.json(todos);
  }).catch((error) => console.log(error));
});

// add a todo item
app.post('/', (req, res) => {
  const { name, description, done } = req.body; // Destructure properties from req.body directly
  const todo = { name, description, done };

  // Call repository.create() to save the todo item
  repository.create(todo)
  .then((createdTodo) => {
    res.json(createdTodo); // Respond with the created todo item
    console.log(createdTodo); // Log the created todo item
  })
  .catch((error) => console.log(error)); // Log any errors that occur
  /*
  repository.create(json(todo));
  res.json(todo);
  */
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, description: req.body.description, done: req.body.done };
  repository.updateById(id, todo)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});
module.exports = app;
