// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://aiml-placements-hub.onrender.com/api',
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
export const submitExperience = (experienceData) => API.post('/experiences', experienceData);

export default API;