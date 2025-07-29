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
            <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">Seniors’ Success Stories</h2>
            {experiences.length === 0 ? (
                <div className="bg-deep-purple-blue rounded-xl shadow-lg p-6 text-center text-lavender-gray text-lg border border-lavender-gray">
                    <p>No alumni experiences available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((exp) => (
                        <div key={exp._id} className="bg-deep-purple-blue rounded-xl shadow-lg p-6 border border-lavender-gray transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <h3 className="text-xl font-bold text-lavender-soft mb-2">{exp.alumniName} ({exp.batch})</h3>
                            <p className="text-lg font-semibold text-lavender-gray mb-3">{exp.role} at {exp.company}</p>
                            <p className="text-lavender-gray leading-relaxed text-base whitespace-pre-wrap border-t border-lavender-gray pt-4">
                                {exp.experience}
                            </p>
                            <p className="text-xs text-lavender-gray mt-4">Approved: {new Date(exp.approvedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
            {/* Moved "Share your experience!" link outside the conditional rendering */}
            <div className="text-center mt-8">
                <p className="text-base text-lavender-gray">
                    Are you an alumni? <Link to="/alumni-experiences/submit" className="text-lavender-soft hover:underline font-semibold">Share your experience!</Link>
                </p>
            </div>
        </div>
    );
};

export default AlumniExperiencePage;
