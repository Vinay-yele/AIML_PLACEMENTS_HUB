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
        <div className="min-h-screen bg-[#0f172a] text-white py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-extrabold text-blue-400 mb-10 text-center drop-shadow-md">
                    Submit an Issue or Question
                </h2>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-[#1e293b] rounded-xl shadow-2xl p-8 border border-blue-700">
                    <div className="mb-6">
                        <label htmlFor="studentName" className="block text-white text-base font-semibold mb-2">
                            Your Name:
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g., John Doe"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="studentEmail" className="block text-white text-base font-semibold mb-2">
                            Your Email:
                        </label>
                        <input
                            type="email"
                            id="studentEmail"
                            name="studentEmail"
                            value={formData.studentEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g., your.email@example.com"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="subject" className="block text-white text-base font-semibold mb-2">
                            Subject:
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g., Portal Login Issue"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="description" className="block text-white text-base font-semibold mb-2">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="6"
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Provide a detailed description of your issue or question..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
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
        </div>
    );
};

export default IssuesPage;