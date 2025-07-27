// Updated AdminPage.js with announcement deletion functionality
import React, { useState } from 'react';
import { createAnnouncement, getAnnouncements, deleteAnnouncement } from '../services/api';
import AdminUploadSection from './AdminUploadSection';

const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const ADMIN_SECRET_PASSWORD = 'admin123';

    const [announcementFormData, setAnnouncementFormData] = useState({
        title: '', content: '', author: 'Admin', category: 'News'
    });

    const [announcements, setAnnouncements] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (e) => setAdminPassword(e.target.value);

    const handleAdminLogin = () => {
        if (adminPassword === ADMIN_SECRET_PASSWORD) {
            setIsAdmin(true);
            setMessage('');
            fetchAnnouncements();
        } else {
            setMessage('Incorrect password. Access denied.');
            setMessageType('error');
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const res = await getAnnouncements();
            setAnnouncements(res.data);
        } catch (err) {
            console.error('Error fetching announcements:', err);
        }
    };

    const handleAnnouncementChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            await createAnnouncement(announcementFormData);
            setMessage('Announcement posted successfully!');
            setMessageType('success');
            setAnnouncementFormData({ title: '', content: '', author: 'Admin', category: 'News' });
            fetchAnnouncements();
        } catch (err) {
            console.error('Error posting announcement:', err);
            setMessage(err.response?.data?.message || 'Failed to post.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            await deleteAnnouncement(id);
            setMessage('Announcement deleted.');
            setMessageType('success');
            fetchAnnouncements();
        } catch (err) {
            setMessage('Error deleting announcement.');
            setMessageType('error');
        }
    };

    if (!isAdmin) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Access</h2>
                    {message && <div className={`p-3 rounded-md mb-4 ${messageType === 'error' ? 'bg-red-100 text-red-700' : ''}`}>{message}</div>}
                    <div className="mb-4">
                        <label htmlFor="admin-password" className="block text-gray-700 text-sm font-bold mb-2">Enter Admin Password:</label>
                        <input
                            type="password"
                            id="admin-password"
                            value={adminPassword}
                            onChange={handlePasswordChange}
                            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700"
                            onKeyPress={(e) => { if (e.key === 'Enter') handleAdminLogin(); }}
                        />
                    </div>
                    <button onClick={handleAdminLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post New Announcement (Admin)</h2>
            {message && <div className={`p-4 rounded-md mb-4 text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}

            <form onSubmit={handleAnnouncementSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input type="text" id="title" name="title" value={announcementFormData.title} onChange={handleAnnouncementChange} className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
                    <textarea id="content" name="content" value={announcementFormData.content} onChange={handleAnnouncementChange} rows="7" className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 resize-y" required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
                    <input type="text" id="author" name="author" value={announcementFormData.author} onChange={handleAnnouncementChange} className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                    <select id="category" name="category" value={announcementFormData.category} onChange={handleAnnouncementChange} className="shadow border rounded-md w-full py-2 px-3 text-gray-700">
                        <option value="News">News</option>
                        <option value="Forwarded Email">Forwarded Email</option>
                        <option value="Notice">Notice</option>
                        <option value="General">General</option>
                    </select>
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Announcement'}
                    </button>
                </div>
            </form>

            {/* Announcement List with Delete */}
            <div className="max-w-3xl mx-auto mt-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Announcements</h3>
                {announcements.length === 0 ? (
                    <p className="text-gray-600 text-center">No announcements yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {announcements.map(ann => (
                            <li key={ann._id} className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800">{ann.title}</h4>
                                    <p className="text-sm text-gray-700 mt-1">{ann.content}</p>
                                    <p className="text-xs text-gray-500 mt-2">By {ann.author} | {new Date(ann.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(ann._id)}
                                    className="text-red-600 hover:text-red-800 font-bold ml-4"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Upload Resources Section */}
            <div className="mt-16">
                <AdminUploadSection />
            </div>
        </div>
    );
};

export default AdminPage;