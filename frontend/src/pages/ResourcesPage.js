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
            setUploadMessage('Failed to download file. Please try again.'); // Using upload message state
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
                <p className="text-gray-600 text-lg font-medium">Loading resources...</p>
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
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">Important Resources</h2>

            {/* Resource Upload Section */}
            <div className="bg-white rounded-xl shadow-xl p-8 mb-10 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Upload New Resource</h3>
                {uploadMessage && (
                    <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${uploadMessageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                        {uploadMessage}
                    </div>
                )}
                <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="file-upload" className="block text-gray-700 text-base font-semibold mb-2">
                            Select File:
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 transition duration-200 ease-in-out cursor-pointer"
                            required
                        />
                        {uploadFile && <p className="text-sm text-gray-600 mt-2">Selected: <span className="font-medium">{uploadFile.name}</span></p>}
                    </div>
                    <div>
                        <label htmlFor="category-select" className="block text-gray-700 text-base font-semibold mb-2">
                            Category:
                        </label>
                        <select
                            id="category-select"
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 bg-white"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description-input" className="block text-gray-700 text-base font-semibold mb-2">
                            Description (Optional):
                        </label>
                        <textarea
                            id="description-input"
                            value={uploadDescription}
                            onChange={(e) => setUploadDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y text-gray-800"
                            placeholder="Brief description of the resource..."
                        ></textarea>
                    </div>
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload Resource'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Resources List */}
            {Object.keys(groupedResources).length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600 text-lg border border-gray-200">
                    <p>No resources available yet. Please check back soon!</p>
                </div>
            ) : (
                <div>
                    {categories.map(category => (
                        groupedResources[category] && groupedResources[category].length > 0 && (
                            <div key={category} className="mb-10">
                                <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-3">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedResources[category].map(resource => (
                                        <div key={resource._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                                            <div>
                                                <p className="text-lg font-semibold text-blue-700 mb-2">{resource.originalName}</p>
                                                {resource.description && (
                                                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                                                )}
                                                <p className="text-xs text-gray-500">Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(resource.filename, resource.originalName)}
                                                className="mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
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
