// frontend/src/pages/AlumniExperiencePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApprovedAlumniExperiences } from '../services/api'; // Import API function

const AlumniExperiencePage = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await getApprovedAlumniExperiences();
                setExperiences(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching alumni experiences:', err);
                setError('Failed to load alumni experiences. Please try again later.');
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const openModal = (experience) => {
        setSelectedExperience(experience);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setSelectedExperience(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (selectedExperience) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [selectedExperience]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <p className="text-lavender-gray text-lg font-medium">Loading alumni experiences...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <p className="text-red-500 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-200px)]">
            <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">Seniors' Success Stories</h2>
            {experiences.length === 0 ? (
                <div className="bg-deep-purple-blue rounded-xl shadow-lg p-6 text-center text-lavender-gray text-lg border border-lavender-gray">
                    <p>No alumni experiences available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((exp) => (
                        <div 
                            key={exp._id} 
                            className="bg-deep-purple-blue rounded-xl shadow-lg p-6 border border-lavender-gray transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-lavender-soft mb-2">{exp.alumniName} ({exp.batch})</h3>
                            <p className="text-lg font-semibold text-lavender-gray mb-3">{exp.role} at {exp.company}</p>
                            <p className="text-lavender-gray leading-relaxed text-base whitespace-pre-wrap border-t border-lavender-gray pt-4 mb-4">
                                {truncateText(exp.experience)}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-lavender-gray">Submitted on: {new Date(exp.approvedAt).toLocaleDateString()}</p>
                                {exp.experience.length > 150 && (
                                    <button 
                                        onClick={() => openModal(exp)}
                                        className="text-sm text-lavender-soft font-medium hover:text-white transition-colors duration-200 underline hover:no-underline"
                                    >
                                        Read more
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for full experience */}
            {selectedExperience && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-deep-purple-blue rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-lavender-gray">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-deep-purple-blue border-b border-lavender-gray p-6 rounded-t-2xl">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-lavender-soft mb-2">
                                        {selectedExperience.alumniName} ({selectedExperience.batch})
                                    </h2>
                                    <p className="text-xl font-semibold text-lavender-gray">
                                        {selectedExperience.role} at {selectedExperience.company}
                                    </p>
                                </div>
                                <button 
                                    onClick={closeModal}
                                    className="text-lavender-gray hover:text-white text-3xl font-bold transition-colors duration-200 ml-4"
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="bg-gradient-to-br from-deep-purple-blue to-purple-900 rounded-xl p-6 border border-lavender-gray">
                                <h3 className="text-lg font-semibold text-lavender-soft mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-lavender-soft rounded-full mr-3"></span>
                                    Success Story
                                </h3>
                                <p className="text-lavender-gray leading-relaxed text-lg whitespace-pre-wrap">
                                    {selectedExperience.experience}
                                </p>
                            </div>
                            
                            <div className="mt-6 text-center">
                                <p className="text-sm text-lavender-gray">
                                    Submitted on: {new Date(selectedExperience.approvedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-lavender-gray p-6 text-center bg-gradient-to-r from-transparent via-lavender-gray via-opacity-10 to-transparent">
                            <button 
                                onClick={closeModal}
                                className="bg-lavender-soft hover:bg-white text-deep-purple-blue font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share experience link */}
            <div className="text-center mt-8">
                <p className="text-base text-lavender-gray">
                    Are you an alumni? <Link to="/alumni-experiences/submit" className="text-lavender-soft hover:underline font-semibold">Share your experience!</Link>
                </p>
            </div>
        </div>
    );
};

export default AlumniExperiencePage;