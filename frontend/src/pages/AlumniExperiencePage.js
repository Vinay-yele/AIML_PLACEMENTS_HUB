// frontend/src/pages/AlumniExperiencePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApprovedAlumniExperiences } from '../services/api'; // Import API function

const AlumniExperiencePage = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg font-medium">Loading alumni experiences...</p>
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
            <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-sm">Alumni Experiences</h2>
            {experiences.length === 0 ? (
                <div className="bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-400 text-lg border border-gray-700">
                    <p>No alumni experiences available yet. Check back soon!</p>
                    <p className="mt-2 text-sm">Are you an alumni? <Link to="/alumni-submit" className="text-blue-400 hover:underline">Share your experience!</Link></p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((exp) => (
                        <div key={exp._id} className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <h3 className="text-xl font-bold text-green-400 mb-2">{exp.alumniName} ({exp.batch})</h3>
                            <p className="text-lg font-semibold text-blue-400 mb-3">{exp.role} at {exp.company}</p>
                            <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap border-t border-gray-700 pt-4">
                                {exp.experience}
                            </p>
                            <p className="text-xs text-gray-500 mt-4">Approved: {new Date(exp.approvedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlumniExperiencePage;
