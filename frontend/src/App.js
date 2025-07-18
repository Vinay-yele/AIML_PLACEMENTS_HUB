// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import all your page components
import HomePage from './pages/HomePage';
import AnnouncementPage from './pages/AnnouncementPage';
import IssuesPage from './pages/IssuesPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
// import AdminPage from './pages/AdminPage';

// Helper component to apply active class to navigation links
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
      <Link
        to={to}
        className={`relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-lg' // Slightly lighter blue for active state on dark background
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md' // Darker hover for consistency
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
                  `}
      >
        {children}
      </Link>
    </li>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black font-inter flex flex-col">
        {/* Header/Navbar Section - Dark Theme */}
        <header className="bg-gray-900 text-white p-4 shadow-xl z-10 border-b border-gray-700">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-extrabold mb-3 md:mb-0 text-blue-400 tracking-wide">Placement Hub</h1>
            <nav>
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {/* Navigation Links using NavLink helper component */}
                <NavLink to="/">Home</NavLink>
                <NavLink to="/announcements">Announcements</NavLink>
                <NavLink to="/issues">Issues</NavLink>
                <NavLink to="/resources">Resources</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                {/* Admin link */}
                {/* <NavLink to="/admin">
                  <span className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    Admin
                  </span>
                </NavLink> */}
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content Area: Routes define which component to render based on URL */}
        <main className="container mx-auto p-4 mt-6 flex-grow">
          <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            {/* Optional: Add a catch-all route for 404 Not Found */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center text-white">
                <h2 className="text-6xl font-extrabold text-red-500 mb-4 animate-bounce">404</h2>
                <p className="text-2xl text-gray-300">Page Not Found</p>
                <Link to="/" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Go to Home
                </Link>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer Section - Dark Theme */}
        <footer className="bg-gray-900 text-gray-400 p-6 mt-10 text-center shadow-inner border-t border-gray-700">
          <div className="container mx-auto">
            <p className="text-sm mb-2 leading-relaxed">
              This Placement Coordination Portal is designed to streamline communication and resource sharing for college placements.
              It provides a centralized platform for announcements, issue resolution, and essential documents.
            </p>
            <p className="text-sm mb-4">&copy; {new Date().getFullYear()} College Placement Cell. All rights reserved.</p>

            <div className="flex justify-center items-center space-x-6 text-lg">
              <span className="font-semibold text-white">Developed by: Vinay Yele</span>
              <a
                href="https://github.com/your-github-profile" // Replace with your GitHub profile link
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                {/* GitHub Icon (inline SVG for simplicity, or use FontAwesome if installed) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.804 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.197-6.095 8.197-11.389 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href="https://linkedin.com/in/your-linkedin-profile" // Replace with your LinkedIn profile link
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                {/* LinkedIn Icon (inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
