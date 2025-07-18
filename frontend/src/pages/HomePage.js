// frontend/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage = () => {
    return (
        <div className="relative min-h-[calc(100vh-250px)] flex items-center justify-center text-center p-4 overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
            {/* Background elements for visual flair */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Tagline/Pre-headline */}
                <p className="text-xl md:text-2xl font-semibold text-green-400 mb-4 animate-fade-in-down">
                    Your Gateway to Success
                </p>
                {/* Main Headline */}
                <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-down-slow drop-shadow-xl">
                    Elevate Your <span className="text-blue-400">Placement Journey</span>
                </h2>
                {/* Description */}
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up-slow">
                    Access the latest announcements, essential resources, and dedicated support to navigate your career path with confidence.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in-up-slower">
                    <Link
                        to="/AnnouncementPage"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        View Announcements
                        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                        to="/ResourcesPage"
                        className="bg-transparent border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Explore Resources
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
