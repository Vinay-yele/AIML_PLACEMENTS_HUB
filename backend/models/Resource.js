// backend/models/Resource.js
import { Schema, model } from 'mongoose';

// Define the schema for a Resource
const resourceSchema = new Schema({
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    filename: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    filePath: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Guidelines', 'Company Info', 'Prep Materials', 'Other'],
        default: 'Other'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: String,
        default: 'Admin'
    },
    description: {
        type: String,
        trim: true
    }
});

export default model('Resource', resourceSchema);
