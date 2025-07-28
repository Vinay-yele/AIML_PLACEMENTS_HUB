import AlumniExperience from '../models/AlumniExperience.js';
import { sendEmail } from '../utils/emailService.js'; // Email utility

// @desc    Get all APPROVED alumni experiences
export async function getApprovedAlumniExperiences(req, res) {
    try {
        const experiences = await AlumniExperience.find({ status: 'Approved' }).sort({ approvedAt: -1, submittedAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Get ALL alumni experiences (admin view)
export async function getAllAlumniExperiences(req, res) {
    try {
        const experiences = await AlumniExperience.find().sort({ submittedAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Submit a new alumni experience
export async function submitAlumniExperience(req, res) {
    const { alumniName, alumniEmail, batch, company, role, experience } = req.body;

    if (!alumniName || !batch || !company || !role || !experience) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const newExperience = new AlumniExperience({
        alumniName,
        alumniEmail,
        batch,
        company,
        role,
        experience,
        status: 'Pending'
    });

    try {
        const savedExperience = await newExperience.save();

        // Optional Email Notification
        const adminEmail = process.env.ADMIN_EMAIL || 'your_admin_email@example.com';
        const emailSubject = `New Alumni Experience Submission: ${savedExperience.alumniName}`;
        const emailText = `A new alumni experience has been submitted for review:\n\nAlumni Name: ${savedExperience.alumniName}\nBatch: ${savedExperience.batch}\nCompany: ${savedExperience.company}\nRole: ${savedExperience.role}\nExperience: ${savedExperience.experience.substring(0, 200)}...`;
        const emailHtml = `
            <p>A new alumni experience has been submitted for review:</p>
            <ul>
                <li><strong>Alumni Name:</strong> ${savedExperience.alumniName}</li>
                <li><strong>Batch:</strong> ${savedExperience.batch}</li>
                <li><strong>Company:</strong> ${savedExperience.company}</li>
                <li><strong>Role:</strong> ${savedExperience.role}</li>
                <li><strong>Experience Snippet:</strong> ${savedExperience.experience.substring(0, 200)}...</li>
            </ul>
            <p>Please log in to the admin dashboard to review this submission.</p>
        `;

        sendEmail(adminEmail, emailSubject, emailText, emailHtml)
            .then(result => {
                if (result.success) {
                    console.log('Alumni experience submission email sent successfully!');
                } else {
                    console.error('Failed to send email:', result.error);
                }
            })
            .catch(err => console.error('Email send error:', err));

        res.status(201).json(savedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @desc    Update an alumni experience
export async function updateAlumniExperience(req, res) {
    try {
        const { status } = req.body;
        const updateData = { ...req.body };

        if (status === 'Approved' && !req.body.approvedAt) {
            updateData.approvedAt = new Date();
            updateData.approvedBy = req.body.approvedBy || 'Admin';
        } else if (status === 'Rejected' || status === 'Pending') {
            updateData.approvedAt = null;
            updateData.approvedBy = null;
        }

        const updatedExperience = await AlumniExperience.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedExperience) {
            return res.status(404).json({ message: 'Alumni experience not found' });
        }
        res.json(updatedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @desc    Delete an alumni experience
export async function deleteAlumniExperience(req, res) {
    try {
        const deletedExperience = await AlumniExperience.findByIdAndDelete(req.params.id);
        if (!deletedExperience) {
            return res.status(404).json({ message: 'Alumni experience not found' });
        }
        res.json({ message: 'Alumni experience deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
