// frontend/src/components/AnnouncementCard.js
import React from 'react';

const AnnouncementCard = ({ announcement }) => {
    const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Determine category badge color
    let categoryColor = 'bg-gray-200 text-gray-800';
    if (announcement.category === 'News') {
        categoryColor = 'bg-blue-100 text-blue-700';
    } else if (announcement.category === 'Forwarded Email') {
        categoryColor = 'bg-green-100 text-green-700';
    } else if (announcement.category === 'Notice') {
        categoryColor = 'bg-red-100 text-red-700';
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-blue-100 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-blue-800 leading-tight">{announcement.title}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
                    {announcement.category}
                </span>
            </div>

            <div className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>By: <span className="font-medium text-gray-700">{announcement.author}</span></span>
                <span className="hidden sm:inline">|</span>
                <span>Date: <span className="font-medium text-gray-700">{formattedDate}</span></span>
            </div>

            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap border-t border-gray-200 pt-4">
                {announcement.content}
            </p>
        </div>
    );
};

export default AnnouncementCard;
