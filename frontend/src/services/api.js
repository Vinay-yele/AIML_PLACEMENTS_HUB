// frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance with a base URL pointing to your backend API
// frontend/src/services/api.js
const API = axios.create({
    baseURL: 'https://aiml-placements-hub.onrender.com/api', // <--- UPDATE THIS LINE
});

// --- API Functions for Announcements ---
export const getAnnouncements = () => API.get('/announcements/getan'); // Adjust the endpoint as needed
export const createAnnouncement = (announcementData) => API.post('/announcements/creatan', announcementData);
// Add functions for update and delete if needed for admin panel later
// export const updateAnnouncement = (id, announcementData) => API.patch(`/announcements/${id}`, announcementData);
// export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);


// --- API Functions for Issues ---
export const submitIssue = (issueData) => API.post('/issues', issueData);
export const getAllIssues = () => API.get('/issues');
// Add functions for get by ID, update, delete if needed for admin panel later
// export const getIssueById = (id) => API.get(`/issues/${id}`);
// export const updateIssue = (id, issueData) => API.patch(`/issues/${id}`, issueData);
// export const deleteIssue = (id) => API.delete(`/issues/${id}`);


// --- API Functions for Resources ---
export const getResources = () => API.get('/resources');
export const uploadResource = (formData) => API.post('/resources/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data' // Important for file uploads
    }
});
export const downloadResource = (filename) => API.get(`/resources/download/${filename}`, {
    responseType: 'blob' // Important for file downloads to handle binary data
});
// Add function for delete if needed for admin panel later
// export const deleteResource = (id) => API.delete(`/resources/${id}`);


// --- API Functions for Subscribers ---
export const subscribeToUpdates = (emailData) => API.post('/subscribers', emailData); // emailData should be { email: 'user@example.com' }
export const getAllSubscribers = () => API.get('/subscribers'); // For admin view


// --- API Functions for Feedback/Contact ---
export const submitFeedback = (feedbackData) => API.post('/feedback', feedbackData);
export const getAllFeedback = () => API.get('/feedback'); // For admin view


export default API;
