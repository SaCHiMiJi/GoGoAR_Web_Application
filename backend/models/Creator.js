const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const creatorSchema = new Schema({
    creator_username: {
	    type: String,
	    required: true
    },
    creator_email: {
	    type: String,
	    unique: true,
	    index: true,
	    required: true
    },
    creator_password: {
	    type: String,
	    required: true
    }
});

const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;
