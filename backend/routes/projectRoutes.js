// backend/routes/projectRoutes.js
import express from 'express';
const router = express.Router();
import * as projectController from '../controllers/projectController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../uploads/projects');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
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
