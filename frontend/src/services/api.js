// frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance with a base URL pointing to your backend API
const API = axios.create({
    // IMPORTANT: This should be your Render backend URL, and it should end with /api
    baseURL: 'https://aiml-placements-hub.onrender.com/api', // <--- CORRECTED BASEURL
});

// --- API Functions for Announcements ---
// Corrected: The backend route is just '/announcements' after the /api base
export const getAnnouncements = () => API.get('/announcements');
export const createAnnouncement = (announcementData) => API.post('/announcements', announcementData);
// Add functions for update and delete if needed for admin panel later
// export const updateAnnouncement = (id, announcementData) => API.patch(`/announcements/${id}`, announcementData);
// export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);


// --- API Functions for Issues ---
export const submitIssue = (issueData) => API.post('/issues', issueData);
export const getAllIssues = () => API.get('/issues');
// Add functions for get by ID, update, delete if needed for admin panel later
// export const getIssueById = (id) => API.get(`/issues/${id}`);
// export const updateIssue = (id, issueData) => API.patch(`/issues/${id}`, issueData);
// export const deleteIssue = (id, issueData) => API.delete(`/issues/${id}`);


// --- API Functions for Resources ---
export const getResources = () => API.get('/resources');
export const uploadResource = (formData) => API.post('/resources/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const downloadResource = (filename) => API.get(`/resources/download/${filename}`, {
    responseType: 'blob'
});
// Add function for delete if needed for admin panel later
// export const deleteResource = (id) => API.delete(`/resources/${id}`);


// --- API Functions for Subscribers ---
export const subscribeToUpdates = (emailData) => API.post('/subscribers', emailData);
export const getAllSubscribers = () => API.get('/subscribers');


// --- API Functions for Feedback/Contact ---
export const submitFeedback = (feedbackData) => API.post('/feedback', feedbackData);
export const getAllFeedback = () => API.get('/feedback');


export default API;
