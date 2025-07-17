// backend/models/Subscriber.js
const mongoose = require('mongoose');

// Define the schema for an Email Subscriber
const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure each email is unique
        trim: true,
        lowercase: true, // Store emails in lowercase
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email regex validation
    },
    subscribedAt: {
        type: Date,
        default: Date.now // Automatically set the subscription date
    }
});

// Export the Subscriber model
module.exports = mongoose.model('Subscriber', subscriberSchema);
