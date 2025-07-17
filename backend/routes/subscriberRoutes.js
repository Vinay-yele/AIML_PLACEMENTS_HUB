// backend/routes/subscriberRoutes.js
const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

// Route to get all subscribers (for admin) and add a new subscriber
router.route('/')
    .get(subscriberController.getAllSubscribers)
    .post(subscriberController.addSubscriber);

// Route to remove a subscriber by ID
router.delete('/:id', subscriberController.removeSubscriber);

module.exports = router;
