// frontend/src/pages/ResourcesPage.js
import React, { useEffect, useState } from "react";
import { getResources } from "../services/api"; // Removed uploadResource import

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["Guidelines", "Company Info", "Prep Materials", "Other"];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await getResources();
      setResources(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Failed to load resources. Please try again later.");
      setLoading(false);
    }
  };

  const handleDownload = async (fileUrl, originalName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Failed to download file. Please try again.");
    }
  };

  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-lavender-gray text-lg font-medium">
          Loading resources...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-120px)]">
      <h2 className="text-4xl font-extrabold text-lavender-soft mb-8 text-center drop-shadow-sm">
        Important Resources
      </h2>
      {Object.keys(groupedResources).length === 0 ? (
        <div className="bg-deep-purple-blue rounded-lg shadow-md p-6 text-center text-lavender-gray text-lg border border-lavender-gray">
          <p>No resources available yet. Please check back soon!</p>
        </div>
      ) : (
        <div>
          {categories.map(
            (category) =>
              groupedResources[category] &&
              groupedResources[category].length > 0 && (
                <div key={category} className="mb-10">
                  <h3 className="text-3xl font-bold text-lavender-soft mb-6 border-b-4 border-lavender-soft pb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedResources[category].map((resource) => (
                      <div
                        key={resource._id}
                        className="bg-deep-purple-blue rounded-xl shadow-md p-6 border border-lavender-gray flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div>
                          <p className="text-lg font-semibold text-lavender-soft mb-2">
                            {resource.originalName}
                          </p>
                          {resource.description && (
                            <p className="text-lavender-gray text-sm mb-3">
                              {resource.description}
                            </p>
                          )}
                          <p className="text-xs text-lavender-gray">
                            Uploaded:{" "}
                            {new Date(resource.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleDownload(resource.file, resource.originalName)
                          }
                          className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out self-start"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;