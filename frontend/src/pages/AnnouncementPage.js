// frontend/src/pages/AnnouncementPage.js
import React, { useEffect, useState } from 'react';
import { getAnnouncements } from '../services/api';
import AnnouncementCard from '../components/AnnouncementCard';

const AnnouncementPage = () => { // Renamed from AnnouncementsPage to AnnouncementPage to match App.js import
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await getAnnouncements();
                setAnnouncements(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching announcements:', err);
                setError('Failed to load announcements. Please try again later.');
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg font-medium">Loading announcements...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-600 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">Latest Announcements</h2>
            {announcements.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600 text-lg border border-gray-200">
                    <p>No announcements available yet. Please check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => (
                        <AnnouncementCard key={announcement._id} announcement={announcement} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnnouncementPage;
