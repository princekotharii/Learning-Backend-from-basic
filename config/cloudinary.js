// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const connectCloudinary = async () => {
  try {
    // test the connection by requesting account details
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected:", result.status);
  } catch (err) {
    console.error("❌ Cloudinary connection failed:", err.message);
  }
};

export default cloudinary;
