import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Fullname: { type: String },
  Email: { type: String, unique: true },
  Password: { type: String },
  Image: { type: String } // ✅ new field for image URL
}, { timestamps: true });

export const user = mongoose.model("User", userSchema);
