import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("no local path");
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // handles images, PDFs, videos, etc.
    });

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  } finally {
    // Always clean up temp file
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

export { uploadOnCloudinary };
