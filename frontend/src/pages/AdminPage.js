// frontend/src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import {
    createAnnouncement,
    getAnnouncements, // Assuming you have a getAnnouncements in api.js
    deleteAnnouncement, // Assuming you have a deleteAnnouncement in api.js
    getAllAlumniExperiencesAdmin,
    updateAlumniExperienceStatus,
    deleteAlumniExperience
} from '../services/api';

const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const ADMIN_SECRET_PASSWORD = 'admin123'; // !!! IMPORTANT: Hardcoded for local dev. NOT SECURE for production.

    // Announcement states
    const [announcementFormData, setAnnouncementFormData] = useState({
        title: '',
        content: '',
        author: 'Admin',
        category: 'News'
    });
    const [announcements, setAnnouncements] = useState([]); // State to hold announcements

    // General message states for forms
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    // Alumni Experience states
    const [alumniExperiences, setAlumniExperiences] = useState([]);
    const [alumniLoading, setAlumniLoading] = useState(true);
    const [alumniError, setAlumniError] = useState(null);

    // Fetch announcements and alumni experiences when admin logs in or status changes
    useEffect(() => {
        if (isAdmin) {
            fetchAnnouncements(); // Fetch announcements when admin logs in
            fetchAlumniExperiences(); // Fetch alumni experiences when admin logs in
        }
    }, [isAdmin]); // Refetch when isAdmin changes

    // Function to fetch announcements
    const fetchAnnouncements = async () => {
        try {
            // Assuming getAnnouncements is defined in api.js
            const res = await getAnnouncements();
            setAnnouncements(res.data);
        } catch (err) {
            console.error('Error fetching announcements for admin:', err);
            // Optionally set an error message for announcements section
        }
    };

    // Function to fetch alumni experiences
    const fetchAlumniExperiences = async () => {
        try {
            setAlumniLoading(true);
            const response = await getAllAlumniExperiencesAdmin();
            setAlumniExperiences(response.data);
            setAlumniLoading(false);
        } catch (err) {
            console.error('Error fetching all alumni experiences for admin:', err);
            setAlumniError('Failed to load alumni experiences for admin. Please try again.');
            setAlumniLoading(false);
        }
    };

    // Handle admin password input change
    const handlePasswordChange = (e) => {
        setAdminPassword(e.target.value);
    };

    // Handle admin login attempt
    const handleAdminLogin = () => {
        if (adminPassword === ADMIN_SECRET_PASSWORD) {
            setIsAdmin(true);
            setMessage('');
            setMessageType('');
        } else {
            setMessage('Incorrect password. Access denied.');
            setMessageType('error');
        }
    };

    // Handle announcement form input changes
    const handleAnnouncementChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle announcement form submission
    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            await createAnnouncement(announcementFormData);
            setMessage('Announcement posted successfully!');
            setMessageType('success');
            setAnnouncementFormData({
                title: '',
                content: '',
                author: 'Admin',
                category: 'News'
            });
            fetchAnnouncements(); // Refresh announcements after posting
        } catch (err) {
            console.error('Error posting announcement:', err);
            setMessage(err.response?.data?.message || 'Failed to post announcement. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    // Handle deleting an announcement
    const handleDeleteAnnouncement = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            await deleteAnnouncement(id);
            setMessage('Announcement deleted successfully!');
            setMessageType('success');
            fetchAnnouncements(); // Refresh announcements after deletion
        } catch (err) {
            console.error('Error deleting announcement:', err);
            setMessage('Failed to delete announcement. Please try again.');
            setMessageType('error');
        }
    };

    // Handle updating alumni experience status (Approve/Reject)
    const handleAlumniStatusUpdate = async (id, status) => {
        try {
            await updateAlumniExperienceStatus(id, { status });
            setMessage(`Experience status updated to ${status}!`);
            setMessageType('success');
            fetchAlumniExperiences(); // Refresh the list
        } catch (err) {
            console.error('Error updating alumni experience status:', err);
            setMessage('Failed to update experience status. Please try again.');
            setMessageType('error');
        }
    };

    // Handle deleting alumni experience
    const handleAlumniDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this experience?')) { // Simple confirmation
            try {
                await deleteAlumniExperience(id);
                setMessage('Experience deleted successfully!');
                setMessageType('success');
                fetchAlumniExperiences(); // Refresh the list
            } catch (err) {
                console.error('Error deleting alumni experience:', err);
                setMessage('Failed to delete experience. Please try again.');
                setMessageType('error');
            }
        }
    };

    // Render the admin login form if not authenticated
    if (!isAdmin) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
                <div className="bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700 text-gray-200">
                    <h2 className="text-3xl font-bold text-white mb-6">Admin Access</h2>
                    {message && (
                        <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'error' ? 'bg-red-100 text-red-700 border border-red-300' : ''}`}>
                            {message}
                        </div>
                    )}
                    <div className="mb-5">
                        <label htmlFor="admin-password" className="block text-base font-semibold mb-2">
                            Enter Admin Password:
                        </label>
                        <input
                            type="password"
                            id="admin-password"
                            value={adminPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white"
                            onKeyPress={(e) => { if (e.key === 'Enter') handleAdminLogin(); }}
                            placeholder="*************"
                        />
                    </div>
                    <button
                        onClick={handleAdminLogin}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    // Render admin dashboard if authenticated
    return (
        <div className="container mx-auto p-4 text-gray-200">
            <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-sm">Admin Dashboard</h2>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {message}
                </div>
            )}

            {/* Post New Announcement Section */}
            <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-10 border border-gray-700">
                <h3 className="text-3xl font-bold text-blue-400 mb-6 text-center">Post New Announcement</h3>
                <form onSubmit={handleAnnouncementSubmit} className="max-w-2xl mx-auto">
                    <div className="mb-5">
                        <label htmlFor="title" className="block text-base font-semibold mb-2">Title:</label>
                        <input type="text" id="title" name="title" value={announcementFormData.title} onChange={handleAnnouncementChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white" placeholder="e.g., Important Update on Placements" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="content" className="block text-base font-semibold mb-2">Content:</label>
                        <textarea id="content" name="content" value={announcementFormData.content} onChange={handleAnnouncementChange} rows="8" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y text-white" placeholder="Type the full announcement content here..." required></textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="author" className="block text-base font-semibold mb-2">Author:</label>
                        <input type="text" id="author" name="author" value={announcementFormData.author} onChange={handleAnnouncementChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white" placeholder="e.g., Placement Cell" required />
                    </div>
                    <div className="mb-7">
                        <label htmlFor="category" className="block text-base font-semibold mb-2">Category:</label>
                        <select id="category" name="category" value={announcementFormData.category} onChange={handleAnnouncementChange} className="w-full px-4 py-2border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white bg-gray-700">
                            <option value="News">News</option>
                            <option value="Forwarded Email">Forwarded Email</option>
                            <option value="Notice">Notice</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900" disabled={loading}>
                            {loading ? 'Posting...' : 'Post Announcement'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Announcement List with Delete */}
            <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-10 border border-gray-700">
                <h3 className="text-3xl font-bold text-blue-400 mb-6 text-center">Existing Announcements</h3>
                {announcements.length === 0 ? (
                    <p className="text-gray-400 text-center">No announcements yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {announcements.map(ann => (
                            <li key={ann._id} className="bg-gray-700 border border-gray-600 rounded-lg p-4 flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-bold text-white">{ann.title}</h4>
                                    <p className="text-sm text-gray-300 mt-1">{ann.content}</p>
                                    <p className="text-xs text-gray-400 mt-2">By {ann.author} | {new Date(ann.date).toLocaleDateString()}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteAnnouncement(ann._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Alumni Experience Management Section */}
            <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
                <h3 className="text-3xl font-bold text-green-400 mb-6 text-center">Alumni Experience Management</h3>
                {alumniLoading ? (
                    <p className="text-center text-gray-400">Loading alumni experiences...</p>
                ) : alumniError ? (
                    <p className="text-center text-red-400">{alumniError}</p>
                ) : alumniExperiences.length === 0 ? (
                    <p className="text-center text-gray-400">No alumni experiences submitted yet.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {alumniExperiences.map((exp) => (
                            <div key={exp._id} className="bg-gray-700 rounded-lg shadow-md p-6 border border-gray-600">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="text-xl font-bold text-white leading-tight">{exp.alumniName} ({exp.batch})</h4>
                                        <p className="text-lg font-semibold text-blue-300">{exp.role} at {exp.company}</p>
                                        <p className="text-sm text-gray-400 mt-1">Submitted: {new Date(exp.submittedAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        exp.status === 'Approved' ? 'bg-green-600 text-white' :
                                        exp.status === 'Pending' ? 'bg-yellow-600 text-white' :
                                        'bg-red-600 text-white'
                                    }`}>
                                        {exp.status}
                                    </span>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap border-t border-gray-600 pt-4">
                                    {exp.experience}
                                </p>
                                <div className="mt-5 flex flex-wrap justify-end gap-3">
                                    {exp.status !== 'Approved' && (
                                        <button
                                            onClick={() => handleAlumniStatusUpdate(exp._id, 'Approved')}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {exp.status !== 'Rejected' && (
                                        <button
                                            onClick={() => handleAlumniStatusUpdate(exp._id, 'Rejected')}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            Reject
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleAlumniDelete(exp._id)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
