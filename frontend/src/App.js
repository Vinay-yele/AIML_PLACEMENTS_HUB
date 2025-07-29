// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AnnouncementPage from './pages/AnnouncementPage';
import ResourcesPage from './pages/ResourcesPage';
import AlumniExperiencePage from './pages/AlumniExperiencePage';
import AlumniSubmitPage from './pages/AlumniSubmitPage';
import IssuesPage from './pages/IssuesPage';
import AdminPage from './pages/AdminPage';
import ProjectShowcasePage from './pages/ProjectShowcasePage';
import ProjectSubmitPage from './pages/ProjectSubmitPage'; // Import ProjectSubmitPage

// Assuming you have react-icons installed: npm install react-icons
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc'; // Importing VscAccount for the website link

// NavLink helper that highlights the active route
const NavLink = ({ to, children, onClick }) => { // Added onClick prop for mobile menu
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick} // Pass onClick to the Link component
      className={`block w-full px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ease-in-out \
        ${isActive ? 'bg-[#5C5C99] text-white' : 'text-[#A3A3CC] hover:bg-[#292966] hover:text-white'}`}
    >
      {children}
    </Link>
  );
};

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(open => !open);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1f33] to-[#0d0d1d] text-white font-inter w-full">
        {/* Navbar */}
        <nav className="w-full flex justify-between items-center px-6 py-6 border-b border-[#2c2f45] backdrop-blur-md md:sticky md:top-0 md:z-50 bg-[#0d0d1d] md:bg-transparent">
          <h1 className="text-2xl md:text-3xl font-bold text-[#CCCCFF]">AIML Placements Hub</h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex flex-wrap gap-6 text-[#A3A3CC] text-base md:text-lg">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/announcements">Announcements</NavLink></li>
            <li><NavLink to="/resources">Resources</NavLink></li>
            <li><NavLink to="/alumni-experiences">Alumni Experiences</NavLink></li>
            <li><NavLink to="/issues">Issues</NavLink></li>
            <li><NavLink to="/projects">Project Showcase</NavLink></li>
            
          
          </ul>

          {/* Hamburger menu button for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-[#CCCCFF] focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out \
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={toggleMobileMenu}
        />

        {/* Mobile Slide-in Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#0d0d1d] backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ease-in-out \
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-[#CCCCFF] focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-start px-6 space-y-4 text-[#A3A3CC] text-lg">
            <li><NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink></li>
            <li><NavLink to="/announcements" onClick={toggleMobileMenu}>Announcements</NavLink></li>
            <li><NavLink to="/resources" onClick={toggleMobileMenu}>Resources</NavLink></li>
            <li><NavLink to="/alumni-experiences" onClick={toggleMobileMenu}>Alumni Experiences</NavLink></li>
            <li><NavLink to="/projects" onClick={toggleMobileMenu}>Project Showcase</NavLink></li>
            <li><NavLink to="/issues" onClick={toggleMobileMenu}>Issues</NavLink></li>
            
          </ul>
        </div>

        {/* Main Content */}
        <main className="flex-grow w-full px-0 py-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/alumni-experiences" element={<AlumniExperiencePage />} />
            <Route path="/alumni-experiences/submit" element={<AlumniSubmitPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/projects" element={<ProjectShowcasePage />} /> {/* Project Showcase Page Route */}
            <Route path="/projects/submit" element={<ProjectSubmitPage />} />     {/* Project Submission Page Route */}
            {/* Catch-all for 404 */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center text-[#CCCCFF]">
                <h2 className="text-6xl font-extrabold text-red-500 mb-4 animate-bounce">404</h2>
                <p className="text-2xl text-[#A3A3CC]">Page Not Found</p>
                <Link to="/" className="mt-8 bg-[#5C5C99] hover:bg-[#A3A3CC] text-[#CCCCFF] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Go to Home
                </Link>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#0c0e26] text-[#A3A3CC] p-8 mt-10 border-t border-[#2c2f45]">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-sm"> {/* Changed gap-8 to gap-20 */}
            <div>
              <h3 className="text-xl font-semibold text-[#CCCCFF] mb-2">AIML Placements Hub</h3>
              <p>Your dedicated portal for AIML students, streamlining placement coordination, announcements, resources, and alumni connections.</p>
              <p className="mt-4">&copy; {new Date().getFullYear()} Vinay Yele. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#CCCCFF] mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li><Link to="/" className="hover:text-[#CCCCFF]">Home</Link></li>
                <li><Link to="/announcements" className="hover:text-[#CCCCFF]">Announcements</Link></li>
                <li><Link to="/resources" className="hover:text-[#CCCCFF]">Resources</Link></li>
                <li><Link to="/alumni-experiences" className="hover:text-[#CCCCFF]">Alumni Experiences</Link></li>
                <li><Link to="/issues" className="hover:text-[#CCCCFF]">Issues</Link></li>
                <li><Link to="/projects" className="hover:text-[#CCCCFF]">Project Showcase</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#CCCCFF] mb-2">Connect with Me</h3>
              <div className="flex flex-col space-y-3 text-base"> {/* Increased text size for links */}
                <a href="https://github.com/Vinay-yele" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#CCCCFF]"><FaGithub className="mr-3 w-6 h-6"/> GitHub</a> {/* Increased icon size */}
                <a href="https://vinayyele.live" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#CCCCFF]"><VscAccount className="mr-3 w-6 h-6"/> Website</a> {/* Increased icon size */}
                <a href="https://twitter.com/vinayyele2013" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#CCCCFF]"><FaTwitter className="mr-3 w-6 h-6"/> Twitter</a> {/* Increased icon size */}
                <a href="https://linkedin.com/in/vinay-yele-08ab08295" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#CCCCFF]"><FaLinkedin className="mr-3 w-6 h-6"/> LinkedIn</a> {/* Increased icon size */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
