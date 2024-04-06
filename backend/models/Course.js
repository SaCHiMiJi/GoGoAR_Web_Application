const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const courseSchema = new Schema({
    course_id: Integer,
    course_name: String,
    course_description: String,
    date_created: Date
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
