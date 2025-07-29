// frontend/src/pages/AlumniSubmitPage.js
import React, { useState } from 'react';
import { submitAlumniExperience } from '../services/api'; // Import API function

const AlumniSubmitPage = () => {
    const [formData, setFormData] = useState({
        alumniName: '',
        alumniEmail: '',
        batch: '',
        company: '',
        role: '',
        experience: ''
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'batch' ? parseInt(value) : value // Convert batch to number
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            await submitAlumniExperience(formData);
            setMessage('Your experience has been submitted for review! Thank you for sharing.');
            setMessageType('success');
            setFormData({
                alumniName: '',
                alumniEmail: '',
                batch: '',
                company: '',
                role: '',
                experience: ''
            });
        } catch (err) {
            console.error('Error submitting alumni experience:', err);
            setMessage(err.response?.data?.message || 'Failed to submit experience. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-sm">Share Your Alumni Experience</h2>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-700 text-gray-200">
                <div className="mb-5">
                    <label htmlFor="alumniName" className="block text-base font-semibold mb-2">
                        Your Name:
                    </label>
                    <input
                        type="text"
                        id="alumniName"
                        name="alumniName"
                        value={formData.alumniName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white"
                        placeholder="e.g., Jane Doe"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alumniEmail" className="block text-base font-semibold mb-2">
                        Your Email (Optional, for internal contact):
                    </label>
                    <input
                        type="email"
                        id="alumniEmail"
                        name="alumniEmail"
                        value={formData.alumniEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white"
                        placeholder="e.g., jane.doe@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="batch" className="block text-base font-semibold mb-2">
                        Graduation Batch:
                    </label>
                    <input
                        type="number"
                        id="batch"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white"
                        placeholder="e.g., 2023"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="company" className="block text-base font-semibold mb-2">
                        Company:
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white"
                        placeholder="e.g., Google"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="role" className="block text-base font-semibold mb-2">
                        Role:
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-white"
                        placeholder="e.g., Software Engineer"
                        required
                    />
                </div>

                <div className="mb-7">
                    <label htmlFor="experience" className="block text-base font-semibold mb-2">
                        Your Experience:
                    </label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        rows="8"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y text-white"
                        placeholder="Share your placement journey, interview tips, company culture insights..."
                        required
                    ></textarea>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Experience'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AlumniSubmitPage;
