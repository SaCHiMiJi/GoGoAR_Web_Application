const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const assignmentSchema = new Schema({
    assignment_name: String,
    creator_email: String,
    steps: { type: Schema.Types.Mixed }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
