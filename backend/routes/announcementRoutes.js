const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

router.get('/getan', announcementController.getAllAnnouncements);
router.post('/creatan', announcementController.createAnnouncement);

module.exports = router;