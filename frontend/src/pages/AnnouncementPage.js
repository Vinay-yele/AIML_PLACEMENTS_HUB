// frontend/src/pages/AnnouncementPage.js
import React, { useEffect, useState } from 'react';
import { getAnnouncements } from '../services/api';
import AnnouncementCard from '../components/AnnouncementCard';

const AnnouncementPage = () => {
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
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjusted min-height */}
                <p className="text-lavender-gray text-lg font-medium">Loading announcements...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjusted min-height */}
                <p className="text-red-500 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 min-h-screen"> {/* Full screen height */}
            <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">Latest Announcements</h2>
            {announcements.length === 0 ? (
                <div className="bg-deep-purple-blue rounded-xl shadow-lg p-6 text-center text-lavender-gray text-lg border border-lavender-gray">
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
