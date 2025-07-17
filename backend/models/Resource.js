// backend/models/Resource.js
const mongoose = require('mongoose');

// Define the schema for a Resource
const resourceSchema = new mongoose.Schema({
    originalName: { // The original name of the file uploaded by the user
        type: String,
        required: true,
        trim: true
    },
    filename: { // The unique filename generated and stored on the server
        type: String,
        required: true,
        unique: true, // Ensure filenames are unique
        trim: true
    },
    filePath: { // The path where the file is stored on the server
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Guidelines', 'Company Info', 'Prep Materials', 'Other'], // Predefined categories for resources
        default: 'Other'
    },
    uploadDate: {
        type: Date,
        default: Date.now // Automatically set the upload date
    },
    uploadedBy: { // Optional: to track who uploaded the resource
        type: String,
        default: 'Admin' // Default to 'Admin' for now, can be changed with user authentication
    },
    description: { // Optional: a brief description of the resource
        type: String,
        trim: true
    }
});

// Export the Resource model
module.exports = mongoose.model('Resource', resourceSchema);
