// backend/routes/projectRoutes.js
import express from 'express';
const router = express.Router();
import * as projectController from '../controllers/projectController.js';
import multer from 'multer';
// Removed path and fileURLToPath as they are not needed for CloudinaryStorage directly
// import path from 'path';
// import { fileURLToPath } from 'url';

// NEW: Cloudinary imports
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'aiml_projects', // Folder name in your Cloudinary account
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, // Unique public_id
    },
});

// Initialize Multer upload middleware for a SINGLE file
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Public route to get all APPROVED projects
router.get('/', projectController.getApprovedProjects);

// Public route to submit a new project (with SINGLE image upload)
// 'upload.single('image')' means it expects a single file with field name 'image'
router.post('/', upload.single('image'), projectController.submitProject);

// Private (Admin) route to get ALL projects (including pending/rejected)
router.get('/admin', projectController.getAllProjectsAdmin);

// Private (Admin) routes to update or delete a specific project by ID
router.route('/:id')
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject);

export default router;
