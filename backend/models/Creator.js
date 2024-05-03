const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const creatorSchema = new Schema({
    creator_username: String,
    creator_email: String,
    creator_password: String,
});

const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;
