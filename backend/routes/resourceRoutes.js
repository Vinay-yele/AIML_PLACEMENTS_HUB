// backend/routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const multer = require('multer'); // Import multer for file uploads
const path = require('path');     // Node.js built-in module for path manipulation

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for uploads relative to this file
        // This will create a 'uploads' folder in your 'backend' directory
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        // Create a unique filename by appending timestamp and original extension
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize Multer upload middleware
const upload = multer({ storage: storage });

// Route to get all resources
router.get('/', resourceController.getAllResources);

// Route to upload a new resource
// 'upload.single('file')' means it expects a single file with the field name 'file'
router.post('/upload', upload.single('file'), resourceController.uploadResource);

// Route to download a resource by its unique filename
router.get('/download/:filename', resourceController.downloadResource);

// Route to delete a resource by its ID (and associated file)
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
