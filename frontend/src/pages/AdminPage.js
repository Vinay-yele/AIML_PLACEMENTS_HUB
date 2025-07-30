// frontend/src/pages/AdminPage.js
import React, { useState, useEffect } from "react";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  getAllAlumniExperiencesAdmin,
  updateAlumniExperienceStatus,
  deleteAlumniExperience,
  getAllProjectsAdmin,
  updateProjectStatus,
  deleteProject,
  uploadResource
} from "../services/api";
import ResourceUploadForm from "../components/ResourceUploadForm";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ADMIN_SECRET_PASSWORD = process.env.REACT_APP_ADMIN_PASS;
  const [announcementFormData, setAnnouncementFormData] = useState({
    title: "",
    content: "",
    author: "Admin",
    category: "News",
  });
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const [alumniExperiences, setAlumniExperiences] = useState([]);
  const [alumniLoading, setAlumniLoading] = useState(true);
  const [alumniError, setAlumniError] = useState(null);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      fetchAnnouncements();
      fetchAlumniExperiences();
      fetchProjects();
    }
  }, [isAdmin]);

  const fetchAnnouncements = async () => {
    try {
      const res = await getAnnouncements();
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const fetchAlumniExperiences = async () => {
    try {
      setAlumniLoading(true);
      const response = await getAllAlumniExperiencesAdmin();
      setAlumniExperiences(response.data);
      setAlumniLoading(false);
    } catch (err) {
      console.error("Error fetching alumni experiences:", err);
      setAlumniError("Failed to load alumni experiences. Please try again.");
      setAlumniLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      const response = await getAllProjectsAdmin();
      setProjects(response.data);
      setProjectsLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjectsError("Failed to load projects. Please try again.");
      setProjectsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_SECRET_PASSWORD) {
      setIsAdmin(true);
      setMessage("");
      setMessageType("");
    } else {
      setMessage("Incorrect password. Access denied.");
      setMessageType("error");
    }
  };

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await createAnnouncement(announcementFormData);
      setMessage("Announcement posted successfully!");
      setMessageType("success");
      setAnnouncementFormData({
        title: "",
        content: "",
        author: "Admin",
        category: "News",
      });
      fetchAnnouncements();
    } catch (err) {
      console.error("Error posting announcement:", err);
      setMessage(err.response?.data?.message || "Failed to post announcement.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    try {
      await deleteAnnouncement(id);
      setMessage("Announcement deleted successfully!");
      setMessageType("success");
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      setMessage("Failed to delete announcement.");
      setMessageType("error");
    }
  };

  const handleAlumniStatusUpdate = async (id, status) => {
    try {
      await updateAlumniExperienceStatus(id, { status });
      setMessage(`Experience status updated to ${status}!`);
      setMessageType("success");
      fetchAlumniExperiences();
    } catch (err) {
      console.error("Error updating alumni status:", err);
      setMessage("Failed to update experience status.");
      setMessageType("error");
    }
  };

  const handleAlumniDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;
    try {
      await deleteAlumniExperience(id);
      setMessage("Experience deleted successfully!");
      setMessageType("success");
      fetchAlumniExperiences();
    } catch (err) {
      console.error("Error deleting experience:", err);
      setMessage("Failed to delete experience.");
      setMessageType("error");
    }
  };

  const handleProjectStatusUpdate = async (id, status) => {
    try {
      await updateProjectStatus(id, { status });
      setMessage(`Project status updated to ${status}!`);
      setMessageType("success");
      fetchProjects();
    } catch (err) {
      console.error("Error updating project status:", err);
      setMessage("Failed to update project status.");
      setMessageType("error");
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await deleteProject(id);
      setMessage("Project deleted successfully!");
      setMessageType("success");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setMessage("Failed to delete project.");
      setMessageType("error");
    }
  };



  if (!isAdmin) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
        <div className="bg-deep-purple-blue rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-lavender-gray text-lavender-soft">
          <h2 className="text-3xl font-bold text-lavender-soft mb-6">
            Admin Access
          </h2>
          {message && (
            <div
              className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${
                messageType === "error"
                  ? "bg-red-600 text-white border border-red-700"
                  : ""
              }`}
            >
              {message}
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="admin-password"
              className="block text-base font-semibold mb-2"
            >
              Enter Admin Password:
            </label>
            <input
              type="password"
              id="admin-password"
              value={adminPassword}
              onChange={handlePasswordChange}
              onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
              className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg text-lavender-soft"
              placeholder="*************"
            />
          </div>
          <button
            onClick={handleAdminLogin}
            className="bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-3 px-8 rounded-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
  // Render admin dashboard if authenticated
  return (
    <div className="container mx-auto p-4 text-lavender-gray">
      <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">
        Admin Dashboard
      </h2>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 text-center text-lg font-medium ${
            messageType === "success"
              ? "bg-green-600 text-white border border-green-700"
              : "bg-red-600 text-white border border-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Post New Announcement Section */}
      <div className="bg-deep-purple-blue rounded-xl shadow-xl p-8 mb-10 border border-lavender-gray">
        <h3 className="text-3xl font-bold text-lavender-soft mb-6 text-center">
          Post New Announcement
        </h3>
        <form onSubmit={handleAnnouncementSubmit} className="max-w-2xl mx-auto">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-base font-semibold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={announcementFormData.title}
              onChange={handleAnnouncementChange}
              className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray"
              placeholder="e.g., Important Update on Placements"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="content"
              className="block text-base font-semibold mb-2"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={announcementFormData.content}
              onChange={handleAnnouncementChange}
              rows="8"
              className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out resize-y text-lavender-soft placeholder-lavender-gray"
              placeholder="Type the full announcement content here..."
              required
            ></textarea>
          </div>
          <div className="mb-5">
            <label
              htmlFor="author"
              className="block text-base font-semibold mb-2"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={announcementFormData.author}
              onChange={handleAnnouncementChange}
              className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft placeholder-lavender-gray"
              placeholder="e.g., Placement Cell"
              required
            />
          </div>
          <div className="mb-7">
            <label
              htmlFor="category"
              className="block text-base font-semibold mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={announcementFormData.category}
              onChange={handleAnnouncementChange}
              className="w-full px-4 py-2 bg-dark-indigo border border-lavender-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:border-transparent transition duration-200 ease-in-out text-lavender-soft bg-dark-indigo"
            >
              <option value="News">News</option>
              <option value="Forwarded Email">Forwarded Email</option>
              <option value="Notice">Notice</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lavender-soft focus:ring-offset-2 focus:ring-offset-deep-purple-blue"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </div>
        </form>
      </div>

      {/*Resource Upload Section */}

      
    <ResourceUploadForm/>
{/* Announcement List with Delete */}
      <div className="bg-deep-purple-blue rounded-xl shadow-xl p-8 mb-10 border border-lavender-gray">
        <h3 className="text-3xl font-bold text-lavender-soft mb-6 text-center">
          Existing Announcements
        </h3>
        {announcements.length === 0 ? (
          <p className="text-lavender-gray text-center">
            No announcements yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((ann) => (
              <li
                key={ann._id}
                className="bg-dark-indigo border border-lavender-gray rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h4 className="text-lg font-bold text-lavender-soft">
                    {ann.title}
                  </h4>
                  <p className="text-sm text-lavender-gray mt-1">
                    {ann.content}
                  </p>
                  <p className="text-xs text-lavender-gray mt-2">
                    By {ann.author} | {new Date(ann.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(ann._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Alumni Experience Management Section */}
      <div className="bg-deep-purple-blue rounded-xl shadow-xl p-8 mb-10 border border-lavender-gray">
        <h3 className="text-3xl font-bold text-lavender-soft mb-6 text-center">
          Alumni Experience Management
        </h3>
        {alumniLoading ? (
          <p className="text-center text-lavender-gray">
            Loading alumni experiences...
          </p>
        ) : alumniError ? (
          <p className="text-center text-red-500">{alumniError}</p>
        ) : alumniExperiences.length === 0 ? (
          <p className="text-center text-lavender-gray">
            No alumni experiences submitted yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {alumniExperiences.map((exp) => (
              <React.Fragment key={exp._id}>
                <div className="bg-dark-indigo rounded-lg shadow-md p-6 border border-lavender-gray">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-lavender-soft leading-tight">
                        {exp.alumniName} ({exp.batch})
                      </h4>
                      <p className="text-lg font-semibold text-lavender-gray">
                        {exp.role} at {exp.company}
                      </p>
                      <p className="text-sm text-lavender-gray mt-1">
                        Submitted:{" "}
                        {new Date(exp.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        exp.status === "Approved"
                          ? "bg-green-600 text-white"
                          : exp.status === "Pending"
                          ? "bg-yellow-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>
                  <p className="text-lavender-gray leading-relaxed text-base whitespace-pre-wrap border-t border-lavender-gray pt-4">
                    {exp.experience}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-end gap-3">
                    {exp.status !== "Approved" && (
                      <button
                        onClick={() =>
                          handleAlumniStatusUpdate(exp._id, "Approved")
                        }
                        className="bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lavender-soft"
                      >
                        Approve
                      </button>
                    )}
                    {exp.status !== "Rejected" && (
                      <button
                        onClick={() =>
                          handleAlumniStatusUpdate(exp._id, "Rejected")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleAlumniDelete(exp._id)}
                      className="bg-lavender-gray hover:bg-lavender-soft text-dark-indigo font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lavender-soft"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Project Management Section */}
      <div className="bg-deep-purple-blue rounded-xl shadow-xl p-8 border border-lavender-gray">
        <h3 className="text-3xl font-bold text-lavender-soft mb-6 text-center">
          Project Management
        </h3>
        {projectsLoading ? (
          <p className="text-center text-lavender-gray">Loading projects...</p>
        ) : projectsError ? (
          <p className="text-center text-red-500">{projectsError}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lavender-gray">
            No projects submitted yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-dark-indigo rounded-lg shadow-md p-6 border border-lavender-gray"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-lavender-soft leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-lg font-semibold text-lavender-gray">
                      {project.submittedBy.name}
                    </p>
                    <p className="text-sm text-lavender-gray mt-1">
                      Submitted:{" "}
                      {new Date(project.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === "Approved"
                        ? "bg-green-600 text-white"
                        : project.status === "Pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-lavender-gray leading-relaxed text-base whitespace-pre-wrap border-t border-lavender-gray pt-4">
                  {project.shortDescription}
                </p>
                {project.imagePath && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-lavender-gray">
                    <img
                      src={project.imagePath} // Directly use imagePath from Cloudinary
                      alt={project.title}
                      className="w-full h-48 object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x240/A3A3CC/292966?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
                <div className="mt-5 flex flex-wrap justify-end gap-3">
                  {project.status !== "Approved" && (
                    <button
                      onClick={() =>
                        handleProjectStatusUpdate(project._id, "Approved")
                      }
                      className="bg-lavender-soft hover:bg-lavender-gray text-dark-indigo font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lavender-soft"
                    >
                      Approve
                    </button>
                  )}
                  {project.status !== "Rejected" && (
                    <button
                      onClick={() =>
                        handleProjectStatusUpdate(project._id, "Rejected")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleProjectDelete(project._id)}
                    className="bg-lavender-gray hover:bg-lavender-soft text-dark-indigo font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lavender-soft"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
