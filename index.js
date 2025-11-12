import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";

const app = express();

// ✅ Enable CORS first
app.use(cors({ origin: "http://localhost:5173" }));

// ✅ Only parse JSON when it's not multipart/form-data
app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    return next(); // skip express.json for file uploads
  }
  express.json()(req, res, next);
});

// ✅ Routes
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Start server only after DB & Cloudinary connect
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
};

startServer();
