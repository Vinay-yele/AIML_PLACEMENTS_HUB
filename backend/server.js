// backend/server.js
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement_app'; // Default local URI

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Placement Coordination Backend API');
});

const announcementRoutes = require('./routes/announcementRoutes');
const issueRoutes = require('./routes/issueRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
app.use('/api/issues', issueRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.use('/api/announcements', announcementRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
