// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import all your page components
import HomePage from './pages/HomePage';
import AnnouncementPage from './pages/AnnouncementPage';
import IssuesPage from './pages/IssuesPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage'; // Ensure this import is present and correct

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
                      ? 'bg-blue-700 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:shadow-md'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-600
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter flex flex-col">
        {/* Header/Navbar Section */}
        <header className="bg-blue-800 text-white p-4 shadow-xl z-10">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-extrabold mb-3 md:mb-0 text-blue-100 tracking-wide">Placement Hub</h1>
            <nav>
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {/* Navigation Links */}
                <NavLink to="/">Home</NavLink>
                <NavLink to="/announcements">Announcements</NavLink>
                <NavLink to="/issues">Issues</NavLink>
                <NavLink to="/resources">Resources</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                {/* Admin link - REMOVED FROM NAVBAR FOR "PRIVATE" ACCESS */}
                {/*
                <NavLink to="/admin">
                  <span className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    Admin
                  </span>
                </NavLink>
                */}
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
            <Route path="/admin" element={<AdminPage />} /> {/* <--- THIS ROUTE MUST BE PRESENT */}
            {/* Optional: Add a catch-all route for 404 Not Found */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center">
                <h2 className="text-6xl font-extrabold text-red-600 mb-4 animate-bounce">404</h2>
                <p className="text-2xl text-gray-700">Page Not Found</p>
                <Link to="/" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Go to Home
                </Link>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-gray-300 p-4 mt-10 text-center shadow-inner">
          <p className="text-sm">&copy; {new Date().getFullYear()} College Placement Cell. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
