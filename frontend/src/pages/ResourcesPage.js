// frontend/src/pages/ResourcesPage.js
import React, { useEffect, useState } from 'react';
import { getResources, downloadResource } from '../services/api';

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        }
    };

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
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-300 text-lg font-medium">Loading resources...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-400 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 text-white">
            <h2 className="text-4xl font-extrabold mb-12 text-center drop-shadow-md text-blue-400">Explore Shared Resources</h2>

            {Object.keys(groupedResources).length === 0 ? (
                <div className="bg-[#1e293b] rounded-lg shadow-lg p-6 text-center text-gray-300 text-lg border border-gray-600">
                    <p>No resources available yet. Please check back soon!</p>
                </div>
            ) : (
                <div>
                    {categories.map(category => (
                        groupedResources[category] && groupedResources[category].length > 0 && (
                            <div key={category} className="mb-12">
                                <h3 className="text-2xl font-bold text-blue-300 mb-6 border-b-4 border-blue-500 pb-2">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedResources[category].map(resource => (
                                        <div key={resource._id} className="bg-[#0f172a] rounded-xl p-6 border border-gray-700 hover:shadow-xl transition duration-300">
                                            <p className="text-lg font-semibold text-blue-200 mb-1">{resource.originalName}</p>
                                            {resource.description && <p className="text-sm text-gray-400 mb-2">{resource.description}</p>}
                                            <p className="text-xs text-gray-500">Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</p>
                                            <button
                                                onClick={() => handleDownload(resource.filename, resource.originalName)}
                                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow transition duration-300"
                                            >
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
