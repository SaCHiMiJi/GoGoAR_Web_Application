const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const assignmentSchema = new Schema({
    	assignment_name: String,
	    description: String,
    	creator_id: String,
    	ref_url: String,
    	mobileapp_url: String,
    	mobileapp_url_qrcode: {type: Buffer},
    	created_date: Date, 
    	modified_date: Date,
	    steps: { type: Schema.Types.Mixed }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
