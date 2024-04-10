const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const courseSchema = new Schema({
    course_name: String,
    course_description: String,
    course_instruction: Array,
    date_created: Date
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
