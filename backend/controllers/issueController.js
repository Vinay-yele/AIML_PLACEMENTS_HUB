// backend/controllers/issueController.js
import Issue from '../models/Issue.js';
import { sendEmail } from '../utils/emailService.js';

// @desc    Get all issues       
// @route   GET /api/issues
// @access  Public (or Private for Admin dashboard later)
export async function getAllIssues(req, res) {
    try {
        const issues = await Issue.find().sort({ dateSubmitted: -1 });
        res.json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Get a single issue by ID
// @route   GET /api/issues/:id
// @access  Public (or Private for Admin dashboard later)
export async function getIssueById(req, res) {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.json(issue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Public
export async function createIssue(req, res) {
    const issue = new Issue({
        studentName: req.body.studentName,
        studentEmail: req.body.studentEmail,
        subject: req.body.subject,
        description: req.body.description
    });
    try {
        const newIssue = await issue.save();

        // --- Email Notification Logic ---
        const adminEmail = process.env.ADMIN_EMAIL || 'vinayyele1998@gmail.com'; // Replace with the actual admin email
        const emailSubject = `New Issue Submitted: ${newIssue.subject}`;
        const emailText = `A new issue has been submitted:\n\nStudent Name: ${newIssue.studentName}\nStudent Email: ${newIssue.studentEmail}\nSubject: ${newIssue.subject}\nDescription: ${newIssue.description}\n\nView details in your admin dashboard.`;
        const emailHtml = `
            <p>A new issue has been submitted:</p>
            <ul>
                <li><strong>Student Name:</strong> ${newIssue.studentName}</li>
                <li><strong>Student Email:</strong> ${newIssue.studentEmail}</li>
                <li><strong>Subject:</strong> ${newIssue.subject}</li>
                <li><strong>Description:</strong> ${newIssue.description}</li>
            </ul>
            <p>Please log in to the admin dashboard to review this issue.</p>
        `;

        // Send the email asynchronously, but don't block the API response
        sendEmail(adminEmail, emailSubject, emailText, emailHtml)
            .then(result => {
                if (result.success) {
                    console.log('Issue submission email sent successfully!');
                } else {
                    console.error('Failed to send issue submission email:', result.error);
                }
            })
            .catch(err => console.error('Error in sendEmail promise:', err));
        // --- End Email Notification Logic ---

        res.status(201).json(newIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @desc    Update an issue (e.g., change status, add resolution notes)
// @route   PATCH /api/issues/:id
// @access  Private (Admin only) - for future implementation
export async function updateIssue(req, res) {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.json(updatedIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
// @access  Private (Admin only) - for future implementation
export async function deleteIssue(req, res) {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.json({ message: 'Issue deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
