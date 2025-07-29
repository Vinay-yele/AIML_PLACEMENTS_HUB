// frontend/src/pages/ProjectShowcasePage.js
import React, { useEffect, useState } from 'react';
import { getApprovedProjects } from '../services/api';
import { Link } from 'react-router-dom'; // Import Link for GitHub/Demo links

const ProjectShowcasePage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getApprovedProjects();
                setProjects(response.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <p className="text-lavender-gray text-lg font-medium">Loading projects...</p>
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
            {/* Styled Title */}
            <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">AIML Project Showcase</h2>

            {projects.length === 0 ? (
                <div className="bg-deep-purple-blue rounded-xl shadow-lg p-6 text-center text-lavender-gray text-lg border border-lavender-gray">
                    <p>No projects available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-deep-purple-blue rounded-xl shadow-lg p-6 border border-lavender-gray transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between">

                            {project.imagePath && (
                                <div className="mb-4 rounded-lg overflow-hidden border border-lavender-gray">
                                    <img
                                        src={`https://aiml-placements-hub.onrender.com${project.imagePath.replace(/\\/g, '/')}`} // Replace with your Render backend URL if deployed
                                        alt={project.title}
                                        className="w-full h-48 object-cover object-center"
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x240/A3A3CC/292966?text=Image+Not+Found"; }}
                                    />
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-lavender-soft mb-2 leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-sm text-lavender-gray mb-3 flex-grow">
                                {project.shortDescription}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-dark-indigo text-lavender-soft text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-lavender-gray">
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                                    {/* GitHub Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.804 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.197-6.095 8.197-11.389 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    GitHub
                                </a>

                                {project.liveDemoLink && (
                                    <a
                                        href={project.liveDemoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-lavender-gray hover:bg-lavender-soft text-dark-indigo font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                                        {/* Demo Icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Demo
                                    </a>
                                )}
                            </div>

                            <p className="text-xs text-lavender-gray mt-2 text-right">Submitted by: {project.submittedBy.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Moved showcase link below cards */}
            <div className="mt-8 text-center">
                <p className="text-base text-lavender-gray">
                    Have a cool project? <Link to="/projects/submit" className="text-lavender-soft hover:underline font-semibold">Showcase it here!</Link>
                </p>
            </div>
        </div>
    );
};

export default ProjectShowcasePage;
