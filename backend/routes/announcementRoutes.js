// backend/routes/announcementRoutes.js

import { Router } from 'express';
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';

const router = Router();

router.get('/', getAllAnnouncements);
router.post('/', createAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router; // ✅ ES Module default export
