// frontend/src/pages/AlumniExperiencePage.js
import React, { useState } from 'react';
import { submitExperience } from '../services/api';

const AlumniExperiencePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        ctc: '',
        experience: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');
        setMessageType('');

        try {
            await submitExperience(formData);
            setResponseMessage('Thank you! Your experience has been submitted successfully.');
            setMessageType('success');
            setFormData({ name: '', company: '', ctc: '', experience: '' });
        } catch (err) {
            console.error('Error submitting experience:', err);
            setResponseMessage(err.response?.data?.message || 'Submission failed. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 text-white">
            <h2 className="text-4xl font-extrabold text-center text-blue-400 drop-shadow-md mb-10">Share Your Interview Experience</h2>

            {responseMessage && (
                <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {responseMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-blue-700 rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-white font-semibold mb-2">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1e293b] text-white"
                        placeholder="e.g., Rahul Sharma"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="company" className="block text-white font-semibold mb-2">Company Placed In:</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1e293b] text-white"
                        placeholder="e.g., Google"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="ctc" className="block text-white font-semibold mb-2">CTC (in LPA):</label>
                    <input
                        type="number"
                        id="ctc"
                        name="ctc"
                        value={formData.ctc}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1e293b] text-white"
                        placeholder="e.g., 12"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="experience" className="block text-white font-semibold mb-2">Interview Experience:</label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        rows="7"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1e293b] text-white resize-y"
                        placeholder="Briefly describe the rounds, questions, and your preparation journey."
                        required
                    ></textarea>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Experience'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AlumniExperiencePage;
