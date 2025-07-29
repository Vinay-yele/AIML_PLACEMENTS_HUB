// backend/controllers/projectController.js
import Project from '../models/Project.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { sendEmail } from '../utils/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../uploads/projects');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const getApprovedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ status: 'Approved' }).sort({ approvedAt: -1, submittedAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllProjectsAdmin = async (req, res) => {
    try {
        const projects = await Project.find().sort({ submittedAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const submitProject = async (req, res) => {
    // Destructure simplified fields from req.body
    const { title, shortDescription, technologies, githubLink, liveDemoLink, submittedByName, submittedByEmail } = req.body;

    const technologiesArray = technologies ? technologies.split(',').map(tech => tech.trim()) : [];

    // Check for single file from multer
    const imagePath = req.file ? req.file.path : null;

    // Basic validation
    if (!title || !shortDescription || technologiesArray.length === 0 || !githubLink || !imagePath || !submittedByName || !submittedByEmail) {
        // If file was uploaded but validation fails, clean it up
        if (imagePath) {
            fs.unlink(imagePath, (err) => { if (err) console.error('Error cleaning up file:', err); });
        }
        return res.status(400).json({ message: 'Please fill all required fields (Title, Short Description, Technologies, GitHub Link, Image, Your Name, Your Email).' });
    }

    const newProject = new Project({
        title,
        shortDescription,
        technologies: technologiesArray,
        githubLink,
        liveDemoLink,
        imagePath, // Use single imagePath
        submittedBy: { name: submittedByName, email: submittedByEmail },
        status: 'Pending'
    });

    try {
        const savedProject = await newProject.save();

        const adminEmail = process.env.ADMIN_EMAIL || 'your_admin_email@example.com';
        const emailSubject = `New Project Submission: ${savedProject.title}`;
        const emailText = `A new project has been submitted for review:\n\nProject: ${savedProject.title}\nSubmitted By: ${savedProject.submittedBy.name} (${savedProject.submittedBy.email})\nTechnologies: ${savedProject.technologies.join(', ')}\n\nReview it in your admin dashboard.`;
        const emailHtml = `
            <p>A new project has been submitted for review:</p>
            <ul>
                <li><strong>Project:</strong> ${savedProject.title}</li>
                <li><strong>Submitted By:</strong> ${savedProject.submittedBy.name} (${savedProject.submittedBy.email})</li>
                <li><strong>Technologies:</strong> ${savedProject.technologies.join(', ')}</li>
            </ul>
            <p>Please log in to the admin dashboard to review and approve/reject this project.</p>
        `;

        sendEmail(adminEmail, emailSubject, emailText, emailHtml)
            .then(result => {
                if (result.success) {
                    console.log('Project submission email sent successfully!');
                } else {
                    console.error('Failed to send project submission email:', result.error);
                }
            })
            .catch(err => console.error('Error in sendEmail promise for project submission:', err));

        res.status(201).json(savedProject);
    } catch (err) {
        if (imagePath) { // Clean up file if DB save fails
            fs.unlink(imagePath, (unlinkErr) => { if (unlinkErr) console.error('Error cleaning up file after DB save failure:', unlinkErr); });
        }
        res.status(400).json({ message: err.message });
    }
};

export const updateProject = async (req, res) => {
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

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete associated image file from the server
        if (project.imagePath) {
            fs.unlink(project.imagePath, (err) => {
                if (err) console.error(`Error deleting file ${project.imagePath}:`, err);
            });
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project and associated file deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
