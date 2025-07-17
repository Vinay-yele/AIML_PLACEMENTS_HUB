// frontend/src/pages/IssuesPage.js
import React, { useState } from 'react';
import { submitIssue } from '../services/api';

const IssuesPage = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        subject: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            await submitIssue(formData);
            setMessage('Issue submitted successfully! We will get back to you soon.');
            setMessageType('success');
            setFormData({
                studentName: '',
                studentEmail: '',
                subject: '',
                description: ''
            });
        } catch (err) {
            console.error('Error submitting issue:', err);
            setMessage(err.response?.data?.message || 'Failed to submit issue. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">Submit an Issue or Question</h2>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto border border-blue-100">
                <div className="mb-5">
                    <label htmlFor="studentName" className="block text-gray-700 text-base font-semibold mb-2">
                        Your Name:
                    </label>
                    <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                        placeholder="e.g., John Doe"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="studentEmail" className="block text-gray-700 text-base font-semibold mb-2">
                        Your Email:
                    </label>
                    <input
                        type="email"
                        id="studentEmail"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                        placeholder="e.g., your.email@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="subject" className="block text-gray-700 text-base font-semibold mb-2">
                        Subject:
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                        placeholder="e.g., Portal Login Issue"
                        required
                    />
                </div>

                <div className="mb-7">
                    <label htmlFor="description" className="block text-gray-700 text-base font-semibold mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y text-gray-800"
                        placeholder="Provide a detailed description of your issue or question..."
                        required
                    ></textarea>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Issue'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IssuesPage;
