// frontend/src/pages/ResourcesPage.js
import React, { useEffect, useState } from 'react';
import { getResources, downloadResource, uploadResource } from '../services/api';

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadCategory, setUploadCategory] = useState('Other');
    const [uploadDescription, setUploadDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadMessageType, setUploadMessageType] = useState('');

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
            setUploadMessage('Failed to download file. Please try again.');
            setUploadMessageType('error');
        }
    };

    const handleFileChange = (e) => {
        setUploadFile(e.target.files[0]);
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!uploadFile) {
            setUploadMessage('Please select a file to upload.');
            setUploadMessageType('error');
            return;
        }

        setUploading(true);
        setUploadMessage('');
        setUploadMessageType('');

        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('category', uploadCategory);
        formData.append('description', uploadDescription);

        try {
            await uploadResource(formData);
            setUploadMessage('File uploaded successfully!');
            setUploadMessageType('success');
            setUploadFile(null);
            setUploadCategory('Other');
            setUploadDescription('');
            fetchResources();
        } catch (err) {
            console.error('Error uploading file:', err);
            setUploadMessage(err.response?.data?.message || 'Failed to upload file. Please try again.');
            setUploadMessageType('error');
        } finally {
            setUploading(false);
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

            {/* Upload Form - moved to bottom */}
            <div className="bg-[#0f172a] rounded-xl shadow-xl p-8 mt-16 border border-blue-700">
                <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Upload a New Resource</h3>
                {uploadMessage && (
                    <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${uploadMessageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {uploadMessage}
                    </div>
                )}
                <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="file-upload" className="block text-white font-semibold mb-2">Select File:</label>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-300 file:bg-blue-100 file:text-blue-800 file:rounded-full file:border-none file:py-2 file:px-4 hover:file:bg-blue-200 cursor-pointer"
                            required
                        />
                        {uploadFile && <p className="text-sm text-gray-400 mt-2">Selected: <span className="font-medium">{uploadFile.name}</span></p>}
                    </div>
                    <div>
                        <label htmlFor="category-select" className="block text-white font-semibold mb-2">Category:</label>
                        <select
                            id="category-select"
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-[#1e293b] text-white focus:ring-2 focus:ring-blue-400"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description-input" className="block text-white font-semibold mb-2">Description (optional):</label>
                        <textarea
                            id="description-input"
                            value={uploadDescription}
                            onChange={(e) => setUploadDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-[#1e293b] text-white resize-y"
                            placeholder="Add a brief description of the resource..."
                        ></textarea>
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload Resource'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResourcesPage;
