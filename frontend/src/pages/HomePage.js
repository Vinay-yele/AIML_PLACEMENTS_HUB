// frontend/src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center p-4">
            <h2 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow-lg animate-fade-in-down">
                Welcome to the Placement Coordination Portal!
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed mb-10 animate-fade-in-up">
                Your central hub for all placement-related activities. Stay updated with announcements, access vital resources, report issues, and keep track of important events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="bg-white rounded-xl shadow-xl p-7 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-blue-200">
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">Stay Updated</h3>
                    <p className="text-gray-700 leading-relaxed">Check the Announcements section for the latest news, forwarded emails, and important notices.</p>
                </div>
                <div className="bg-white rounded-xl shadow-xl p-7 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-green-200">
                    <h3 className="text-2xl font-bold text-green-700 mb-3">Access Resources</h3>
                    <p className="text-gray-700 leading-relaxed">Find important documents, company information, and preparation materials to aid your journey.</p>
                </div>
                <div className="bg-white rounded-xl shadow-xl p-7 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-purple-200">
                    <h3 className="text-2xl font-bold text-purple-700 mb-3">Report Issues</h3>
                    <p className="text-gray-700 leading-relaxed">Submit your queries, report problems, or ask questions directly to the placement cell.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
