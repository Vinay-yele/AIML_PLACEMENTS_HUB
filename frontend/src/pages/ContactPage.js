// frontend/src/pages/ContactPage.js
import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
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
        setResponseMessage('');
        setMessageType('');

        try {
            await submitFeedback(formData);
            setResponseMessage('Your message has been sent successfully! We will get back to you soon.');
            setMessageType('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setResponseMessage(err.response?.data?.message || 'Failed to send message. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">Contact Us / Send Feedback</h2>

            {responseMessage && (
                <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {responseMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto border border-blue-100">
                <div className="mb-5">
                    <label htmlFor="name" className="block text-gray-700 text-base font-semibold mb-2">
                        Your Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                        placeholder="e.g., Jane Doe"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 text-base font-semibold mb-2">
                        Your Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                        placeholder="e.g., jane.doe@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="subject" className="block text-gray-700 text-base font-semibold mb-2">
                        Subject (Optional):
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                        placeholder="e.g., Query about placement guidelines"
                    />
                </div>

                <div className="mb-7">
                    <label htmlFor="message" className="block text-gray-700 text-base font-semibold mb-2">
                        Your Message:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y text-gray-800"
                        placeholder="Type your message here..."
                        required
                    ></textarea>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
