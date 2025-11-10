import express from "express";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());

// ✅ Keep your API routes first
app.use("/api", userRouter);

// ✅ Move this to the end and make it specific
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on", process.env.PORT);
  });
});
