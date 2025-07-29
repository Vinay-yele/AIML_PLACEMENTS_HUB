// frontend/src/pages/ResourcesPage.js
import React, { useEffect, useState } from 'react';
import { getResources, downloadResource } from '../services/api'; // Removed uploadResource import

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Removed upload-related states as functionality is moved to AdminPage
    // const [uploadFile, setUploadFile] = useState(null);
    // const [uploadCategory, setUploadCategory] = useState('Other');
    // const [uploadDescription, setUploadDescription] = useState('');
    // const [uploading, setUploading] = useState(false);
    // const [uploadMessage, setUploadMessage] = useState('');
    // const [uploadMessageType, setUploadMessageType] = useState('');

    const categories = ['Guidelines', 'Company Info', 'Prep Materials', 'Other'];

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const response = await getResources();
            setResources(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching resources:', err);
            setError('Failed to load resources. Please try again later.');
            setLoading(false);
        }
    };

    const handleDownload = async (filename, originalName) => {
        try {
            const response = await downloadResource(filename);
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = originalName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading file:', err);
            // Using a simple alert for download errors as uploadMessage state is removed
            alert('Failed to download file. Please try again.');
        }
    };

    // Removed upload-related handlers as functionality is moved to AdminPage
    // const handleFileChange = (e) => { ... };
    // const handleUploadSubmit = async (e) => { ... };

    const groupedResources = resources.reduce((acc, resource) => {
        const category = resource.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(resource);
        return acc;
    }, {});

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-120px)]"> {/* Adjusted min-height */}
                <p className="text-lavender-gray text-lg font-medium">Loading resources...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-120px)]"> {/* Adjusted min-height */}
                <p className="text-red-500 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-120px)]"> {/* Adjusted min-height for the main container */}
            <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">Important Resources</h2>

            {/* Resource Upload Section - REMOVED from here */}

            {/* Resources List */}
            {Object.keys(groupedResources).length === 0 ? (
                <div className="bg-deep-purple-blue rounded-lg shadow-md p-6 text-center text-lavender-gray text-lg border border-lavender-gray">
                    <p>No resources available yet. Please check back soon!</p>
                </div>
            ) : (
                <div>
                    {categories.map(category => (
                        groupedResources[category] && groupedResources[category].length > 0 && (
                            <div key={category} className="mb-10">
                                <h3 className="text-3xl font-bold text-lavender-soft mb-6 border-b-4 border-lavender-soft pb-3">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedResources[category].map(resource => (
                                        <div key={resource._id} className="bg-deep-purple-blue rounded-xl shadow-md p-6 border border-lavender-gray flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                                            <div>
                                                <p className="text-lg font-semibold text-lavender-soft mb-2">{resource.originalName}</p>
                                                {resource.description && (
                                                    <p className="text-lavender-gray text-sm mb-3">{resource.description}</p>
                                                )}
                                                <p className="text-xs text-lavender-gray">Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(resource.filename, resource.originalName)}
                                                className="mt-5 bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-2.5 px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:ring-offset-2 focus:ring-offset-deep-purple-blue"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResourcesPage;
