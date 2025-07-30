// frontend/src/components/AnnouncementCard.js
import React from 'react';

const AnnouncementCard = ({ announcement }) => {
    const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Determine category badge color with lavender theme
    let categoryColor = 'bg-lavender-gray bg-opacity-20 text-lavender-gray';
    if (announcement.category === 'News') {
        categoryColor = 'bg-blue-500 bg-opacity-20 text-blue-300';
    } else if (announcement.category === 'Forwarded Email') {
        categoryColor = 'bg-green-500 bg-opacity-20 text-green-300';
    } else if (announcement.category === 'Notice') {
        categoryColor = 'bg-red-500 bg-opacity-20 text-red-300';
    }

    return (
        <div className="bg-deep-purple-blue rounded-xl shadow-lg p-6 mb-4 border border-lavender-gray transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-lavender-soft leading-tight">{announcement.title}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
                    {announcement.category}
                </span>
            </div>

            <div className="text-sm text-lavender-gray mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>By: <span className="font-medium text-lavender-soft">{announcement.author}</span></span>
                <span className="hidden sm:inline">|</span>
                <span>Date: <span className="font-medium text-lavender-soft">{formattedDate}</span></span>
            </div>

            <p className="text-lavender-gray leading-relaxed text-base whitespace-pre-wrap border-t border-lavender-gray pt-4">
                {announcement.content}
            </p>
        </div>
    );
};

export default AnnouncementCard;