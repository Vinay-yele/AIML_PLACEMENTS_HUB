// backend/controllers/resourceController.js
const Resource = require('../models/Resource');
const path = require('path'); // Node.js built-in module for path manipulation
const fs = require('fs');     // Node.js built-in module for file system operations

// Define the directory where uploaded files will be stored
const UPLOAD_DIR = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true }); // Create directory if it doesn't exist
}

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
exports.getAllResources = async (req, res) => {
    try {
        // Find all resources and sort by upload date (newest first)
        const resources = await Resource.find().sort({ uploadDate: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Upload a new resource
// @route   POST /api/resources/upload
// @access  Private (Admin only) - for future implementation
exports.uploadResource = async (req, res) => {
    // Check if a file was uploaded by multer middleware
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a new Resource instance with file details and other body data
    const newResource = new Resource({
        originalName: req.file.originalname,
        filename: req.file.filename, // Multer provides this unique filename
        filePath: req.file.path,     // Multer provides the full path
        category: req.body.category || 'Other', // Category from form, default to 'Other'
        description: req.body.description // Description from form
    });

    try {
        // Save the resource metadata to the database
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (err) {
        // If saving to DB fails, delete the uploaded file to prevent orphans
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
        });
        res.status(400).json({ message: err.message });
    }
};

// @desc    Download a resource by filename
// @route   GET /api/resources/download/:filename
// @access  Public
exports.downloadResource = async (req, res) => {
    try {
        // Find the resource metadata by its unique filename
        const resource = await Resource.findOne({ filename: req.params.filename });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Construct the full path to the file
        const filePath = path.join(UPLOAD_DIR, resource.filename);

        // Check if the file actually exists on the server
        if (fs.existsSync(filePath)) {
            // Send the file for download
            res.download(filePath, resource.originalName, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    // If there's an error sending the file, but it exists, it's a server issue
                    res.status(500).json({ message: 'Could not download the file' });
                }
            });
        } else {
            // If metadata exists but file is missing, return 404
            res.status(404).json({ message: 'File not found on server' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a resource (file and metadata)
// @route   DELETE /api/resources/:id
// @access  Private (Admin only) - for future implementation
exports.deleteResource = async (req, res) => {
    try {
        // Find the resource by ID
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Delete the file from the server's file system
        fs.unlink(resource.filePath, async (err) => {
            if (err) {
                console.error('Error deleting file from server:', err);
                // Even if file deletion fails, try to delete metadata from DB
                // Consider if you want to return 500 here or proceed to delete DB entry
            }

            // Delete the resource metadata from the database
            await Resource.findByIdAndDelete(req.params.id);
            res.json({ message: 'Resource and file deleted successfully' });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
