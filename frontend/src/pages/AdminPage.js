// frontend/src/pages/AdminPage.js
import React, { useState } from 'react';
import { createAnnouncement } from '../services/api'; // Import the API function for creating announcements

const AdminPage = () => {
    // State for the simple admin password check
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const ADMIN_SECRET_PASSWORD = 'adminpassword123'; // !!! IMPORTANT: Hardcoded for local dev. NOT SECURE for production.

    // State for the announcement form data
    const [announcementFormData, setAnnouncementFormData] = useState({
        title: '',
        content: '',
        author: 'Admin', // Default author
        category: 'News' // Default category
    });

    const [message, setMessage] = useState(''); // State for success/error messages
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false); // State for loading indicator

    // Handle admin password input change
    const handlePasswordChange = (e) => {
        setAdminPassword(e.target.value);
    };

    // Handle admin login attempt
    const handleAdminLogin = () => {
        if (adminPassword === ADMIN_SECRET_PASSWORD) {
            setIsAdmin(true);
            setMessage(''); // Clear any previous messages
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
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            // Call the API to create the announcement
            const response = await createAnnouncement(announcementFormData);
            setMessage('Announcement posted successfully!');
            setMessageType('success');
            // Clear the form after successful submission
            setAnnouncementFormData({
                title: '',
                content: '',
                author: 'Admin',
                category: 'News'
            });
        } catch (err) {
            console.error('Error posting announcement:', err);
            setMessage(err.response?.data?.message || 'Failed to post announcement. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    // Render the admin login form if not authenticated
    if (!isAdmin) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Access</h2>
                    {message && (
                        <div className={`p-3 rounded-md mb-4 ${messageType === 'error' ? 'bg-red-100 text-red-700' : ''}`}>
                            {message}
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="admin-password" className="block text-gray-700 text-sm font-bold mb-2">
                            Enter Admin Password:
                        </label>
                        <input
                            type="password"
                            id="admin-password"
                            value={adminPassword}
                            onChange={handlePasswordChange}
                            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => { if (e.key === 'Enter') handleAdminLogin(); }}
                        />
                    </div>
                    <button
                        onClick={handleAdminLogin}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    // Render the announcement form if authenticated as admin
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post New Announcement (Admin)</h2>

            {/* Message display area */}
            {message && (
                <div className={`p-4 rounded-md mb-4 text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleAnnouncementSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={announcementFormData.title}
                        onChange={handleAnnouncementChange}
                        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Content */}
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={announcementFormData.content}
                        onChange={handleAnnouncementChange}
                        rows="7"
                        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                        required
                    ></textarea>
                </div>

                {/* Author */}
                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
                        Author:
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={announcementFormData.author}
                        onChange={handleAnnouncementChange}
                        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                        Category:
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={announcementFormData.category}
                        onChange={handleAnnouncementChange}
                        className="shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="News">News</option>
                        <option value="Forwarded Email">Forwarded Email</option>
                        <option value="Notice">Notice</option>
                        <option value="General">General</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post Announcement'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPage;
