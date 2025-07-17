// backend/models/Issue.js
const mongoose = require('mongoose');

// Define the schema for an Issue
const issueSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true // Remove whitespace from both ends of a string
    },
    studentEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Store emails in lowercase
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email regex validation
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Closed'], // Predefined statuses for issues
        default: 'Pending' // Default status for new issues
    },
    dateSubmitted: {
        type: Date,
        default: Date.now // Automatically set the submission date
    },
    resolutionNotes: { // Optional field for admin to add resolution details
        type: String,
        trim: true
    },
    resolvedBy: { // Optional field to track who resolved the issue
        type: String,
        trim: true
    },
    resolvedDate: { // Optional field for resolution date
        type: Date
    }
});

// Export the Issue model
module.exports = mongoose.model('Issue', issueSchema);
