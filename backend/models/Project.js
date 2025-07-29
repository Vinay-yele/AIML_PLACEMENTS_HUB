// backend/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: { // A brief summary for cards
        type: String,
        required: true,
        trim: true,
        maxlength: 250 // Increased limit slightly for better description
    },
    technologies: { // Array of strings (e.g., ['Python', 'TensorFlow', 'React'])
        type: [String],
        required: true,
        default: []
    },
    githubLink: {
        type: String,
        trim: true,
        required: true, // Making GitHub link required for showcase
        match: [/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(\/)?$/, 'Please enter a valid GitHub URL']
    },
    liveDemoLink: { // Optional live demo URL
        type: String,
        trim: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL'] // Basic URL validation
    },
    imagePath: { // Single path to the primary screenshot image on the server
        type: String,
        required: true, // Making a screenshot required for showcase
        trim: true
    },
    submittedBy: { // Details of the student who submitted (could be linked to a User model later)
        name: { type: String, required: true, trim: true },
        email: { type: String, trim: true, lowercase: true, match: [/.+@.+\..+/, 'Please fill a valid email address'] }
    },
    status: { // Approval status: Pending, Approved, Rejected
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    approvedAt: { // Date when the project was approved
        type: Date
    },
    approvedBy: { // Admin who approved it
        type: String,
        trim: true
    }
});

export default mongoose.model('Project', projectSchema);
