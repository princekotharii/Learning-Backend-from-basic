import { user } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export async function Register(req, res) {
  try {

    const { Fullname, Email, Password } = req.body;
    let imageUrl = null;

    if (req.file) {
      console.log("⏳ Uploading to Cloudinary...");
      const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
        folder: "users",
        resource_type: "auto"
      });
      imageUrl = uploadResponse.secure_url;
      console.log("✅ Uploaded to Cloudinary:", imageUrl);
    } else {
      console.log("⚠️ No image received — skipping upload.");
    }

    const newUser = new user({
      Fullname,
      Email,
      Password,
      Image: imageUrl,
    });

    await newUser.save();
    console.log("✅ User saved successfully:", newUser.Fullname);

    res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}


// 🟢 Update Controller - FIXED
export async function Update(req, res) {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // if new image is uploaded
    if (req.file) {
      console.log("⏳ Uploading updated image to Cloudinary...");
      const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
        folder: "users",
        resource_type: "auto"
      });
      updateData.Image = uploadResponse.secure_url;
      console.log("✅ Updated image uploaded:", uploadResponse.secure_url);
    }

    const updatedUser = await user.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (err) {
    console.error("❌ Error occurred:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}