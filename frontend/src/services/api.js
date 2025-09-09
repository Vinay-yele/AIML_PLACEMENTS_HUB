// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
        baseURL: 'https://aiml-placements-hub.onrender.com'
    });

// --- Announcements ---
export const getAnnouncements = () => API.get('/announcements');
export const createAnnouncement = (announcementData) => API.post('/announcements', announcementData);
export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);


// --- Issues ---
export const submitIssue = (issueData) => API.post('/issues', issueData);
export const getAllIssues = () => API.get('/issues');

// --- Resources ---
export const getResources = () => API.get('/resources');
export const uploadResource = (formData) => API.post('/resources/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const downloadResource = (filename) => API.get(`/resources/download/${filename}`, {
    responseType: 'blob'
});


// --- Feedback ---
export const submitFeedback = (feedbackData) => API.post('/feedback', feedbackData);
export const getAllFeedback = () => API.get('/feedback');

// --- Alumni Experiences ---
export const getApprovedAlumniExperiences = () => API.get('/alumni-experiences'); // Public view
export const submitAlumniExperience = (experienceData) => API.post('/alumni-experiences', experienceData); // Public submission
export const getAllAlumniExperiencesAdmin = () => API.get('/alumni-experiences/admin'); // Admin view
export const updateAlumniExperienceStatus = (id, statusData) => API.patch(`/alumni-experiences/${id}`, statusData); // Admin update status
export const deleteAlumniExperience = (id) => API.delete(`/alumni-experiences/${id}`); // Admin delete

// --- NEW: API Functions for Projects ---
export const getApprovedProjects = () => API.get('/projects'); // Public view
export const submitProject = (formData) => API.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' } // Important for file uploads
});
export const getAllProjectsAdmin = () => API.get('/projects/admin'); // Admin view
export const updateProjectStatus = (id, statusData) => API.patch(`/projects/${id}`, statusData); // Admin update status
export const deleteProject = (id) => API.delete(`/projects/${id}`); // Admin delete

export default API;