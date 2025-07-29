// frontend/src/pages/ProjectSubmitPage.js
import React, { useState } from 'react';
import { submitProject } from '../services/api';

const ProjectSubmitPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        technologies: '', // Comma-separated string
        githubLink: '',
        liveDemoLink: '',
        submittedByName: '',
        submittedByEmail: '',
        image: null // For file input
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

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            image: e.target.files[0] // Get the selected file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        // Create FormData object for file upload
        const data = new FormData();
        data.append('title', formData.title);
        data.append('shortDescription', formData.shortDescription);
        data.append('technologies', formData.technologies);
        data.append('githubLink', formData.githubLink);
        data.append('liveDemoLink', formData.liveDemoLink);
        data.append('submittedByName', formData.submittedByName);
        data.append('submittedByEmail', formData.submittedByEmail);
        if (formData.image) {
            data.append('image', formData.image); // 'image' must match multer field name in backend
        }

        try {
            await submitProject(data); // Use the FormData object
            setMessage('Project submitted successfully for review! Thank you for sharing.');
            setMessageType('success');
            // Clear form
            setFormData({
                title: '',
                shortDescription: '',
                technologies: '',
                githubLink: '',
                liveDemoLink: '',
                submittedByName: '',
                submittedByEmail: '',
                image: null
            });
            // Clear file input manually if needed (e.g., by resetting a ref or key)
            document.getElementById('project-image-upload').value = '';
        } catch (err) {
            console.error('Error submitting project:', err);
            setMessage(err.response?.data?.message || 'Failed to submit project. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">Showcase Your Project</h2>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${messageType === 'success' ? 'bg-green-600 text-white border border-green-700' : 'bg-red-600 text-white border border-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-deep-purple-blue rounded-xl shadow-xl p-8 w-full max-w-4xl mx-auto border border-lavender-gray text-lavender-soft">
                <div className="mb-5">
                    <label htmlFor="title" className="block text-base font-semibold mb-2">Project Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray" placeholder="e.g., AI-Powered Chatbot" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="shortDescription" className="block text-base font-semibold mb-2">Short Description (max 250 characters):</label>
                    <textarea id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="3" maxLength="250" className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out resize-y text-lavender-soft placeholder-lavender-gray" placeholder="A brief, engaging summary of your project..." required></textarea>
                </div>

                <div className="mb-5">
                    <label htmlFor="technologies" className="block text-base font-semibold mb-2">Technologies Used (comma-separated):</label>
                    <input type="text" id="technologies" name="technologies" value={formData.technologies} onChange={handleChange} className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray" placeholder="e.g., Python, TensorFlow, React, Flask" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="githubLink" className="block text-base font-semibold mb-2">GitHub Repository Link:</label>
                    <input type="url" id="githubLink" name="githubLink" value={formData.githubLink} onChange={handleChange} className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray" placeholder="https://github.com/your-username/your-project" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="liveDemoLink" className="block text-base font-semibold mb-2">Live Demo Link (Optional):</label>
                    <input type="url" id="liveDemoLink" name="liveDemoLink" value={formData.liveDemoLink} onChange={handleChange} className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray" placeholder="https://your-live-demo.com" />
                </div>

                <div className="mb-5">
                    <label htmlFor="project-image-upload" className="block text-base font-semibold mb-2">Project Screenshot (Max 5MB, Image Only):</label>
                    <input
                        type="file"
                        id="project-image-upload"
                        name="image" // Name attribute for FormData
                        onChange={handleFileChange}
                        className="block w-full text-sm text-lavender-gray
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-dark-indigo file:text-lavender-soft
                            hover:file:bg-deep-purple-blue transition duration-200 ease-in-out cursor-pointer"
                        accept="image/*" // Only allow image files
                        required
                    />
                    {formData.image && <p className="text-sm text-lavender-gray mt-2">Selected: <span className="font-medium">{formData.image.name}</span></p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="submittedByName" className="block text-base font-semibold mb-2">Your Name:</label>
                    <input type="text" id="submittedByName" name="submittedByName" value={formData.submittedByName} onChange={handleChange} className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray" placeholder="e.g., Your Name" required />
                </div>

                <div className="mb-7">
                    <label htmlFor="submittedByEmail" className="block text-base font-semibold mb-2">Your Email:</label>
                    <input type="email" id="submittedByEmail" name="submittedByEmail" value={formData.submittedByEmail} onChange={handleChange} className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray" placeholder="e.g., your.email@example.com" required />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:ring-offset-2 focus:ring-offset-deep-purple-blue"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectSubmitPage;
