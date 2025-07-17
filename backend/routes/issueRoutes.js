// backend/routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Route to get all issues and create a new issue
router.route('/')
    .get(issueController.getAllIssues)
    .post(issueController.createIssue);

// Route to get, update, or delete a single issue by ID
router.route('/:id')
    .get(issueController.getIssueById)
    .patch(issueController.updateIssue) // PATCH for partial updates
    .delete(issueController.deleteIssue);

module.exports = router;
