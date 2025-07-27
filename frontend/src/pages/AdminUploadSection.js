// frontend/src/pages/AdminUploadSection.js
import React, { useState } from 'react';
import { uploadResource } from '../services/api';

const AdminUploadSection = ({ onUploadSuccess }) => {
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadCategory, setUploadCategory] = useState('Other');
    const [uploadDescription, setUploadDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadMessageType, setUploadMessageType] = useState('');

    const categories = ['Guidelines', 'Company Info', 'Prep Materials', 'Other'];

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
            if (onUploadSuccess) onUploadSuccess();
        } catch (err) {
            console.error('Error uploading file:', err);
            setUploadMessage(err.response?.data?.message || 'Failed to upload file. Please try again.');
            setUploadMessageType('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload a New Resource</h3>
            {uploadMessage && (
                <div className={`p-4 rounded-md mb-6 text-center text-lg font-medium ${uploadMessageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {uploadMessage}
                </div>
            )}
            <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="file-upload" className="block text-gray-700 font-semibold mb-2">Select File:</label>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-600 file:bg-blue-100 file:text-blue-800 file:rounded-full file:border-none file:py-2 file:px-4 hover:file:bg-blue-200 cursor-pointer"
                        required
                    />
                    {uploadFile && <p className="text-sm text-gray-500 mt-2">Selected: <span className="font-medium">{uploadFile.name}</span></p>}
                </div>
                <div>
                    <label htmlFor="category-select" className="block text-gray-700 font-semibold mb-2">Category:</label>
                    <select
                        id="category-select"
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="description-input" className="block text-gray-700 font-semibold mb-2">Description (optional):</label>
                    <textarea
                        id="description-input"
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 resize-y"
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
    );
};

export default AdminUploadSection;
