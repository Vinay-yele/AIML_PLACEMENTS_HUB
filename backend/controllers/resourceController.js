// backend/controllers/resourceController.js
import Resource from "../models/Resource.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';


// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export async function getAllResources(req, res) {
  try {
    // Find all resources and sort by upload date (newest first)
    const resources = await Resource.find().sort({ uploadDate: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// @desc    Upload a new resource
// @route   POST /api/resources/upload
// @access  Private (Admin only) - for future implementation
export async function uploadResource(req, res) {
  // Check if a file was uploaded by multer middleware
  console.log("Its here");
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const localPath = req.file.path;
  const result = await uploadOnCloudinary(localPath);

  const resource = new Resource({
    file: result.secure_url,
    originalName: req.file.originalname,
    filename: result.public_id,
    filePath: result.secure_url,
    category: req.body.category || "Other",
    description: req.body.description || "",
  });
  try {
    // Save the resource metadata to the database
    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    // If saving to DB fails, delete the uploaded file to prevent orphans
    res.status(400).json({ message: err.message });
  }
}

// @desc    Download a resource by filename
// @route   GET /api/resources/download/:filename
// @access  Public
export async function downloadResource(req, res) {
  try {
    // Find the resource metadata by its unique filename
    const resource = await Resource.findOne({ filename: req.params.filename });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Cloudinary stores full URL in `file` or `filePath`
    const fileUrl = resource.file;
    console.log("File URL:", fileUrl);
    // Optional: Force download by setting content-disposition
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resource.originalName}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Pipe the file content directly to response
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return res
        .status(500)
        .json({ message: "Failed to fetch file from Cloudinary" });
    }

    response.body.pipe(res);
  } catch (err) {
    console.error("Error during file download:", err);
    res.status(500).json({ message: err.message });
  }
}
