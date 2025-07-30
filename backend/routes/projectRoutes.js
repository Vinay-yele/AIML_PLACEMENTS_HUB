// backend/routes/projectRoutes.js
import express from 'express';
const router = express.Router();
import * as projectController from '../controllers/projectController.js';
import { upload } from '../middleware/multer.middleware.js';
// Removed path and fileURLToPath as they are not needed for CloudinaryStorage directly
// import path from 'path';
// import { fileURLToPath } from 'url';



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