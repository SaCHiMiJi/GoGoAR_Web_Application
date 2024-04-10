const express = require('express');

const app = express.Router();
const course_repository = require('../respositories/CourseRepository');
const todo_repository = require('../respositories/TodoRepository');

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
  /*
  repository.create(json(todo));
  res.json(todo);
  */
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

// course
// get all existed courses
app.get('/getcourses', (req, res) => {
  course_repository.findAll().then((courses) => {
    res.json(courses);
  }).catch((error) => console.log(error));
});

// create the new course
app.post('/createcourse', (req, res) => {
  const { name, description, done } = req.body; // Destructure properties from req.body directly
  const course = { name, description, done };

  // Call repository.create() to save the todo item
  course_repository.create(course)
  .then((createdCourse) => {
    res.json(createdCourse); // Respond with the created todo item
    console.log(createdCourse); // Log the created todo item
  })
  .catch((error) => console.log(error)); // Log any errors that occur
});

// delete a course item by id
app.delete('/course:id', (req, res) => {
  const { id } = req.params;
  course_repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/course:id', (req, res) => {
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

module.exports = app;
