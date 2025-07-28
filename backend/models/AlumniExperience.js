import mongoose from 'mongoose';

const alumniExperienceSchema = new mongoose.Schema({
    alumniName: {
        type: String,
        required: true,
        trim: true
    },
    alumniEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    batch: {
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear() + 5
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    approvedAt: {
        type: Date
    },
    approvedBy: {
        type: String,
        trim: true
    }
});

export default mongoose.model('AlumniExperience', alumniExperienceSchema);
