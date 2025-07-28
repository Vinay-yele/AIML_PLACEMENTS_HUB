import express from 'express';
import {
    getApprovedAlumniExperiences,
    submitAlumniExperience,
    getAllAlumniExperiences,
    updateAlumniExperience,
    deleteAlumniExperience
} from '../controllers/alumniExperienceController.js';

const router = express.Router();

// Public route to get all APPROVED alumni experiences
router.get('/', getApprovedAlumniExperiences);

// Public route to submit a new alumni experience
router.post('/', submitAlumniExperience);

// Private (Admin) route to get ALL alumni experiences (including pending/rejected)
router.get('/admin', getAllAlumniExperiences);

// Private (Admin) routes to update or delete a specific alumni experience by ID
router.route('/:id')
    .patch(updateAlumniExperience) // For approving/rejecting
    .delete(deleteAlumniExperience);

export default router;
