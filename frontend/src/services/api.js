// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://aimlplacementshub.me/api'
        : 'http://localhost:4001/api',
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

// --- Subscribers ---
export const subscribeToUpdates = (emailData) => API.post('/subscribers', emailData);
export const getAllSubscribers = () => API.get('/subscribers');

// --- Feedback ---
export const submitFeedback = (feedbackData) => API.post('/feedback', feedbackData);
export const getAllFeedback = () => API.get('/feedback');

// --- Alumni Experiences ---
export const getApprovedAlumniExperiences = () => API.get('/alumni-experiences'); // Public view
export const submitAlumniExperience = (experienceData) => API.post('/alumni-experiences', experienceData); // Public submission
export const getAllAlumniExperiencesAdmin = () => API.get('/alumni-experiences/admin'); // Admin view
export const updateAlumniExperienceStatus = (id, statusData) => API.patch(`/alumni-experiences/${id}`, statusData); // Admin update status
export const deleteAlumniExperience = (id) => API.delete(`/alumni-experiences/${id}`); // Admin delete


export default API;