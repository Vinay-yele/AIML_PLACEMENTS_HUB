import React, { useState } from "react";
import axios from "axios";

const ResourceUploadForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    file: null,
  });
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const categories = [
    "Guidelines",
    "Company Info",
    "Prep Materials",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.category || !formData.file) {
      setUploadStatus({
        loading: false,
        message: "Please select a category and file before uploading.",
        error: true,
      });
      return;
    }

    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (formData.file.size > maxSize) {
      setUploadStatus({
        loading: false,
        message: "File size exceeds 5MB limit.",
        error: true,
      });
      return;
    }

    setUploadStatus({
      loading: true,
      message: "",
      error: false,
    });

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("pdf", formData.file);
      uploadFormData.append("category", formData.category);
      uploadFormData.append("description", formData.description);


      const response = await axios.post(
        "http://localhost:4001/api/resources/upload",
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data) {
        setUploadStatus({
          loading: false,
          message: "File uploaded successfully!",
          error: false,
        });
        if (response.data.secure_url) {
          console.log("Uploaded URL:", response.data.secure_url);
        } else if (response.data.url) {
          console.log("Uploaded URL:", response.data.url);
        }
        setFormData({
          category: "",
          description: "",
          file: null,
        });
      } else {
        setUploadStatus({
          loading: false,
          message: "Upload succeeded but unexpected response format.",
          error: true,
        });
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setUploadStatus({
        loading: false,
        message: `Failed to upload file: ${
          err.response?.data?.message || err.message
        }`,
        error: true,
      });
    }
  };

  return (
    <div
      className="resource-upload-container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginTop: 0, color: "#333", textAlign: "center" }}>
        Upload Resource
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="category"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#555",
            }}
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#555",
            }}
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              resize: "vertical",
            }}
            placeholder="Enter a description of the resource"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#555",
            }}
          >
            File Upload *
          </label>
          <div
            style={{
              border: "2px dashed #ddd",
              borderRadius: "4px",
              padding: "1.5rem",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-upload"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#4285f4",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.3s",
                marginBottom: "1rem",
              }}
            >
              Choose File
            </label>
            <p style={{ margin: "0.5rem 0", color: "#666" }}>
              {formData.file ? formData.file.name : "No file selected"}
            </p>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "#888" }}>
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max size: 5MB)
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploadStatus.loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: uploadStatus.loading ? "#aaa" : "#4285f4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: uploadStatus.loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {uploadStatus.loading ? "Uploading..." : "Upload Resource"}
        </button>

        {uploadStatus.message && (
          <p
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "4px",
              backgroundColor: uploadStatus.error ? "#ffebee" : "#e8f5e9",
              color: uploadStatus.error ? "#c62828" : "#2e7d32",
              textAlign: "center",
            }}
          >
            {uploadStatus.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResourceUploadForm;
