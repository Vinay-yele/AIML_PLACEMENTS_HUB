// backend/controllers/resourceController.js
import Resource from '../models/Resource.js';
import { existsSync, mkdirSync, unlink } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES Module-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the upload directory
const UPLOAD_DIR = join(__dirname, '../uploads');

// Ensure the upload folder exists
if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
}


// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export async function getAllResources(req, res) {
    try {
        // Find all resources and sort by upload date (newest first)
        const resources = await Resource.find().sort({ uploadDate: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Upload a new resource
// @route   POST /api/resources/upload
// @access  Private (Admin only) - for future implementation
export async function uploadResource(req, res) {
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
        unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
        });
        res.status(400).json({ message: err.message });
    }
}

// @desc    Download a resource by filename
// @route   GET /api/resources/download/:filename
// @access  Public
export async function downloadResource(req, res) {
    try {
        // Find the resource metadata by its unique filename
        const resource = await Resource.findOne({ filename: req.params.filename });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Construct the full path to the file
        const filePath = join(UPLOAD_DIR, resource.filename);

        // Check if the file actually exists on the server
        if (existsSync(filePath)) {
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
}

// @desc    Delete a resource (file and metadata)
// @route   DELETE /api/resources/:id
// @access  Private (Admin only) - for future implementation
export async function deleteResource(req, res) {
    try {
        // Find the resource by ID
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Delete the file from the server's file system
        unlink(resource.filePath, async (err) => {
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
}
