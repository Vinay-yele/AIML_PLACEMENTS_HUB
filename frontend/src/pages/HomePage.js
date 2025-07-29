import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="min-h-screen w-full box-border bg-gradient-to-br from-[#1e1f33] to-[#0d0e1d] text-white font-inter">

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center px-6 py-24 box-border">
        
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Revolutionize Your <br />
          <span className="bg-gradient-to-r from-[#CCCCFF] via-[#A3A3CC] to-[#5C5C99] text-transparent bg-clip-text">
            Placement Experience
          </span>
        </h2>
        <p className="text-[#A3A3CC] w-full max-w-4xl text-lg md:text-xl mb-8">
          AIML Placements Hub is your one-stop solution for everything happening in
          AIML placements — announcements, alumni insights, resources, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/announcements"
            className="bg-[#5C5C99] hover:bg-[#CCCCFF] hover:text-[#292966] text-white font-medium px-6 py-3 rounded-lg transition duration-300 shadow-md"
          >
            Announcements
          </Link>
          <Link
            to="/alumni-experiences"
            className="border border-[#CCCCFF] text-[#CCCCFF] hover:bg-[#CCCCFF] hover:text-[#292966] font-medium px-6 py-3 rounded-lg transition duration-300"
          >
            Alumni Experience
          </Link>
        </div>
      </section>

      
<section className="w-full px-6 md:px-20 pb-20 box-border">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: 'Real-Time Announcements',
        desc: 'Stay up to date with the latest placement updates from your department, posted by faculty or admin.',
        path: '/announcements',
      },
      {
        title: 'Verified Alumni Experiences',
        desc: 'Read authentic placement journeys from alumni who were once in your shoes. Filter by company or role.',
        path: '/alumni-experiences',
      },
      {
        title: 'Resource Sharing',
        desc: 'Find shared prep materials, PDFs, drive links, and more — directly uploaded by peers or admins.',
        path: '/resources',
      },
      {
        title: 'Project Showcase',
        desc: 'Explore innovative projects by your peers. Submit your own project to showcase your skills.',
        path: '/projects'
      }
    ].map((card) => (
      <div
        key={card.title}
        className="group relative overflow-hidden rounded-2xl p-1 bg-gradient-to-tr from-[#5C5C99] via-[#A3A3CC] to-[#CCCCFF] transition-shadow duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col justify-between h-full bg-[#1f2133] p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#5C5C99] transition-colors duration-300">
            {card.title}
          </h3>
          <p className="text-[#A3A3CC] leading-relaxed">
            {card.desc}
          </p>
          <Link
            to={card.path}
            className="mt-6 inline-block self-start text-sm font-medium text-[#CCCCFF] hover:text-white"
          >
            Visit →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>
    </div>
  );
};

export default HomePage;
