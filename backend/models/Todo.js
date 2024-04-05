const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const todoSchema = new Schema({
  name: String,
  description: String,
  done: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
