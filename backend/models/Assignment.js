const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const assignmentSchema = new Schema({
    assignment_name: String,
    creator_id: String,
    ref_url: String,
    mobileapp_url: String,
    last_date_modified: Date,
    steps: { type: Schema.Types.Mixed }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
