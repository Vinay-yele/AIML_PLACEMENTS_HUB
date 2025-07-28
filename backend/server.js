// backend/server.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';             // ✅ ESM-compatible dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://aiml-placements-hub.vercel.app',
    'https://aimlplacementshub.me'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(json());

// Connect to MongoDB
connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
    res.send('Placement Coordination Backend API');
});

// Route imports
import announcementRoutes from './routes/announcementRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import alumniExperienceRoutes from './routes/alumniExperienceRoutes.js';

// Mount routes
app.use('/api/announcements', announcementRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/alumni-experiences', alumniExperienceRoutes); // NEW: Use alumni experience routes


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
