// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4001; // Use host's PORT or default to 4001
const MONGO_URI = process.env.MONGO_URI; // MONGO_URI should be set in Render env vars

// Middleware
// Configure CORS for production to allow your Vercel frontend
const allowedOrigins = [
    'http://localhost:3000', // For local frontend development
    'https://aiml-placements-hub.vercel.app' // <--- YOUR LIVE VERCEL FRONTEND URL
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Placement Coordination Backend API');
});

// Import and use routes
const announcementRoutes = require('./routes/announcementRoutes');
const issueRoutes = require('./routes/issueRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');


app.use('/api/announcements', announcementRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/subscribers', subscriberRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
