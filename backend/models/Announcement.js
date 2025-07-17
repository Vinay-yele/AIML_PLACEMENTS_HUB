const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Admin'
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        enum: ['News', 'Forwarded Email', 'Notice', 'General'],
        default: 'General'
    }
});

module.exports = mongoose.model('Announcement', announcementSchema);
